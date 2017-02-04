var http = require('http');
var spawn = require('child_process').spawn;
var createHandler = require('github-webhook-handler');

var handler = createHandler({ path: '/auto_build', secret: 'gbc' });
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  })
}).listen(6666);

handler.on('error', function (err) {
  console.error('Error:', err)
});

// 监听到push事件的时候执行我们的自动化脚本
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);

  runCommand('sh', ['./auto_build.sh'], function (txt) {
    console.log(txt);
  });

});

function rumCommand(cmd, args, callback) {
  var child = spawn(cmd, args);
  var response = '';
  child.stdout.on('data', function (buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function () { callback(resp) });
}
