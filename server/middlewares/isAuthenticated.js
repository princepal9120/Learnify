import jwt from 'jsonwebtoken'

const isAuthenticated= async (req,res,next)=>{
    try {
        const token =req.cookies.token;
        if(!token){
            return res.status(401).json({
                success: false,
                message:"User is not Authenticated."
            })
        };
        const decode= await jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({
                success: false,
                message: "This is invalid token"
            })
        }
        req.id=decode.userId;
        next()

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Authentication Error from client"
        })
        
    }



}
export default isAuthenticated