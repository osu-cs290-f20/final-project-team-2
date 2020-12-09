var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var taskData = require('./taskData.json');
var miscTaskData = require('./miscTaskData.json');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.use(express.static('public'));

app.get('/', function(req, res, next) {
  res.status(200).render('taskPage', {tasks: taskData, miscTasks: miscTaskData});
});

app.get('*', function (req, res) {
    res.status(404).render('404', {
      url: req.url
    });
});

app.listen(port, function () {
  console.log("==Server is listening on port", port);
});