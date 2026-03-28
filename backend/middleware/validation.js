// Input validation middleware
const validateProduct = (req, res, next) => {
    const { name, category, price, rating } = req.body;
    
    const errors = [];
    
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        errors.push('Product name is required and must be a non-empty string');
    }
    
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
        errors.push('Category is required');
    }
    
    if (price !== undefined && (typeof price !== 'number' || price < 0)) {
        errors.push('Price must be a non-negative number');
    }
    
    if (rating !== undefined && (typeof rating !== 'number' || rating < 0 || rating > 5)) {
        errors.push('Rating must be a number between 0 and 5');
    }
    
    if (errors.length > 0) {
        return res.status(400).json({ message: 'Validation failed', errors });
    }
    
    next();
};

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    return password && password.length >= 6;
};

module.exports = { validateProduct, validateEmail, validatePassword };
