const homeRoute = require('./home')
const loginRoute = require('./login')
const registerRoute = require('./register')
const authRoute = require('./auth')

function route(app) {
  app.use('/', homeRoute)
  app.use('/login', loginRoute)
  app.use('/register', registerRoute)
  app.use('/auth', authRoute)
}

module.exports = route