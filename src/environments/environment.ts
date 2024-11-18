
//environment es utilizado en proyectos Angular para gestionar configuraciones específicas de entorno (desarrollo o producción).

export const environment = {
  production: false, //indica que es un entorno de desarrollo.
  firebase: {
    apiKey: "AIzaSyAfXA-qXTBWcNHibkYaxjHa4LZVzYSbxRU",
    authDomain: "pruebaloguin-d2dc4.firebaseapp.com",
    projectId: "pruebaloguin-d2dc4",
    storageBucket: "pruebaloguin-d2dc4.appspot.com",
    messagingSenderId: "1030184096165",
    appId: "1:1030184096165:web:d69ade6768f413b9a3184c"
  },
  // Este es el ID de cliente para Google OAuth, necesario para autenticar a los usuarios mediante Google en tu aplicación.
  googleClientId: '808335389750-p7h80lg5i9plcihsmrjq3ihntm895sd2.apps.googleusercontent.com'  // aun no sabemos si funciona
};

// Este bloque configura los parámetros de Firebase para tu aplicación. 

// apiKey: Clave API para autenticarse con Firebase.
// authDomain: Dominio para la autenticación de Firebase.
// projectId: ID de tu proyecto en Firebase.
// storageBucket: El contenedor de almacenamiento de Firebase.
// messagingSenderId: ID del remitente para el servicio de mensajería (usado en notificaciones push).
// appId: Identificador único de tu aplicación en Firebase.












