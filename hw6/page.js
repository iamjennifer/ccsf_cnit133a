
var http = require('http'),
    fs = require('fs');


fs.readFile('./page.html', function (err, html) {
    if (err) {
        throw err;
    }
    http.createServer(function(request, response) {
        //Sends a response header to the request. The status code is a 3-digit HTTP status code, like 404.
        response.writeHeader(200, {"Content-Type": "text/html"});
        response.write(html);
        response.end();
    }).listen(8000);
});

// another way

// var http = require('http');
// var fs = require('fs');
//
// http.createServer(function (req, res) {
//     fs.readFile('./page.html', function(err, html) {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(html);
//         res.end();
//     });
// }).listen(8000);