const fs = require('fs').promises;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser'); 
const gt = require('./analysis');
const ejs = require('ejs');
const dotenv = require('dotenv');
dotenv.config();



var transcriptText = '';
const app = express();


app.listen(process.env.PORT || 3001, () => {
  console.log('listening')
})

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs')


app.get('/', (req, res, next)=> {
  res.render('index')
})

app.post('/results', (req,res,next) => {
  //console.log(req.body.transcript);

  const transcript = req.body.transcript;
 // res.send("recieved your request!");
  transcriptText =  transcript;




  const assignt = async () => {
    const t = await gt.toneFun(transcriptText,process.env.API_KEY,process.env.URL);
    //console.log(t)
    const response = JSON.parse(t);
    console.log(response)
  
    const result = response.result.document_tone.tones[0];
    
    const score = result.score;
    const tone = result.tone_name;
    
    const filler = await gt.findFiller(transcriptText);
    //console.log(filler);

    
    const frequentWords = gt.frequentWords(transcriptText);
    // console.log(frequentWords);

    // const tone = [{
    //   "score" : 70,
    //   "tone_id" : "joy",
    //   "tone_name" : "joy"
    // }];

    // const filler = ['actually', "so"];
    // const frequentWords = "actually";
    
    res.render('result', {
      score: score,
      tone: tone,
      frequentWords: frequentWords,
      filler: filler
    })

  }

  assignt();
  
  
  
})



