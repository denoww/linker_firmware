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
  backgroundCommands = ['install_shell_server', 'install_firmware', 'update_firmware', 'restart_prod', 'restart_dev', 'install_dev_dependents', 'install_dependents']

  params = getParams(req);
  cmd = '';
  resp = {}
  shortCmd = params.cmd
  if(shortCmd){
    cmd = "linker_service "+shortCmd;
    resp.cmd = cmd;

    alreadyResponded = false;
    if(backgroundCommands.includes(shortCmd)){
      resp.status = "running"
      resp.color = "yellow"
      resp.msg = "Executando "+cmd
      res.json(resp);
      alreadyResponded = true;
    }

    shell(cmd, function(cmdError, cmdResp, stderr){
      if (cmdResp)   {
        response = cmdResp.replace(/\n$/g, '');
        resp.status = 'success';
        resp.color = "green"
        resp.msg = "Executado "+cmd+" - Resposta: "+response
        resp.response = response;
        console.log(cmdResp);
      }
      if (cmdError)  {
        resp.status = 'error';
        resp.color = "red"
        resp.msg = "Erro ao executar "+cmd
        console.log(cmdError);
      }
      if (stderr) { console.log(stderr); }
      if(!alreadyResponded){ res.json(resp); }

    });
  }else{
    resp.status = 'error';
    resp.color = "red"
    resp.msg = "Erro: envie cmd na url";
    res.json(resp);
  }
});

app.listen(3003, function () {
  console.log('Shell Server on port 3003!');
});
