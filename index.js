var express = require('express');
var app = express();
var fs = require('fs');
var pn = require('pn');
var svg2png = require('svg2png');
var shortid = require('shortid');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
var images = {};




// app.use(bodyParser.json()); // support json encoded bodies
// app.use(express.bodyParser({limit: '50mb'}));
// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // support encoded bodies
app.get('/', function (req, res) {
  res.send(shortid.generate());
});


app.post('/post',function(req, res){
	images[req.body.id] = req.body.svg;
	pn.readFile(images[req.body.id])
	  .then(svg2png)
	  .then(buffer => fs.writeFile(req.body.id + '.png', buffer))
	  .catch(e => console.error(e));

	// console.log(images=={});
	// var body = req.body;
	res.send(req.body);
});

app.get('/images',function(req, res){
	var id = req.param('id');
	console.log('id = ' + id);

	res.send(images[id]);
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
