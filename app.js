const express = require('express');
const registroRouter = require('./routes/registro');
const loginRouter = require('./routes/login');
const verificarToken = require('./middlewares/authMiddleware'); // Importar el middleware de verificación de token

const app = express();

app.use(express.json());

app.use(registroRouter); // Aplicar el router de registro sin verificar el token
app.use(loginRouter);
app.use(verificarToken); // Aplicar el middleware de verificación de token a todas las demás rutas

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
