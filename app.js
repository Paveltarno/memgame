'use strict';

// Consts
let DEFAULT_PORT = 3000;

let program = require ('commander');
let app = require ('http').createServer(handler);
let fs = require ('fs');

program
  .version('1.0.0')
  .option('-p, --port <n>', 'Set port', parseInt)
  .parse(process.argv);

let port = program.port || DEFAULT_PORT;
app.listen(port);
console.log(`Server started on port ${port}`);

// HTTP server for static files
function handler(req, res) {
    var url = req.url && req.url !== '/' ? req.url : '/index.html';
    if (url.indexOf('..') !== -1) {
        res.writeHead(403);
        return res.end('Error accessing resource');
    } else {
        if (url.indexOf('/node_modules/') !== 0) {
            url = '/public' + url;
        }
        fs.readFile(__dirname + url,
            function (err, data) {
                if (err) {
                    res.writeHead(500);
                    return res.end('Error loading resource');
                }
                res.writeHead(200);
                res.end(data);
            });
    }
}
