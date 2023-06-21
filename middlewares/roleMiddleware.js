import jwt from "jsonwebtoken";

export const roleMiddleware =  (role)=> (req, res, next)=>{
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {

            return res.status(403).json({message:"Пользователь не авторизован"})
        }
        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) {
                return res.status(403).json({message:'Пользователь не авторизован'})
            }
           if (role !== decoded.role){
               return res.status(403).json({message:'У данного пользователя нет прав доступа'})
           }
            next()
        });
    } catch (e) {
        return res.status(403).json({message:"Пользователь не авторизован"})
    }
}
