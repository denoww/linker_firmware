// express
var express = require('express');
var app = express();

// shell
var shell = require("child_process").exec

var getParams = function(req) {
  params = Object.assign( req.body || {}, req.query || {}, req.params || {} );
  params.format = (params.format || '').split('.')[1] || 'html';
  delete params['0']
  return params;
};

app.all('*', function(req, res, next){
  console.log(req.method+": "+req.url);
  console.log(getParams(req));
  next();

})

// index
app.get('/', function (req, res) {
  html = '<body style="background-color: #b59f00; text-shadow: 2px 2px #0000002e; color: white; text-align: center; font-size: 5em; margin-top: 2em; font-family: sans-serif;">shell server ONLINE</body>';
  res.send(html);
});

// /linker_service
app.get('/linker_service', function (req, res) {
  backgroundCommands = ['update', 'restart_prod', 'restart_dev']

  params = getParams(req);
  cmd = '';
  resp = {}
  if(params.cmd){
    cmd = "linker_service "+params.cmd;
    resp.cmd = cmd;

    alreadyResponded = false;
    if(backgroundCommands.includes(params.cmd)){
      resp.status = "running"
      res.json(resp);
      alreadyResponded = true;
    }

    shell(cmd, function(cmdError, cmdResp, stderr){
      if (cmdResp)   {
        resp.status = 'success';
        resp.response = cmdResp.replace(/\n$/g, '');
        console.log(cmdResp);
      }
      if (cmdError)  {
        resp.status = 'error';
        console.log(cmdError);
      }
      if (stderr) { console.log(stderr); }
      if(!alreadyResponded){ res.json(resp); }

    });
  }else{
    resp.response = "Erro: envie cmd na url";
    res.json(resp);
  }
});

app.listen(3003, function () {
  console.log('Shell Server on port 3003!');
});
