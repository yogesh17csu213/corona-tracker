const express = require('express')
const next = require('next')
const routes = require('./routes')
const { createServer } = require('http');
const { parse } = require('url');
const { createReadStream } = require('fs');

const port = 8000
const app = next({'dev':true})

const handler = routes.getRequestHandler(app, async ({req, res, route, query}) => {
	app.render(req, res, route.page, query)
})
console.log('aa',app.prepare())

app.prepare().then(() => {
	const server = express()
	server.use(handler)
	server.disable('x-powered-by')
	server.listen(port, (err) => {
		if (err) throw err
		console.log(`> Ready on http://localhost:${port}`)
	})
})

// app.prepare().then(() => {
// 	createServer((req, res) => {
// 	  const parsedUrl = parse(req.url, true);
// 	  const { pathname } = parsedUrl;
// 		// console.log('.......parse',parsedUrl)	
// 	  if (pathname === '/sw.js') {
// 		res.setHeader('content-type', 'text/javascript');
// 		createReadStream('./offline/serviceWorker.js').pipe(res);
// 	  } else {
// 		handler(req, res, parsedUrl);
// 	  }
// 	  console.log('res',res)
// 	}).listen(port, err => {
// 	  if (err) throw err;
// 	  console.log('> Ready on http://localhost:3000');
// 	});
//   });