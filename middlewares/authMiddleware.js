import jwt from "jsonwebtoken";

export const authMiddleware =  (req, res, next)=>{
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token || token=='null') {
            return res.status(403).json({message:"Пользователь не авторизован"})
        }

        jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
            if (err) {
                console.log(token)
               return res.status(403).json({message:'Токен устарел'})
            }
            req.user = decoded
            next()
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({message:"Что-то пошло не так"})
    }
}
