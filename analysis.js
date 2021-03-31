const fs = require('fs').promises;
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');




  // const text = 'Team, I know that times are actually actually actually tough! Product '
  // + 'sales have been disappointing for the past three '
  // + 'quarters. We have a competitive product, but we '
  // + 'need to do a better job of selling it!';

//find tone

const toneFun = (text,apikey,url) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2017-09-21',
    authenticator: new IamAuthenticator({
      apikey: apikey,
    }),
    serviceUrl: url,
  });
  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
  };
  
  
  
  return toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      tone = JSON.stringify(toneAnalysis, null, 2)
      //console.log(JSON.stringify(toneAnalysis, null, 2));
      return tone;
    })
    .catch(err => {
     // console.log('error:', err);
  })
}




//find filler

// const findFiller = async (text) => {
//   const textArr = text.split(" ");

//   const i =  fs.readFile('filler.txt', function (err, data) {
//     if (err) throw err;
  

//     const fillerArr = await data.toString();
//     let filler = fillerArr.split("\r\n")
//     const intersection = textArr.filter(value=>filler.includes(value));
//     console.log(intersection)
//     //return intersection
    
//   });

//   //console.log(i)
// }

const findFiller = async (text) => {

  const textArr = text.split(" ");
  const data =  await fs.readFile('filler.txt')
  const dataString = await data.toString()

  let filler = dataString.split("\r\n")
  const intersection = textArr.filter(value=>filler.includes(value));
  //console.log(intersection)
  return intersection
  
}


findFiller("actually actually");


// //find pace


// //find most frequently used words
const frequentWords = (text) => {
  const textArr = text.split(" ");
  const sample = textArr.filter(word => {
    return  word.length > 3;
   })
  
  function mode(arr){
    return arr.sort((a,b) =>
          arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop();
  }

  return mode(sample);
}




// mode(sample)




module.exports.toneFun = toneFun;
module.exports.findFiller = findFiller;
module.exports.frequentWords = frequentWords;