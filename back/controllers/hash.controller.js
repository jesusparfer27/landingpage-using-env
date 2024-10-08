import bcrypt from 'bcrypt';
import mysqldb from '../data/mysqldb.js';

const updatePasswords = async () => {
    try {
        const [users] = await mysqldb.query('SELECT id, password FROM usuarios');
        for (const user of users) {
            try {
                const hashedPassword = await hashPassword(user.password);
                await mysqldb.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, user.id]);
            } catch (error) {
                console.error(`Error al actualizar la contraseña del usuario con ID ${user.id}:`, error);
            }
        }
        console.log("Contraseñas actualizadas exitosamente.");
    } catch (error) {
        console.error("Error al obtener los usuarios o actualizar las contraseñas:", error);
    }
};

updatePasswords().catch(error => console.error("Error al ejecutar updatePasswords:", error));
