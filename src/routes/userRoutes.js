const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { registerValidationRules, loginValidationRules } = require('../utils/validation');
const { validationResult } = require('express-validator');

const router = express.Router();

// Helper middleware to handle validation errors
function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Public routes
router.post('/register', registerValidationRules(), validateRequest, userController.register);
router.post('/login', loginValidationRules(), validateRequest, userController.login);

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile);
