const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async ( req, res = response ) => {    
    const miId = req.uid;
    const mensajesDe = req.params.de;

    const mensajes = await Mensaje
        .find({
            $or: [
                { "de": mensajesDe, "para": miId },
                { "de": miId, "para": mensajesDe }
            ]
        })  
        .sort({ createdAt: 'desc' })              
        .limit(30);

    res.json({
        ok: true,
        mensajes
    });
}

module.exports = {
    obtenerChat
}