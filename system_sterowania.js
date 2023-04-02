/* 
-------------------------------------------------------------------------------------
PRACA INŻYNIERSKA 
AUTOR: JAKUB MARCHELSKI
 NR INDEKSU: 229112

KIERUNEK: SYSTEMY STEROWANIA INTELIGENTNYMI BUDYNKAMI

ŹRÓDŁA WYKORZYSTYWANE PRZY PISANIU KODU:
1. https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
2. https://socket.io/
3. https://www.npmjs.com/package/onoff
-------------------------------------------------------------------------------------
*/



/*ZMIENNE****************************************************/
var http = require('http').createServer(handler); 
var fs = require('fs');
var url = require('url');
var path = require('path');
var io = require('socket.io','net')(http) 
var Gpio = require('onoff').Gpio; 
var LED26 = new Gpio(26, 'out');
var LED12 = new Gpio(12, 'out');
var LED20 = new Gpio(20, 'out'); 
var LED21 = new Gpio(21, 'out');
var LED16 = new Gpio(16, 'out'); 
var LED19 = new Gpio(19, 'out'); 
var LED6 = new Gpio(6, 'out');
var LED5 = new Gpio(5, 'out');
var LED13 = new Gpio(13, 'out');
var LED7 = new Gpio(7, 'out');

var GPIO21value = 0; 
var GPIO26value = 0;  
var GPIO12value = 0; 
var GPIO20value = 0; 
var GPIO19value = 0;  
var GPIO16value = 0; 
var GPIO6value = 0;
var GPIO5value = 0; 
var GPIO13value = 0;  
var GPIO7value = 0;  

/*STAŁE******************************************************/
const WebPort = 83;
const now = new Date();
const current = now.getHours() + ':' + now.getMinutes();
 
/*****KOMUNIKAJCA****************************/
const { exec } = require('child_process');
let {PythonShell} =require('python-shell');
let options ={
}
var fs  = require('fs');

http.listen(WebPort, function() {  
	LED26.writeSync(GPIO26value); 
    LED12.writeSync(GPIO12value); 
    LED12.writeSync(GPIO21value); 
	LED20.writeSync(GPIO20value); 
	LED19.writeSync(GPIO19value); 
	LED16.writeSync(GPIO16value); 
    LED6.writeSync(GPIO6value); 
    LED5.writeSync(GPIO5value); 
    LED13.writeSync(GPIO13value); 
    LED7.writeSync(GPIO7value);

    for (var i=0;i<3;i++){
        console.log(' ');
    }
    console.log('------------------------------------------');
	console.log('SERWER DZIALA NA PORCIE NR. '+WebPort);
    console.log('------------------------------------------');
	} 
); 

/*************** CZESC PYTHONA ****************************/
 PythonShell.run("/home/pi/Desktop/skrypt.py",options, function (err, result){
    console.log("KONTROLA DOSTEPU: Zmiana statusu Bluetooth");
    });
/*************** CZESC PYTHONA ****************************/



function handler (req, res) { 
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    console.log('filename='+filename);
    var extname = path.extname(filename);
    if (filename=='./') {
      console.log('retrieving default index.html file');
      filename= './index.html';
    }
    


    var contentType = 'text/html';
    switch(extname) {
	case '.js':
	    contentType = 'text/javascript';
	    break;
	case '.css':
	    contentType = 'text/css';
	    break;
	case '.json':
	    contentType = 'application/json';
	    break;
	case '.png':
	    contentType = 'image/png';
	    break;
	case '.jpg':
	    contentType = 'image/jpg';
	    break;
	case '.ico':
	    contentType = 'image/png';
	    break;
    }
    

    
    fs.readFile(__dirname + '/public/' + filename, function(err, content) {
	if(err) {
	    console.log('File not found. Filename='+filename);
	    fs.readFile(__dirname + '/public/404.html', function(err, content) {
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		return res.end(content,'utf8'); 
	    });
	}
	else {
	    res.writeHead(200, {'Content-Type': contentType}); 
	    return res.end(content,'utf8');
	}
      
    });
}


process.on('SIGINT', function () { 
  LED26.writeSync(0); 
  LED26.unexport(); 

  LED12.writeSync(0);
  LED12.unexport(); 
  
  LED20.writeSync(0); 
  LED20.unexport(); 
  
  LED19.writeSync(0); 
  LED19.unexport(); 
  
  LED16.writeSync(0); 
  LED16.unexport(); 

  LED6.writeSync(0); 
  LED6.unexport(); 

  LED21.writeSync(0); 
  LED21.unexport(); 
  
  LED5.writeSync(0); 
  LED5.unexport(); 
  
  LED13.writeSync(0); 
  LED13.unexport(); 
  
  LED7.writeSync(0); 
  LED7.unexport(); 
  
  process.exit(); 
}); 


