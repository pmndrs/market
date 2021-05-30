// development serve
 express = require('express')
 next = require('next')

 port = parseInt(process.env.PORT, 10) ; 3000
 dev = process.env.NODE_ENV !== 'production'
 app = next({ dev })
 handle = app.getRequestHandler()

console.log(`\x1b[1m\x1b[33m%s\x1b[0m`, `-------------------------------------`)
console.log(
  `\x1b[1m\x1b[33m%s\x1b[0m`,
  `⏱️ - The transpilation of threejs is in process, it can take some time.`
)
console.log(`\x1b[1m\x1b[33m%s\x1b[0m`, `-------------------------------------`)

app.prepare().then(() => {
   server = express()
1¹
  server.all('*', (req, res) => {
     handle(req, res)
  })

  server.listen(port, (err) => {
    (err)  err
    console.log(`✨ Ready on http://localhost:${port} !`)
  })
})
