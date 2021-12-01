var express = require('express');
const SerialPort = require('serialport');
var router = express.Router();
var serialport = require('serialport');
var portName = 'COM4'; 

var sp = new SerialPort.SerialPort(portName,
  {
    baundRate : 9600,
    dataBits : 8,
    partity : 'none',
    stopBits : 1,
    parser : SerialPort.parsers.Readline("\r\n"),
    disconnectedCallback: openSerialPort
  });

  sp.on('data',function(input)
  {
  var currentTimeStanp = new Date().getTime();
  })

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
