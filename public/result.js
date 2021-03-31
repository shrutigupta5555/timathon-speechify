const circleBorder = document.querySelector('.circle-border');
const p = document.querySelector('.score');
const score = parseInt(p.innerText)*100;
//score = 10;
var deg1;
var deg2
if(score > 75){
    deg1 = "270deg";
    const temp = 3.6 * (score-75)
    deg2 = temp + "deg"
}

else if (score < 75 && score > 50){

    const temp1 = 3.6 * (score-50) + 90
    deg1 = temp1 + 'deg';
    
    deg2 = "90deg";
} else {
    const temp2 =  (3.6 * (score))  - 90;
    deg1 = temp2 + 'deg';
    
    deg2 = "90deg";
}

circleBorder.style.backgroundImage = ` linear-gradient(${deg1}, rgb(146,221,200) 50%, transparent 50%), 
linear-gradient(${deg2}, rgb(146,221,200) 50%, #fff 50%)`

