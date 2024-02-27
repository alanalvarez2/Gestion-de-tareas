const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = {};

Login.login = (connection, req, res) => { // Recibe conexión, req y res como parámetros
    const { email, password } = req.body;
    const userQuery = 'SELECT * FROM Usuario WHERE Email = ?';

    connection.query(userQuery, [email], async (error, results) => {
        if (error) {
            console.error('Error al buscar usuario:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        const match = await bcrypt.compare(password, user.Password);
        if (!match) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ userId: user.Idusuario, email: user.Email }, 'clave_secreta', { expiresIn: '1h' });
        res.status(200).json({ message: 'Inicio de sesión exitoso', token: token });
    });
};

module.exports = Login;
