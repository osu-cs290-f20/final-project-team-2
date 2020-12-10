var fs = require('fs');
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var taskData = require('./taskData.json');
var miscTaskData = require('./miscTaskData.json');
var userData = require('./userData.json');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

app.use(express.json());

app.use(express.static('public'));

app.get('/', function(req, res, next) {
  res.status(200).render('taskPage', {tasks: taskData, miscTasks: miscTaskData, user: userData});
});

app.post('/addTask', function (req, res, next) {
  console.log("== req.body:", req.body);
  if (req.body && req.body.time && req.body.points && req.body.title && req.body.category) {
  	taskData.push({
  		time: req.body.time,
  		points: req.body.points,
  		title: req.body.title,
      category: req.body.category
  	});
  	console.log("== Data for:", taskData);

  	fs.writeFile(
  		__dirname + '/taskData.json',
  		JSON.stringify(taskData, null, 2),
  		function (err, data) {
  			if (err) {
  				console.log("  -- err:", err);
  				res.status(500).send("Error saving task in DB");
  			}
  			else {
  				res.status(200).send("Task successfully added.");
  			}
  		});
	}
	else{
  	res.status(400).send("Request body must contain 'time', 'points', 'title', and 'category'.");
  }
});

app.post('/addTaskMisc', function (req, res, next) {
  console.log("== req.body:", req.body);
  if (req.body && req.body.time && req.body.points && req.body.title && req.body.category) {
    miscTaskData.push({
      time: req.body.time,
      points: req.body.points,
      title: req.body.title,
      category: req.body.category
    });
    console.log("== Data for:", miscTaskData);

    fs.writeFile(
      __dirname + '/miscTaskData.json',
      JSON.stringify(miscTaskData, null, 2),
      function (err, data) {
        if (err) {
          console.log("  -- err:", err);
          res.status(500).send("Error saving misc task in DB");
        }
        else {
          res.status(200).send("Misc task successfully added.");
        }
      });
  }
  else{
    res.status(400).send("Request body must contain 'time', 'points', 'title', and 'category'.");
  }
});

app.post('/removeTask', function (req, res, next) {
  if (req.body && req.body.titleToRemove && req.body.categoryToRemove){
    if (req.body.categoryToRemove === "daily") {
      for (task in taskData) {
        if (taskData[task]["title"] === req.body.titleToRemove) {
          taskData.splice(task, 1);
        }
      }
      fs.writeFile(
        __dirname + '/taskData.json',
        JSON.stringify(taskData, null, 2),
        function (err, data) {
          if (err) {
            console.log("  -- err:", err);
            res.status(500).send("Error removing task from DB");
          }
          else {
            res.status(200).send("Task successfully removed.");
          }
      });

    }
    else if (req.body.categoryToRemove === "misc") {
      for (task in miscTaskData) {
        if (miscTaskData[task]["title"] === req.body.titleToRemove) {
          miscTaskData.splice(task, 1);
        }
      }
      fs.writeFile(
        __dirname + '/miscTaskData.json',
        JSON.stringify(miscTaskData, null, 2),
        function (err, data) {
          if (err) {
            console.log("  -- err:", err);
            res.status(500).send("Error removing misc task from DB");
          }
          else {
            res.status(200).send("Misc task successfully removed.");
          }
      });
    }
    else {
      res.status(400).send("categoryToRemove must be either 'daily' or 'misc'.");
    }
  }
  else {
    res.status(400).send("Request body must contain 'titleToRemove', and 'categoryToRemove'.");
  }
});

app.post('/updateUser', function (req, res, next) {
  console.log('== userData[0]["level"]', userData[0]["level"]);
  console.log('== req.body.level', req.body.level);
  console.log('== req.body.experience', req.body.experience);
  if (req.body && req.body.level && req.body.experience){
    userData[0]["level"] = String(req.body.level);
    userData[0]["experience"] = String(req.body.experience);
    console.log('userData[0]["level"]', userData[0]["level"]);
    console.log('== userData[0]["experience"]', userData[0]["experience"]);
    fs.writeFile(
      __dirname + '/userData.json',
      JSON.stringify(userData, null, 2),
      function (err, data) {
        if (err) {
          console.log("  -- err:", err);
          res.status(500).send("Error updating user data in DB.");
        }
        else {
          res.status(200).send("User data successfully updated.")
        }
    });
  }
});

app.get('*', function (req, res) {
    res.status(404).render('404', {
      url: req.url
    });
});

app.listen(port, function () {
  console.log("==Server is listening on port", port);
});