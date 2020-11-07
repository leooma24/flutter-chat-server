const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', ( client ) =>  {
    console.log('Cliente conectado');

    console.log( client.handshake.headers['x-token'] );
    const [valido, uid] = comprobarJWT( client.handshake.headers['x-token'] );
    
    if(!valido) {
        return client.disconnect();
    }

    usuarioConectado( uid );

    client.join( uid );

    client.on('mensaje-personal', ( payload) => {        
        grabarMensaje( payload );
        io.to(payload.para).emit('mensaje-personal', payload);      
    })


    console.log('cliente autentificado');

    client.on('disconnect', ( client ) => {
        try {
            const [valido, uid] = comprobarJWT( client.handshake.headers['x-token'] );
            usuarioDesconectado( uid )
        } catch (error) {
            console.log(error)
        }        
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

        io.emit( 'mensaje', { admin: 'Nuevo mensaje' } );

    });


});
