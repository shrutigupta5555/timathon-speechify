window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const mic = document.querySelector('.material-icons');
const right = document.querySelector('.right')
const transcriptInput = document.querySelector('.transcript-text');
const button = document.querySelector('.results')

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

let p = document.createElement('p');
const words = document.querySelector('.right');
words.appendChild(p);

recognition.addEventListener('result', e => {
const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = "  " +  poopScript;
    
    if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
    }
});

recognition.addEventListener('end', () => {
    if(mic.classList.contains('play')){
        recognition.start()
    }
});
//recognition.start();

mic.addEventListener('click', () => {
     if(mic.classList.contains('play')){
        console.log('end')
        mic.classList.remove('play');
        console.log(right.textContent)
        //recognition.stop()
     }
     else{
        mic.classList.add('play');
        recognition.start();
        console.log('start');
     }
    
});

button.addEventListener('click', e => {
    transcriptInput.value = right.textContent;
    console.log(transcriptInput.value)
})