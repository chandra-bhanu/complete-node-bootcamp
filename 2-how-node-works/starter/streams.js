const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {
  //Solution 1 FIXME:
  //   fs.readFile('test-file.txt', (err, data) => {
  //     if (err) console.log(err);
  //     res.end(data);
  //   });

  //   //SOLUTION 2: streams FIXED:
  //   const readable = fs.createReadStream('test-file.txt');
  //   readable.on('data', (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on('end', () => {
  //     res.end();
  //   });
  //   readable.on('error', (err) => {
  //     console.log(err);
  //     res.statusCode(500);
  //     res.end('File not found!');
  //   });

  //SOLUTION 3: streams TODO:
  const readable = fs.createReadStream('test-file.txt');
  readable.pipe(res);
  //readbale source . Pipe(writable destination)
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listerning.......');
});
