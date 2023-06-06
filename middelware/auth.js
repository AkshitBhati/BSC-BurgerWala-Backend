import ErrorHandler from "../utils/ErrorHandlers.js"

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies["session.sig"]
   

    if(!token){
        return next(new ErrorHandler("Not Logged In", 401))
    }
    next()
}

export const authorizeAdmin = (req, res, next) => {

    if(req.user.role!== "admin"){
        return next(new ErrorHandler("Only Admin Allowed", 405))
    }
    next()
}

