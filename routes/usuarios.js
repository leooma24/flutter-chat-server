const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/', validarJWT, getUsuarios);


module.exports = router