import bcrypt from 'bcrypt';
import mysqldb from '../data/mysqldb.js';

const hashPassword = async (password) => {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
};

const updatePasswords = async () => {
    try {
        const [users] = await mysqldb.query('SELECT id, password FROM usuarios');
        for (const user of users) {
            const hashedPassword = await hashPassword(user.password);
            await mysqldb.query('UPDATE usuarios SET password = ? WHERE id = ?', [hashedPassword, user.id]);
        }
        console.log("Contraseñas actualizadas exitosamente.");
    } catch (error) {
        console.error("Error al actualizar contraseñas:", error);
    }
};

updatePasswords().catch(console.error);
