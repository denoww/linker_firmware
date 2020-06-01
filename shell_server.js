// express
var express = require('express');
var app = express();

// files
var fs = require('fs')

// shell
// var shell = require("child_process").exec
var shell = require("child_process").spawn

// vars
var firmDir = "/var/lib/linker_firmware";

// code

var print = function(msg){
  console.log(msg)
}

app.all('*', function(req, res, next){
  print("shell server "+req.method+": http://localhost:3003"+req.url);
  print(getParams(req));
  next();
})

var processLogs = {}


// /linker_service
app.get('/linker_service', function (req, res) {

  var maxLogsTime = 600000; // 10 minutos de logs no máximo

  var backgroundCommands = /install_shell_server|logs|logs_shell_server|install_firmware|reset_data_prod|reset_data_dev|update_firmware|restart_prod|restart_dev|install_dev_dependents|install_dependents/

  var params = getParams(req);
  var cmd = '';
  var resp = {}
  var shortCmd = params.cmd;
  var isLogs = shortCmd.match(/logs/);
  var sendJsonResponse = function(resp) {
    res.write("::::jsonResp::::"+JSON.stringify(resp));
  };
  var lastMsg;
  var firstMsg = false;


  var sendDataStream = function(data, proc){
    lastMsg = data;
    if(!firstMsg){
      firstMsg = true
      data = "::::firstMsg::::"+data
    }
    if(proc.killed) return;
    if(data){
      if(res.___processLogs == processLogs[cmd]){
        if(!res.___scIsEnded){
          data = data.toString().replace(/(\x1b\[38;5;[0-9]+m)|(\x1b\[0m)/g, '')
          res.write(data);
        }
      }else{
        if(isLogs){
          finishRequest();
          killProc(proc);
        }
      }
    }
  };
  var killProc = function(proc){
    if(proc && proc.stdin){
      shell("sh",["-c","kill -INT -"+proc.pid]);
    }
  }
  var finishRequest = function(){
    if(res.___scIsEnded) return;
    res.___scIsEnded = true;
    res.end()
  };
  if(!shortCmd){
    resp.status = 'error';
    resp.color = "red"
    resp.msg = "Erro: envie cmd na url";
    sendJsonResponse(resp);
    finishRequest();
  }
  if(shortCmd){
    cmd = "linker_service "+shortCmd;
    resp.cmd = cmd;

    // quando chegar uma nova request pra um comando idêntico vamos para de falar os logs do comando anterior
    processLogs[cmd] = guid()
    res.___processLogs = processLogs[cmd]


    var alreadyResponded = false;
    var inBackground = shortCmd.match(backgroundCommands);
    if(inBackground){
      resp.status = "running"
      resp.color = "yellow"
      resp.msg = "Executando "+cmd
      sendJsonResponse(resp);
      alreadyResponded = true;
    }
    var proc = shell(cmd, { detached: true, shell: true });

    var mountAndSendJsonResponse = function(msg, isError){
      if (isError)  {
        resp.status = 'error';
        resp.color = "red"
        resp.msg = "Erro ao executar "+cmd;
        // print(cmdError);
      }else{
        msg = msg.toString();
        resp.status = 'success';
        resp.color = "green"
        resp.msg = "Executado "+cmd+" - Resposta: "+msg;
        resp.response = msg;
        // print(cmdResp);
      }
      sendJsonResponse(resp);
    }

    proc.stdout.on('data', (data) => {
      sendDataStream(data, proc)
    });

    proc.stderr.on('data', (data) => {
      sendDataStream(data, proc)
    });

    proc.on('close', (code) => {
      // print(cmd+' terminou exit code '+code);
      isError = code != 0;
      if(!alreadyResponded) mountAndSendJsonResponse(lastMsg, isError);
      proc.exit
      finishRequest()
    });
    setTimeout(function(){
      // no maximo 10 minutos de logs e já fechamos a request
      finishRequest();
      if(isLogs){
        killProc(proc);
      }
    }, maxLogsTime);

  }
});

var getParams = function(req) {
  params = Object.assign( req.body || {}, req.query || {}, req.params || {} );
  params.format = (params.format || '').split('.')[1] || 'html';
  delete params['0']
  return params;
};

var guid = function(){
  var s4 = function(){ return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1) };
  return [s4() + s4(), s4(), s4(), s4(), s4() + s4() + s4()].join('-')
}

// index
app.get('/', function (req, res) {
  html = '<body style="background-color: #b59f00; text-shadow: 2px 2px #0000002e; color: white; text-align: center; font-size: 5em; margin-top: 2em; font-family: sans-serif;">shell server ONLINE</body>';
  res.send(html);
});


app.listen(3003, function () {
  print('Shell Server on port 3003!');
});

// var logFilePath = function(cmd) {
//   var folder = firmDir+"/logs";
//   var logFileName;
//   if(cmd.match(/linker_service/)){
//     logFileName = cmd.split(' ')[1];
//     folder = folder+'/linker_service'
//   }else{
//     logFileName = 'others';
//   }

//   fs.mkdirSync(folder, { recursive: true });

//   return folder+'/'+logFileName+".logs";
// };
