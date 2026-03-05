/**
 * Computes a Price-to-Quality Value Score.
 *
 * weights: { price: 0-10, performance: 0-10, rating: 0-10, warranty: 0-10 }
 * product: { price, rating (0-5), warranty (months), specs (Map/object) }
 * allProducts: array of all products being compared (for normalization)
 */
export function computeValueScore(product, allProducts, weights = {}) {
    const w = {
        price: weights.price ?? 5,
        performance: weights.performance ?? 5,
        rating: weights.rating ?? 5,
        warranty: weights.warranty ?? 5,
    };

    const totalWeight = w.price + w.performance + w.rating + w.warranty;
    if (totalWeight === 0) return 0;

    // Normalize price (lower is better)
    const prices = allProducts.map(p => p.price);
    const maxPrice = Math.max(...prices, 1);
    const minPrice = Math.min(...prices, 0);
    const priceRange = maxPrice - minPrice || 1;
    const normalizedPrice = 1 - (product.price - minPrice) / priceRange; // 1 = cheapest = best

    // Normalize rating (0-5 → 0-1)
    const normalizedRating = (product.rating || 0) / 5;

    // Normalize warranty (months, relative to max)
    const warranties = allProducts.map(p => p.warranty || 0);
    const maxWarranty = Math.max(...warranties, 1);
    const normalizedWarranty = (product.warranty || 0) / maxWarranty;

    // Spec score: count of non-empty specs (proxy for feature richness)
    const specEntries = product.specs instanceof Map
        ? [...product.specs.values()]
        : Object.values(product.specs || {});
    const specCount = specEntries.filter(v => v && v.toString().trim()).length;
    const maxSpecs = Math.max(
        ...allProducts.map(p => {
            const e = p.specs instanceof Map ? [...p.specs.values()] : Object.values(p.specs || {});
            return e.filter(v => v && v.toString().trim()).length;
        }),
        1
    );
    const normalizedPerformance = specCount / maxSpecs;

    const score =
        (w.price * normalizedPrice +
            w.performance * normalizedPerformance +
            w.rating * normalizedRating +
            w.warranty * normalizedWarranty) /
        totalWeight;

    return Math.round(score * 100);
}

/**
 * Find the best product(s) from a list.
 */
export function findBestProduct(products, weights) {
    if (!products.length) return null;
    let bestScore = -1;
    let bestProduct = null;
    for (const p of products) {
        const score = computeValueScore(p, products, weights);
        if (score > bestScore) {
            bestScore = score;
            bestProduct = p;
        }
    }
    return { product: bestProduct, score: bestScore };
}
