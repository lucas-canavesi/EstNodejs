var http = require('http')

http.createServer(function (req, res) {
    res.end("Hello World! Welcome to my website!")
}).listen(8081) // chama a vriavel e coloca a porta que quer que o servido seja aberto (8081)

console.log("O sevidor está aberto")