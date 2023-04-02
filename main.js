
	
var socket = io(); 
window.addEventListener("load", function(){   //KIEDY STRONA SIĘ ZAŁADUJE
    if( isMobile.any() ) {                      //SPRAWDŹ, CZY JEST TO URZĄDZENIE MOBILNE       
    document.addEventListener("touchstart", ReportTouchStart, false);
    document.addEventListener("touchend", ReportTouchEnd, false);
    document.addEventListener("touchmove", TouchMove, false);}
    else{
    document.addEventListener("mouseup", ReportMouseUp, false);
    document.addEventListener("mousedown", ReportMouseDown, false);
  } 
});
socket.on('GPIO19', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO19').checked = data;
 });
socket.on('GPIO26', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO26').checked = data;
});
socket.on('GPIO5', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO5').checked = data;
  });
socket.on('GPIO6', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO6').checked = data;
});
socket.on('GPIO13', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO13').checked = data;
});
socket.on('GPIO7', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO7').checked = data;
});
socket.on('GPIO20', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO20').checked = data;
});
socket.on('GPIO21', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO21').checked = data;
});
socket.on('GPIO16', function (data) {  
  var myJSON = JSON.stringify(data);
  document.getElementById('GPIO16').checked = data;
});
socket.on('GPIO12', function (data) {  
    var myJSON = JSON.stringify(data);
    document.getElementById('GPIO12').checked = data;
  });
function ReportTouchStart(e) {
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 
    if (x === "GPIO26") {
      socket.emit("GPIO26T"); 
    } else if (x === "GPIO20") {
      socket.emit("GPIO20T"); 
    } else if (x === "GPIO21") {
      socket.emit("GPIO21T"); 
    } else if (x === "GPIO16") {
      socket.emit("GPIO16T");  
    } 
    else if (x === "GPIO19") {
          socket.emit("GPIO19T"); 
        } 
        else if (x === "GPIO12") {
              socket.emit("GPIO12T");  
            } 
      else if (x === "GPIO5") { 
            socket.emit("GPIO5T"); 
        } 
     else if (x === "GPIO6") {
     socket.emit("GPIO6T");  
           } 
           else if (x === "GPIO13") {    
       socket.emit("GPIO13T");  
             } 
             else if (x === "GPIO7") {
         socket.emit("GPIO7T"); 
               } 
  }
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  } else if (e.target.id === "GPIO20M") {

    socket.emit("GPIO20", 1); 
    document.getElementById('GPIO20').checked = 1;
  } else if (e.target.id === "GPIO21M") {

    socket.emit("GPIO21", 1); 
    document.getElementById('GPIO21').checked = 1;
  } else if (e.target.id === "GPIO16M") {

    socket.emit("GPIO16", 1); 
    document.getElementById('GPIO16').checked = 1;
  }
  else if (e.target.id === "GPIO19M") {
    socket.emit("GPIO19", 1); 
    document.getElementById('GPIO19').checked = 1;
      }
      else if (e.target.id === "GPIO12M") {  
    socket.emit("GPIO12", 1); 
     document.getElementById('GPIO12').checked = 1;
          }
       
          else if (e.target.id === "GPIO13M") {
          
                socket.emit("GPIO13", 1); 
                document.getElementById('GPIO13').checked = 1;
              }
              else if (e.target.id === "GPIO7M") {
               
                    socket.emit("GPIO7", 1); 
                    document.getElementById('GPIO7').checked = 1;
                  }
}

