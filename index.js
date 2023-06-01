var express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
require('dotenv').config();
var app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
mongoose.connect(process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', upload.single('upfile'),(req, res) =>{
  res.json({name: req.file.originalname, type: req.file.mimetype, size: req.file.size})
});

app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
