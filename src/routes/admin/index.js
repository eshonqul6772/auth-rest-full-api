const loginRouter = require('./auth');
const userRouter = require('./user')


module.exports = [
  loginRouter,
  userRouter
]