io.sockets.on('connection', function (socket) {
  
    socket.emit('GPIO26', GPIO26value); 
    socket.emit('GPIO12', GPIO12value);
    socket.emit('GPIO20', GPIO20value); 
    socket.emit('GPIO21', GPIO20value); 
    socket.emit('GPIO19', GPIO19value);
    socket.emit('GPIO16', GPIO16value); 
    socket.emit('GPIO6', GPIO6value);
    socket.emit('GPIO5', GPIO5value);
    socket.emit('GPIO13', GPIO6value);
    socket.emit('GPIO7', GPIO5value);
	
 socket.on('GPIO6T', function(data) { 
	if (GPIO6value) GPIO6value = 0;
	else GPIO6value = 1;
	console.log('GPIO6 :'+GPIO6value);
	LED6.writeSync(GPIO6value); 
	io.emit('GPIO6', GPIO6value);
    });

 socket.on('GPIO13T', function(data) { 
	if (GPIO13value) GPIO13value = 0;
	else GPIO13value = 1;
	console.log('GPIO13 :'+GPIO13value);
	LED13.writeSync(GPIO13value);
	io.emit('GPIO13', GPIO13value);
    });

 socket.on('GPIO7T', function(data) { 
	if (GPIO7value) GPIO7value = 0;
	else GPIO7value = 1;
	console.log('GPIO7 :'+GPIO7value);
	LED7.writeSync(GPIO7value);
	io.emit('GPIO7', GPIO7value); 
    });

     socket.on('GPIO5T', function(data) { 
        if (GPIO5value) GPIO5value = 0;
        else GPIO5value = 1;
        console.log('GPIO5:'+GPIO5value);
        LED5.writeSync(GPIO5value); 
        io.emit('GPIO5', GPIO5value); 
        });
   
    socket.on('GPIO26T', function(data) { 
	if (GPIO26value) GPIO26value = 0;
	else GPIO26value = 1;
	console.log('GPIO26:'+GPIO26value);
	LED26.writeSync(GPIO26value); 
	io.emit('GPIO26', GPIO26value); 
    });
    
 socket.on('GPIO21T', function(data) { 
	if (GPIO21value) GPIO21value = 0;
	else GPIO21value = 1;
	console.log('GPIO21 :'+GPIO21value);
	LED21.writeSync(GPIO21value); 
	io.emit('GPIO21', GPIO21value); 
    });
      
      socket.on('GPIO12T', function(data) { 
        if (GPIO12value) GPIO12value = 0;
        else GPIO12value = 1;
        console.log('GPIO12:'+GPIO12value);
        LED12.writeSync(GPIO12value); 
        io.emit('GPIO12', GPIO12value); 
        });

    socket.on('GPIO20T', function(data) { 
	if (GPIO20value) GPIO20value = 0;
	else GPIO20value = 1;
	console.log('GPIO20:'+GPIO20value);
	LED20.writeSync(GPIO20value); 
	io.emit('GPIO20', GPIO20value); 
    });
  
    socket.on('GPIO19T', function(data) { 
	if (GPIO19value) GPIO19value = 0;
	else GPIO19value = 1;
	console.log('GPIO19:'+GPIO19value);
	LED19.writeSync(GPIO19value); 
	io.emit('GPIO19', GPIO19value);	
    });
    
    socket.on('GPIO16T', function(data) { 
	if (GPIO16value) GPIO16value = 0;
	else GPIO16value = 1;
	console.log('GPIO16:'+GPIO16value);
	LED16.writeSync(GPIO16value);
	io.emit('GPIO16', GPIO16value); 
    });

    socket.on('GPIO26', function(data) { 
	GPIO26value = data;
	if (GPIO26value != LED26.readSync()) {
	    LED26.writeSync(GPIO26value); 
	
	    io.emit('GPIO26', GPIO26value); 
	};	
    });


    
    socket.on('GPIO12', function(data) { 
        GPIO12value = data;
        if (GPIO12value != LED12.readSync()) { 
            LED12.writeSync(GPIO12value);
        
            io.emit('GPIO12', GPIO12value); 
        };	
        });

    socket.on('GPIO20', function(data) { 
	GPIO20value = data;
	if (GPIO20value != LED20.readSync()) { 
	    LED20.writeSync(GPIO20value); 
	   
	    io.emit('GPIO20', GPIO20value); 
	};
    });

    socket.on('GPIO19', function(data) { 
	GPIO10value = data;
	if (GPIO19value != LED19.readSync()) {
	    LED19.writeSync(GPIO19value); 
	   
	    io.emit('GPIO21', GPIO19value);
	};
    });
 socket.on('GPIO6', function(data) { 
	GPIO6value = data;
	if (GPIO6value != LED6.readSync()) { 
	    LED6.writeSync(GPIO6value); 
	   
	    io.emit('GPIO6', GPIO6value); 
	};
    });
    socket.on('GPIO16', function(data) { 
	GPIO16value = data;
	if (GPIO16value != LED16.readSync()) {
	    LED16.writeSync(GPIO16value);
	    
	    io.emit('GPIO16', GPIO16value); 
	};
	
    });
 
    socket.on('disconnect', function () {
	console.log('A user disconnected');
    });
    
}); 

/*KOMUNIKACJA SZEREGOWA*****************************************************
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: '/dev/ttyAMA0', baudRate: 9600 })
const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
parser.on('data', console.log)
/*KOMUNIKACJA SZEREGOWA****************************************************/

const img=fs.readFileSync("/var/www/html/app/public/images/realtime.jpg")
var takeStill = function () {

    var child = exec('libcamera-jpeg -n -o /var/www/html/app/public/images/realtime.jpg --shutter 5000000 --width 700 --height 500');
    child.stdout.on('data', function (data) {
        console.log('child process exited with ' +
            `code ${data}`);
    });
    child.on('exit', function (code, signal) {
     PythonShell.run("/home/pi/Desktop/skrypt.py",options, function (err, result){
            }); 
        async function setEndpoint() {
            takeStill();
        }
        setEndpoint();
    }
    );   
}
takeStill();
 


