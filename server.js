if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));

var retina;
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {name: req.user.name})
    retina = req.user.name
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})


app.get('/index.ejs', (req, res) => {
    res.render('index.ejs', {name: retina})
})

app.get('/galerie.ejs', (req, res) => {
    res.render('galerie.ejs')
})

app.get('/matrix.ejs', (req, res) => {
    res.render('matrix.ejs')
})

app.get('/contact.ejs', (req, res) => {
    res.render('contact.ejs')
})


app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

app.listen(3000)

app.get("/*", function (req, res) {
    u = req.session ? (req.session.utilizator ? req.session.utilizator.username : null) : null;

    //console.log("u:"+u);
    res.render("html" + req.url, {username: u}, function (err, html) {
        if (err) {
            if (err.message.includes("Failed to lookup view")) { // in message (string) o sa am ce se afiseaza in consola

                /*tratarea erorii 404 se pune la final (aici o sa fie un caz general, pe care intra orice cerere). Daca s-a gasit mai sus, se opreste acolo; nu mai ajunge aici.*/
                u = req.session ? (req.session.utilizator ? req.session.utilizator.username : null) : null;
                return res.status(404).render("404", {username: u});
            } else {
                throw err;
            }
        }
        res.send(html);
    });
});