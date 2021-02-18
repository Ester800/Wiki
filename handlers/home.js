const url = require('url');
const path = require('path');
const fs = require('fs');


module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log('home pathname is ', pathname);

    if (pathname === '/' && req.method === 'GET') {
            let filePath = path.normalize(path.join(__dirname, '../views/home/index.html'));
        
            fs.readFile(filePath, (err, data) => {
              
              if(err) {
                console.log(err);
                res.write(404, {
                  "Content-Type": "text/plain"
                });
                res.write(404);
                res.end();
                return
              } 
              res.writeHead(200, {
                "Content-Type": "text/html" 
              });
              res.write(data);
              res.end();
            });
    } else if (pathname === '/create' && req.method === 'GET') {
      let filePath = path.normalize(path.join(__dirname, '../views/create.html'));

      const index = fs.createReadStream(filePath);

      index.on('data', (data) => {
        console.log('the articles are ', data);
        
        res.write(data)
      });
      index.on('end', () => {
        res.end();
      })
      index.on('error', (err) => {
        console.log(err);
      });

    } else {
      return true;
    }
}