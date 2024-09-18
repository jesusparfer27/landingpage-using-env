// middleware/authenticateToken.js
export const authenticateToken = (req, res, next) => {
    req.userId = 1;
    next();



    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Extrae el token

    // if (!token) {
    //     console.log("No token provided");
    //     return res.sendStatus(401); // Si no hay token, devuelve 401
    // }

    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) {
    //         console.log("Token verification failed:", err);
    //         return res.sendStatus(403); // Si el token es inválido, devuelve 403
    //     }

    //     console.log("Token verified, user:", user);
    //     req.userId = user.id; // Asegura que el id del usuario esté disponible en req
    //     next();
    // });
};
