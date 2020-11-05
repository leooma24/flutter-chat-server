const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('email', 'El Email no es valido').isEmail(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    validarCampos
], crearUsuario);

router.post('/', [    
    check('email', 'El Email es obligatorio').not().isEmpty(),
    check('email', 'El Email no es valido').isEmail(),
    check('password', 'El Password es obligatorio').not().isEmpty(),
    validarCampos
], loginUsuario);

router.get('/renew', validarJWT, renewToken);

module.exports = router