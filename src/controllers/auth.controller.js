const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const authController = {
    // Renderiza el formulario de login
    loginForm: (req, res) => {
        res.render('login', {
            titulo: 'Iniciar sesión',
            user: req.session.user
        });
    },

    // Procesa el login
    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await User.getByEmail(email);
        if (!user || user.status !== 1) {
            return res.render('login', { error: 'Usuario o contraseña incorrectos, o usuario inactivo.', titulo: 'Iniciar sesión', user: req.session.user });
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.render('login', { error: 'Usuario o contraseña incorrectos.', titulo: 'Iniciar sesión', user: req.session.user });
        }
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
        res.redirect('/dashboard');
    },

    // Cierra la sesión
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/login');
        });
    },

    // Renderiza el formulario de registro
    registerForm: (req, res) => {
        res.render('register', {
            titulo: 'Registrarse',
            user: req.session.user
        });
    },

    // Procesa el registro
    register: async (req, res) => {
        const { name, email, password } = req.body;
        const userExists = await User.getByEmail(email);
        if (userExists) {
            return res.render('register', { error: 'El correo ya está registrado.', titulo: 'Registrarse', user: req.session.user });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ name, email, password: hashedPassword, role: 'usuario', status: 1 });
        res.redirect('/login');
    },

    // Renderiza el formulario de recuperación de contraseña
    forgotPasswordForm: (req, res) => {
        res.render('forgot-password', {
            titulo: 'Recuperar contraseña',
            user: req.session.user
        });
    },

    // Procesa la recuperación de contraseña (simulado)
    forgotPassword: async (req, res) => {
        const { email } = req.body;
        const user = await User.getByEmail(email);
        if (!user) {
            return res.render('forgot-password', { error: 'No existe una cuenta con ese correo.' });
        }
        // Aquí normalmente se enviaría un correo con un enlace de recuperación
        res.render('forgot-password', { message: 'Si el correo existe, se ha enviado un enlace para restablecer la contraseña.' });
    }
};

module.exports = authController;
