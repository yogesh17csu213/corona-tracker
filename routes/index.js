const routes = module.exports = require('next-routes-extended')()
routes
.add('index.home','/','/')
.add('index.resources','/resources','resources')
.add('index.detail','/:path/:param','/')

