import express from "express"
import passport from "passport"
import{ getAdminStats, getAdminUsers, logout, myProfile }from "../controllers/userController.js"
import { authorizeAdmin, isAuthenticated } from "../middelware/auth.js"
const router = express.Router()

router.get("/googlelogin", passport.authenticate("google", {
    scope:["profile", "email"],

}))

router.get("/login",passport.authenticate("google",{
    successRedirect:process.env.FRONTEND_URL
}),
    (req,res, next) => {
        res.send("Logged In")
    }
)

router.get("/me", isAuthenticated ,myProfile)
router.get("/logout", logout)
router.get("/admin/user", isAuthenticated, authorizeAdmin, getAdminUsers)
router.get("/admin/stats", isAuthenticated, authorizeAdmin, getAdminStats)
export default router



// Client ID 508487383900-r2u77e4vs8hgbk20o7h18rjs1mkg097a.apps.googleusercontent.com
// Client secret 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
