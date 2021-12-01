var express = require('express');
const SerialPort = require('serialport');

var router = express.Router();

var sp = new SerialPort("COM4", {
  baudRate: 9600,
  parser: new SerialPort.parsers.Readline("\n")
});

  sp.on('data',function(input)
  {
  var msg = input.split("-");
  var ledId = msg[0];
  var ledState = msg[1];
  var state;
  if(ledState == "on")
  {
    state = 1;
  }
  else
  {
    state = 0;
  }
  var currentTimeStamp = new Date().getTime();
  if(currentTimeStamp - previousTimeStamp > 1000)
  {
    db.run("update led set state ="+state+"where id ='"+ledId+"';", function(updateError)
    {
      if(updateError)
      {
        console.log("DB KLAIDA! ", updateError);
      }
  });
  previousTimeStamp = currentTimeStamp;
  }
});


spWrite=function(msg)
{
  sp.write(msg);
}

router.post('/SetLed',function(req,res)
{

  var cmd = req.body;
  var msg = cmd.ID + "-" + cmd.State;
  spWrite(msg);
  res.status(200).send('OK');


});

// LED lemputes busenos parodymas
router.get('/', function(req, res)
{
    var db = req.db;

    // getLeds(db, function(leds)
    // {
    //     for(var i = 0; i < leds.length; i++)
    //     {
    //         if(leds[i].state === 1)
    //         {
    //             leds[i].state = "ON";
    //         }
    //         else
    //         {
    //             leds[i].state = "OFF";
    //         }
    //     }
    //     res.render('index', {title: 'LED', data:leds});
    // });
});


//LED lemputės būsenos atidavimas Andorid programai:
router.post('/getLed', function(req, res)
{
    var db = req.db;
    var data = req.body;

    getLed(db, data.ID, function(led)
    {
        if(led.length == 1)
        {
            res.json(led[0]);
        }
        else
        {
            res.status(500).send('No LED found');
        }
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
