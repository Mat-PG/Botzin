exports.PREFIX = 'M '
require('dotenv')
params = {
  env: process.env.NODE_ENV,
  password: process.env.PASSWORD,
  TOKEN_DISCORD: process.env.TOKEN_DISCORD
}
module.exports = params
