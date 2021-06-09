const express = require("express");
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv');
const nunjucks = require('nunjucks');
const passport = require('passport');

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const requestRouter = require('./routes/request');

const { sequelize } = require('./models');
const passportConfig = require('./passport');


const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 5001);
app.set('view engine', 'html');
app.use( express.urlencoded({ extended: false }));
app.use( express.json());
app.use(express.static(path.join(__dirname, 'public')));
nunjucks.configure('views', {
    express: app,
    watch: true,
});
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });


app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize()); // req에 passport 추가
app.use(passport.session()); // req.session에 passport 저장, session()보다 뒤에 있어야 함.


app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/request', requestRouter);


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트 활성화');
});