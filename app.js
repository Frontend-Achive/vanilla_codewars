const express = require('express');
const axios = require('axios');
const app = express();
// const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const userID = {
  ChanwheKim: { id: 'ChanwheKim', score: 940 , team: 'ukulele' },
  sungsung: { id: 'sungsung', score: 1483, team: 'doggeabi' },
  Song_Song: { id: 'Song_Song', score: 1107 , team: 'ukulele' },
  raccoon_91: { id: 'raccoon_91', score: 1051, team: 'doggeabi' },
  'JUNWOO45': { id: 'JUNWOO45', score: 786 , team: 'ukulele' },
  '92.8m': { id: '92.8m', score: 782, team: 'doggeabi' },
  ParkJongRyul: { id: 'ParkJongRyul', score: 489 , team: 'ukulele' },
  hyerin: { id: 'hyerin', score: 437, team: 'doggeabi' },
  beautifulife: { id: 'beautifulife', score: 363 , team: 'ukulele' },
  Dawoon: { id: 'Dawoon', score: 325, team: 'doggeabi' },
  choinashil: { id: 'choinashil', score: 252, team: 'doggeabi' }
}

function loadPage() {
  app.get('/', function(req, res) {
    const allAxios = [];

    for (let username in userID) {
      if (userID.hasOwnProperty(username)) {
        const userData = axios.get(`https://www.codewars.com/api/v1/users/${username}`, {
          headers: {
            'Authorization': 'bmRwo5_vxprzmnEUmDM'
          }
        });

        allAxios.push(userData);
      }
    }

    Promise.all(allAxios).then(function(results) {
      var doggeabi = {};
      var ukulele = {};
      var doggeabiScore = 0;
      var ukuleleScore = 0;

      results.forEach(function(item) {
        if (userID[item.data.username].team === 'ukulele') {
          item.data.currentScore = userID[item.data.username].score;
          ukulele[item.data.username] = item.data;
          ukuleleScore += item.data.honor - item.data.currentScore;
        } else {
          item.data.currentScore = userID[item.data.username].score;
          doggeabi[item.data.username] = item.data;
          doggeabiScore += item.data.honor - item.data.currentScore;
        }
      });

      res.render('index', {
        doggeabi,
        ukulele,
        doggeabiScore,
        ukuleleScore
      });
    });
  });
}

loadPage();

setTimeout(loadPage, 10000);

app.get('/btn', function(req, res) {
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('SERVER START!!!');
});
