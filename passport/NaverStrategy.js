const passport = require('passport');
const models = require("../model");
const NaverStrategy = require('passport-naver-v2').Strategy;

passport.use(new NaverStrategy(
    {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_URL,
        passReqToCallback: true
    }, async (request, accessToken, refreshToken, profile, done) => {
        console.log(profile);
        try {
            const exUser = await models.User.findOne({where : {id : profile.id}});
            if (exUser) {
                done(null, exUser);
            } else {
                const newUser = await models.User.create({id : profile.id, name : profile.displayName});
                done(null, newUser)
            }
        } catch (error) {
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    console.log("user", user);
    done(null, user);
});
  
passport.deserializeUser(async (user, done) => {
    console.log(user);
    models.User.findOne({where : {id : user.id}})
    .then((user) => done(null, user))
    .catch((err) => done(err));
    done(null, user);
});