function ReportTouchEnd(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  } else if (e.target.id === "GPIO20M") {
    socket.emit("GPIO20", 0); 
    document.getElementById('GPIO20').checked = 0;
  } else if (e.target.id === "GPIO21M") {
    socket.emit("GPIO21", 0); 
    document.getElementById('GPIO21').checked = 0;
  } else if (e.target.id === "GPIO16M") {
    socket.emit("GPIO16", 0); 
    document.getElementById('GPIO16').checked = 0;
  }
  else if (e.target.id === "GPIO19M") {
    socket.emit("GPIO19", 0); 
    document.getElementById('GPIO19').checked = 0;
  }
  else if (e.target.id === "GPIO12M") {
    socket.emit("GPIO12", 0); 
    document.getElementById('GPIO12').checked = 0;
  }
  else if (e.target.id === "GPIO5") {
    socket.emit("GPIO5", 0); 
    document.getElementById('GPIO5').checked = 0;
  }
  else if (e.target.id === "GPIO13") {
    socket.emit("GPIO13", 0); 
    document.getElementById('GPIO13').checked = 0;
  }
  else if (e.target.id === "GPIO7") {
    socket.emit("GPIO7", 0); 
    document.getElementById('GPIO7').checked = 0;
  } 
}

function ReportMouseDown(e) {
  
  var y = e.target.previousElementSibling;
  if (y !== null) var x = y.id;
  if (x !== null) { 

    if (x === "GPIO26") {

      socket.emit("GPIO26T"); 
    } else if (x === "GPIO20") {

      socket.emit("GPIO20T"); 
    } else if (x === "GPIO21") {

      socket.emit("GPIO21T"); 
    } else if (x === "GPIO16") {

      socket.emit("GPIO16T");  
    } 

    else if (x === "GPIO19") {
    
           socket.emit("GPIO19T");  
         } 

         else if (x === "GPIO12") {
          
               socket.emit("GPIO12T"); 
             } 

             else if (x === "GPIO5") {
         
                   socket.emit("GPIO5T");  
                 } 
                 else if (x === "GPIO6") {
               
                       socket.emit("GPIO6T");  
                     } 
    
                     else if (x === "GPIO13") {
                      
                           socket.emit("GPIO13T");  
                         } 
                         else if (x === "GPIO7") {
                         
                               socket.emit("GPIO7T");  
                             } 
  }
  
  if (e.target.id === "GPIO26M") {

    socket.emit("GPIO26", 1); 
    document.getElementById('GPIO26').checked = 1;
  } else if (e.target.id === "GPIO20M") {

    socket.emit("GPIO20", 1); 
    document.getElementById('GPIO20').checked = 1;
  } else if (e.target.id === "GPIO21M") {

    socket.emit("GPIO21", 1); 
    document.getElementById('GPIO21').checked = 1;
  } else if (e.target.id === "GPIO16M") {

    socket.emit("GPIO16", 1); 
  }
  else if (e.target.id === "GPIO19M") {
  
        socket.emit("GPIO19", 1); 
      }

      else if (e.target.id === "GPIO12M") {
    
            socket.emit("GPIO12", 1); 
          }
 else if (e.target.id === "GPIO5M") {
            
                socket.emit("GPIO5", 1); 
              }
              
         else if (e.target.id === "GPIO6M") {
                socket.emit("GPIO6", 1); 
              }
}

function ReportMouseUp(e) {
  if (e.target.id === "GPIO26M") {
    socket.emit("GPIO26", 0); 
    document.getElementById('GPIO26').checked = 0;
  } else if (e.target.id === "GPIO20M") {
    socket.emit("GPIO20", 0); 
    document.getElementById('GPIO20').checked = 0;
  } else if (e.target.id === "GPIO21M") {
    socket.emit("GPIO21", 0); 
    document.getElementById('GPIO21').checked = 0;
  } else if (e.target.id === "GPIO16M") {
    socket.emit("GPIO16", 0); 
    document.getElementById('GPIO16').checked = 0;
  }
  else if (e.target.id === "GPIO19M") {
    socket.emit("GPIO19", 0); 
    document.getElementById('GPIO19').checked = 0;
  }
  else if (e.target.id === "GPIO12M") {
    socket.emit("GPIO12", 0); 
    document.getElementById('GPIO12').checked = 0;
  }
}
function TouchMove(e) {
}



var isMobile = {
  Android: function() {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
      return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
  },
  any: function() {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};


