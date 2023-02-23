//import playList from './playList.js';
//console.log(playList);

console.log("Task momentum");
console.log("1. Часы и календарь +15");
console.log("2. Приветствие +10");
console.log("3. Смена фонового изображения +20");
console.log("4. Виджет погоды +15");
console.log("5. Виджет цитата дня +10");
console.log("6. Аудиоплеер +15");
console.log("7. Продвинутый аудиоплеер (реализуется без использования библиотек) +6");
console.log("8. Перевод приложения на два языка (en/ru или en/be) +9");
console.log("Total: 100");

const currentLanguage = (navigator.language).slice(0,2);

function getRandomNum() {
   return ( Math.floor(Math.random() * (21 - 1)) + 1);
}

var bgNum = getRandomNum(); 

function setBg() {
    const date = new Date();
    const hours = date.getHours();
    const timeOfDay = getTimeOfDay(hours);
    var bgNumStd = (bgNum.toString()).padStart(2, "0");
    const body = document.querySelector('.bodyMy');
    
    var std1 = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNumStd}.jpg`;
    var std = `${"url('"}${std1}${"')"}`;

    const img = new Image();
    img.src = std; 
    img.onload = () => {      
         body.style.backgroundImage = std;
    };

    
    body.style.backgroundImage = std;
    //body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
}

function showTime() {
    const time = document.querySelector('.time');
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate();
    showGreeting();
    setTimeout(showTime, 1000);
}

function showDate() {
    const timeD = document.querySelector('.date');
    const date = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric'}; //month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC'
    const currentDate = date.toLocaleDateString(currentLanguage, options);

    timeD.textContent = currentDate;
}

function showGreeting() {
    const greeting = document.querySelector('.greeting');
    const date = new Date();
    const hours = date.getHours();

    let timeOfDay = getTimeOfDay(hours);
    let greetingText = `Good ${timeOfDay}`;

    if( currentLanguage === 'uk' ){
        timeOfDay = getTimeOfDayUk(hours);
        greetingText = `${timeOfDay}`;
    }

    if( currentLanguage === 'ru' ){
        timeOfDay = getTimeOfDayRu(hours);
        greetingText = `${timeOfDay}`;
    }

    greeting.textContent = greetingText;
}

function getTimeOfDay(hours) {

    var result = '';
    switch(hours){
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            result = 'morning';
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            result = 'afternoon';
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            result = 'evening';
            break;
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = 'night';
            break;    
    }
    return result;
}

function getTimeOfDayUk(hours) {

    var result = '';
    switch(hours){
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            result = 'Добрий ранок';
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            result = 'Добрий день';
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            result = 'Добрий вечір';
            break;
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = 'Доброї ночі';
            break;    
    }
    return result;
}

function getTimeOfDayRu(hours) {

    var result = '';
    switch(hours){
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            result = 'Доброе утро';
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
            result = 'Добрый день';
            break;
        case 18:
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
            result = 'Добрый вечер';
            break;
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            result = 'Доброй ночи';
            break;    
    }
    return result;
}
  
showTime();
setBg();
function getSlideNext() {
    if( bgNum === 20 ){
        bgNum = 1;
    }
    bgNum++;
    setBg();
}

function getSlidePrev() {
    if( bgNum === 1 ){
        bgNum = 20;
    }
    bgNum--;
    setBg();
}

function setLocalStorage() {
    const name = document.querySelector('.name');
    localStorage.setItem('name', name.value);
    const city = document.querySelector('.city');
    localStorage.setItem('city', city.value); 
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    const name = document.querySelector('.name');
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }

    const city = document.querySelector('.city');
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorage);

var numPL = 0;
const audio = new Audio();
const progressBar = document.querySelector('#progress-bar');

window.onload = function() {
    const slideNext = document.querySelector('.slide-next');
    slideNext.addEventListener('click', getSlideNext);

    const slidePrev = document.querySelector('.slide-prev');
    slidePrev.addEventListener('click', getSlidePrev);

    const changeQuotes = document.querySelector('.change-quote');
    changeQuotes.addEventListener('click', getQuotes);

    const changeAudio = document.querySelector('.play');
    changeAudio.addEventListener('click', changeAudioFunc);

    const playPrev = document.querySelector('.play-prev');
    playPrev.addEventListener('click', getPlayPrev);

    const playNext = document.querySelector('.play-next');
    playNext.addEventListener('click', getPlayNext);

    audio.addEventListener('ended', function() {
        console.log("Audio ended");
        getPlayNext();
    });
}

// weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
city.textContent = localStorage.getItem('city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=${currentLanguage}&appid=e7a86693948fb045e85a88d7d5c3227e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  if( res.status === 404 ){
    temperature.textContent = 'Error';
  }else{
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C${" "}${data.wind.speed}m/c${" "}${data.wind.deg.toFixed(0)}%`;
    weatherDescription.textContent = data.weather[0].description;
  }

}

