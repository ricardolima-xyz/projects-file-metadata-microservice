var express = require('express');
var cors = require('cors');
require('dotenv').config()

const multer  = require('multer');
var fs = require('fs');
var dir = './tmp';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
const upload = multer({ dest: dir });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
  let filename = req.file.originalname;
  let filetype = req.file.mimetype;
  let filesize = req.file.size;
  res.json({name: filename, type: filetype, size: filesize});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
