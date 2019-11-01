// app.js

const express = require("express");
const app = express.Router();
const multer = require("multer");
const path = require("path");
const ObjectId = require("mongoose").Types.ObjectId;
const auth = require("../../middleware/auth");
const config = require("config");
const jwt = require("jsonwebtoken");
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    //cb(null, path.join(__dirname, 'public/documents/'+req.body.topic+'/'+req.body.name+'/'));
    cb(null, path.join(__dirname, "../../public/documents/"));
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });

const Techs = require("../../models/Techs");
const QuizQuestions = require("../../models/QuizQuestions");
const Users = require("../../models/User");
const Topic = require("../../models/Topic");
const QuizResult = require("../../models/QuizResult");
app.post("/createtopic", upload.single("file"), (req, res) => {
  const topic = new Topic(req.body);
  const file = req.file;
  topic
    .save()
    .then(topic => {
      res.status(200).send(file);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.post("/createtech", upload.single("file"), (req, res, next) => {
  Topic.find({ name: req.body.topic }, (err, topic) => {
    if (err) throw err;
    else {
      const file = req.file;
      const tech = {
        name: req.body.name,
        topic: req.body.topic,
        description: req.body.description,
        youtubelink: req.body.youtubelink,
        officialdoc: req.body.officialdoc,
        filename: req.body.filename,
        topicid: topic[0].id
      };
      const techs = new Techs(tech);
      techs
        .save()
        .then(techs => {
          return res.status(200).send(file);
        })
        .catch(err => {
          return res.status(400).send(err);
        });
    }
  });
});

app.get("/showtopic/:id", (req, res) => {
  Topic.find({ _id: req.params.id }, (err, topic) => {
    if (err) {
      console.log(err);
    } else {
      res.json(topic);
    }
  });
});

app.get("/showtechs", (req, res) => {
  Techs.find(function(err, techss) {
    if (err) {
      console.log(err);
    } else {
      res.json(techss);
    }
  });
});

app.get("/showtopics", (req, res) => {
  const decoded = jwt.verify(
    req.headers.authorization,
    config.get("jwtSecret")
  );
  if (decoded.role == "User") {
    Topic.find(
      { $or: [{ name: decoded.project }, { type: "GENERAL" }] },
      function(err, t) {
        if (err) {
          console.log(err);
        } else {
          res.json(t);
        }
      }
    );
  } else {
    Topic.find({}, function(err, t) {
      if (err) {
        console.log(err);
      } else {
        res.json(t);
      }
    });
  }
});

app.get("/getbytopic/:id", (req, res) => {
  /*
    FILTERING TOPICS BY USER'S PROJECT
  const decoded = jwt.verify(
    req.headers.authorization,
    config.get("jwtSecret")
  );
  console.log(decoded);*/
  Techs.find({ topicid: req.params.id }, function(err, techss) {
    if (err) {
      console.log(err);
    } else {
      if (techss) {
        console.log(techss);
        return res.json(techss);
      } else {
        return res.json({ data: "not available" });
      }
    }
  });
});

app.get("/showtech/:id", (req, res) => {
  const id = req.params.id;
  Techs.findById(id, function(err, resp) {
    res.json(resp);
  });
});

app.get("/showtech/:id/showquiz", (req, res) => {
  const keyid = req.params.id;
  QuizQuestions.find({ keyid: keyid }, function(err, resp) {
    res.json(resp);
  });
});

app.post("/showtech/:id/calculateresult", (req, res) => {
  const techId = req.body.techId;
  const topicId = req.body.topicId;
  Topic.findById(topicId, function(err, topic) {
    const topicName = topic.name;
    Techs.findById(techId, function(err, tech) {
      const techName = tech.name;
      const name = {
        topicName: topicName,
        techName: techName
      };
      const data = Object.assign(name, req.body);
      const result = new QuizResult(data);
      result
        .save()
        .then(r => {
          res.status(200).json(r);
        })
        .catch(err => {
          console.log(err);
          res.status(400).send(err);
        });
    });
  });
});

app.get("/showtech/:id/getresults", (req, res) => {
  QuizResult.find({ userId: req.params.id }, function(err, resp) {
    res.json(resp).status(200);
  });
});

app.post("/showtech/:id/addquiz", (req, res, err) => {
  const body = req.body;
  const data = [];
  const option = [];
  for (var i = 0; i < body.q.length; i++) {
    for (var j = 0; j < body.op.length; j++) {
      option[j] = body.op[j];
      data[i] = {
        question: body.q[i],
        options: option[i],
        correctAnswers: body.ca[i]
      };
    }
  }
  var obj = {
    keyid: body.keyid,
    quizData: data,
    time: body.time
  };

  const quizquestions = new QuizQuestions(obj);
  quizquestions
    .save()
    .then(quizquestions => {
      res.json("Questions added successfully");
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.get("/edittech/:id", (req, res) => {
  const id = req.params.id;
  Techs.findById(id, function(err, tech) {
    res.json(tech);
  });
});

app.post("/updatetech/:id", upload.single("file"), (req, res) => {
  Techs.findById(req.params.id, function(err, techs) {
    if (!techs) return res.status(400).send("No tech found");
    else {
      Topic.find({ name: req.body.topic }, (err, topic) => {
        if (err) throw err;
        else {
          const file = req.file;
          techs.topicid = topic[0].id;
          (techs.name = req.body.name),
            (techs.topic = req.body.topic),
            (techs.description = req.body.description),
            (techs.youtubelink = req.body.youtubelink),
            (techs.officialdoc = req.body.officialdoc),
            (techs.filename = req.body.filename);

          techs
            .save()
            .then(techs => {
              return res.status(200).send(file);
            })
            .catch(err => {
              return res.status(400).send("unable to update");
            });
        }
      });
    }
  });
});

app.post("/updatetopic/:id", upload.single("file"), (req, res) => {
  Topic.findById(req.params.id, function(err, topic) {
    if (!topic) return res.status(400).send("No tech found");
    else {
      const file = req.file;
      (topic.name = req.body.name),
        (topic.filename = req.body.filename),
        (topic.type = req.body.type);

      topic
        .save()
        .then(r => {
          return res.status(200).send("updated successfully");
        })
        .catch(err => {
          console.log(err);
          return res.status(400).send("updation failed");
        });
    }
  });
});

app.get("/deletetech/:id", (req, res) => {
  Techs.findByIdAndRemove({ _id: req.params.id }, function(err, techs) {
    if (err) res.json(err);
    else {
      return res.status(200).send("removed successfully");
    }
  });
});

app.get("/deletetopic/:id", (req, res) => {
  Topic.findByIdAndRemove({ _id: req.params.id }, function(err, techs) {
    if (err) res.json(err);
    else {
      return res.status(200).send("removed successfully");
    }
  });
});

module.exports = app;