function setCity(event) {   
  if (event.code === 'Enter') {
    const city1 = document.querySelector('.city');
    city.textContent = city1.value;
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//quotes
const data = [
    {
      "text": "Борітеся – поборете, Вам Бог помагає! За вас правда, за вас сила І воля святая!",
      "author": "Шевченко"
    },
    {
      "text": "Поховайте та вставайте, Кайдани порвіте І вражою злою кров’ю Волю окропіте.",
      "author": "Шевченко"
    },
      {
      "text": "Не вмирає душа наша, Не вмирає воля. Й неситий не виоре На дні моря поле.",
      "author": "Шевченко"
    },
    {
    "text": "Война — это когда за интересы других гибнут совершенно безвинные люди.",
    "author": "Уинстон Черчилль"
    },
    {
    "text": "Погано дуже, страх погано! В оцій пустині пропадать. А ще поганше на Украйні Дивитись, плакать – і мовчать.",
    "author": "Шевченко"
    },
    {
    "text": "Война — это способ богатых людей защитить свои интересы, посылая детей среднего и бедного классов на смерть.",
    "author": "Джордж Карлин"
    },
    {
    "text": "Если бы мысли и силы человечества перестали тратиться на войну, мы за одно поколение смогли бы положить конец нищете во всем мире.",
    "author": "Бертран Рассел"
    },
    {
    "text": "Либо россияне покончит с войной, либо война покончит с росиянами.",
    "author": "Кеннеди"
    },
    {
    "text": "Боритесь — поборете, Вам Бог помогает! За вас правда, за вас сила. И святая воля!",
    "author": "Т.Шевченко"
    },
    {
    "text": "В своем доме своя и правда, и сила, и воля.",
    "author": "Т.Шевченко"
    },
    {
    "text": "Большое счастье быть свободным человеком: делаешь, что хочешь, никто тебя не остановит.",
    "author": "Т.Шевченко"
    },
    {
    "text": "Кажется, лучшего нет ничего у Бога, как Днепр и наша славная страна…",
    "author": "Т.Шевченко"
    },
    {
      "text": "Борітеся – поборете, Вам Бог помагає! За вас правда, за вас сила І воля святая!",
      "author": "Шевченко"
    },
    {
      "text": "Змінюйте світ на краще, піклуйтеся про нього, тому що ви в ньому живете!",
      "author": "Кузьми Скрябіна"
    },
      {
      "text": "Найголовніше — не срати тим, хто навколо тебе.",
      "author": "Кузьми Скрябіна"
    },
    {
    "text": "Люди! Гарного вам дня, хоча я навіть не знаю, що сьогодні — вівторок чи субота і пофіг, вбивайте хамство посмішкою.",
    "author": "Кузьми Скрябіна"
    },
    {
    "text": "Я не твій брат, ти не сестра моя, Ніколи не розказуй мені - хто І в чому я винен на нашій землі",
    "author": "Кузьми Скрябіна"
    },
    {
    "text": "Для гордої і владної душі життя і воля – на горі високій.",
    "author": "Леся Українка"
    },
    {
    "text": "Сором мовчки гинути й страждати, Як маєм у руках хоч заржавілий меч.",
    "author": "Леся Українка"
    },
    {
    "text": "Одвага наша – меч, политий кров'ю.",
    "author": "Леся Українка"
    },
    {
    "text": "Терпіть кайдани – то всесвітський сором, забуть їх, не розбивши, – гірший стид.",
    "author": "Леся Українка"
    }
];

function getQuotes() {
    var numberQuotes = getRandomNum();
    const quote = document.querySelector('.quote');
    const author = document.querySelector('.author');
    var element = data[numberQuotes];
    quote.textContent = `"${element.text}"`;
    author.textContent = element.author;

    //const quotes = '../js/data.json';
   // const res = await fetch(quotes);
    //const data = await res.json(); 
}

getQuotes();

//audio
var isPlay = false;


const playList = [
    {      
      "title": 'Aqua Caelestis',
      "src": '../assets/sounds/Aqua Caelestis.mp3',
      "duration": '02:58'
    },  
    {      
      "title": 'River Flows In You',
      "src": '../assets/sounds/River Flows In You.mp3',
      "duration": '03:50'
    },
    {      
        "title": 'Aqua Caelestis Repeat',
        "src": '../assets/sounds/Aqua Caelestis.mp3',
        "duration": '00:58'
    },  
    {      
        "title": 'River Flows In You Repeat',
        "src": '../assets/sounds/River Flows In You.mp3',
        "duration": '03:50'
    }
];

addList();

function addList() {
    const playListContainer = document.querySelector('.play-list');
    playList.forEach(el => {
        const li = document.createElement('li');
        li.classList.add('play-item');
        li.textContent = el.title;
        playListContainer.append(li);
    });
}

function changeAudioFunc(){
    if ( isPlay ) {
        pauseAudio();
    } else {
        playAudio();
    }
}



function playAudioStd() {

    if(isPlay){
       const std = playList[numPL].src;
       //std = 'https://github.com/irinainina/sound-app-music/blob/master/sounds/antarctic-chorale.mp3';
       const timePlay = playList[numPL].duration;  
       const timeArr = timePlay.split(':');
       audio.src = std;
       audio.currentTime = (Number(timeArr[0])*60) + Number(timeArr[1]);
       audio.play(); 
       console.log('update Progress Value');
       updateProgressValue();
    }else{
       audio.pause();
    } 
}

function playAudio() {
    isPlay = true;
    let tags = document.querySelectorAll('.player-icon');
    tags.forEach(tagG => {
        tagG.classList.add('pause');
    });

    const playListContainer = document.querySelectorAll('.play-item');

    playListContainer.forEach(el => { 
        if( el.textContent === playList[numPL].title ){
            el.classList.add('item-active'); 
            playAudioStd();
        }else{
            el.classList.remove('item-active');
        }
    });
}

function pauseAudio() {
    isPlay = false;
    let tags = document.querySelectorAll('.player-icon');
    tags.forEach(tagG => {
        tagG.classList.remove('pause');
    });
    playAudioStd();
}

function getPlayPrev(){
    if( numPL === 0 ){
        numPL = 4;
    }
    numPL--;
    playAudio();  
}

function getPlayNext(){
    if( numPL === 3 ){
        numPL = -1;
    }
    numPL++;
    playAudio();
}

function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// update progressBar.max to song object's duration, same for progressBar.value, update currentTime/duration DOM
function updateProgressValue() {
    if(!isPlay){
        document.querySelector('.currentTime').textContent = "0:00";
        document.querySelector('.durationTime').textContent = "0:00";
        return;
    }

    if( (formatTime(Math.floor(audio.duration))) === "NaN:NaN" ){
        progressBar.max = 0; 
    }else{
        progressBar.max = audio.duration;
    }
    
    progressBar.value = audio.currentTime;

    document.querySelector('.currentTime').textContent = (formatTime(Math.floor(audio.currentTime)));
    if ( (formatTime(Math.floor(audio.duration))) === "NaN:NaN") {
        document.querySelector('.durationTime').textContent = "0:00";
    } else {
        document.querySelector('.durationTime').textContent = (formatTime(Math.floor(audio.duration)));
    }
    
};

// run updateProgressValue function every 1/2 second to show change in progressBar and song.currentTime on the DOM
setInterval(updateProgressValue, 500);

function changeProgressBar() {
    audio.currentTime = progressBar.value;
};