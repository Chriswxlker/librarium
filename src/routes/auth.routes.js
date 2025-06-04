const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/forgot-password', authController.forgotPasswordForm);
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;
