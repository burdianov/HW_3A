import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';

const app = express();
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

var jsonContent = {};
fetch(pcUrl)
  .then(async (response) => {
    const result = await response.json();
    jsonContent = result;
  })
  .catch((err) => {
    console.log('Something went wrong: ', err);
  });

app.get('/task3A', async function (req, res) {
  return res.status(200).json(jsonContent);
});

app.get('/task3A/board', async function (req, res) {
  return res.status(200).json(jsonContent.board);
});

app.get('/task3A/board/vendor', async function (req, res) {
  return res.status(200).json(jsonContent.board.vendor);
});

app.get('/task3A/board/model', async function (req, res) {
  return res.status(200).json(jsonContent.board.model);
});

app.get('/task3A/board/cpu', async function (req, res) {
  return res.status(200).json(jsonContent.board.cpu);
});

app.get('/task3A/board/cpu/model', async function (req, res) {
  return res.status(200).json(jsonContent.board.cpu.model);
});

app.get('/task3A/board/cpu/hz', async function (req, res) {
  return res.status(200).json(jsonContent.board.cpu.hz);
});

app.get('/task3A/board/image', async function (req, res) {
  return res.status(200).json(jsonContent.board.image);
});

app.get('/task3A/board/video', async function (req, res) {
  return res.status(200).json(jsonContent.board.video);
});

app.get('/task3A/ram', async function (req, res) {
  return res.status(200).json(jsonContent.ram);
});

app.get('/task3A/ram/vendor', async function (req, res) {
  return res.status(200).json(jsonContent.ram.vendor);
});

app.get('/task3A/ram/volume', async function (req, res) {
  return res.status(200).json(jsonContent.ram.volume);
});

app.get('/task3A/ram/pins', async function (req, res) {
  return res.status(200).json(jsonContent.ram.pins);
});

app.get('/task3A/os', async function (req, res) {
  return res.status(200).json(jsonContent.os);
});

app.get('/task3A/floppy', async function (req, res) {
  return res.status(200).json(jsonContent.floppy);
});

app.get('/task3A/hdd', async function (req, res) {
  return res.status(200).json(jsonContent.hdd);
});

app.get('/task3A/hdd/:hddId', async function (req, res) {
  const hddsArray = jsonContent.hdd;
  if (req.params.hddId <= Object.keys(hddsArray).length && req.params.hddId >= 0) {
    return res.status(200).json(hddsArray[req.params.hddId]);
  } else {
    return res.status(404).send('Not found');
  }
});

app.get('/task3A/hdd/:hddId/vendor', async function (req, res) {
  const hddsArray = jsonContent.hdd;
  if (req.params.hddId <= Object.keys(hddsArray).length && req.params.hddId >= 0) {
    return res.status(200).json(hddsArray[req.params.hddId].vendor);
  } else {
    return res.status(404).send('Not found');
  }
});

app.get('/task3A/hdd/:hddId/size', async function (req, res) {
  const hddsArray = jsonContent.hdd;
  if (req.params.hddId <= Object.keys(hddsArray).length && req.params.hddId >= 0) {
    return res.status(200).json(hddsArray[req.params.hddId].size);
  } else {
    return res.status(404).send('Not found');
  }
});

app.get('/task3A/hdd/:hddId/volume', async function (req, res) {
  const hddsArray = jsonContent.hdd;
  if (req.params.hddId <= Object.keys(hddsArray).length && req.params.hddId >= 0) {
    return res.status(200).json(hddsArray[req.params.hddId].volume);
  } else {
    return res.status(404).send('Not found');
  }
});

app.get('/task3A/monitor', async function (req, res) {
  return res.status(200).json(jsonContent.ram);
});

app.get('/task3A/volumes', async function (req, res) {
  const hddsArray = jsonContent.hdd;
  var volumesArray = [];
  var sizesArray = [];

  for (var i = 0; i < Object.keys(hddsArray).length; i++) {
    var volume = JSON.stringify(hddsArray[i].volume).substr(1, 1);
    var size = JSON.stringify(hddsArray[i].size);
    if (volumesArray.indexOf(volume) == -1) {
      volumesArray.push(volume);
      sizesArray.push(+size);
    } else {
      sizesArray[volumesArray.indexOf(volume)] += +size;
    }
  }

  var resultString = '{"';
  for (var j = 0; j < volumesArray.length; j++) {
    resultString += volumesArray[j] + ':":"' + sizesArray[j] + 'B"';
    if (j < volumesArray.length - 1) {
      resultString += ', "';
    }
  }

  resultString += '}';
  return res.status(200).json(JSON.parse(resultString));
});

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
});
