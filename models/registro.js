const bcrypt = require('bcrypt');
const connection = require('../config/database');

const RegistroModel = {};

RegistroModel.registrarUsuario = async (Idusuario, email, password, idrol) => {
    try {
        const existingUserQuery = 'SELECT * FROM Usuario WHERE Email = ?';
        const existingUser = await new Promise((resolve, reject) => {
            connection.query(existingUserQuery, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });

        if (existingUser.length > 0) {
            throw new Error('El usuario ya existe');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const insertUserQuery = 'INSERT INTO Usuario (Idusuario, Email, Password, Idrol) VALUES (?, ?, ?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(insertUserQuery, [Idusuario, email, hashedPassword, idrol], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });

        return { message: 'Usuario creado correctamente' };
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        throw new Error('Error al registrar el usuario');
    }
};

module.exports = RegistroModel;
