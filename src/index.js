import './index.css';
import './index.html';
import './game.html';
import './gallery.html';
import './data/birds';

console.log("Its start!");
let lang = 'en';

const linkLang = document.querySelector('.menu__link-lang');

const changeLang = () => {
  if (lang=='en') lang = 'ru'
  else lang = 'en'
  linkLang.innerHTML = `Lang [${lang}]`;
  setQuizList();
  defaulBirdInfo();
  showBirdInfo();
  showMenu();
};
linkLang.addEventListener('click', changeLang);
console.log(lang);

const translate = {
  en: {
    menu: {
      home: 'Home',
      game: 'Game',
      gallery: 'Gallery'
    },
    misc: {
      greetings: 'Welcome to songbird quiz!',
      greetlink: 'press <a class="greetings__link" href="./game.html">play</a> to start the game!',
      score: 'Score',
      birdsinfo: 'Listen to the player and select the name of the bird whose voice sounded'
    }
  },
  ru: {
    menu: {
      home: 'Главная',
      game: 'Викторина',
      gallery: 'Галлерея'
    },
    misc: {
      greetings: 'Добро пожаловать в викторину Songbird',
      greetlink: 'для начала игры нажми <a class="greetings__link" href="./game.html">играть</a> !',
      score: 'Score',
      birdsinfo: 'Прослушайте плеер и выберите название птицы чей голос прозвучал'
    }

  }
};

const showMenu = () => {
  const menuItems = document.querySelectorAll('.menu__link');
  menuItems[0].innerHTML = translate[lang].menu.home;
  menuItems[1].innerHTML = translate[lang].menu.game;
  menuItems[2].innerHTML = translate[lang].menu.gallery;
}
showMenu();

/* GAME JS MOVE THERE because webpack*/
import birdsData from './data/birds';
import emptyBird from './assets/images/bird.jpg'

const curQuiz = document.querySelector('.cur-quiz'),
      curTitle = document.querySelector('.cur-quiz__title'),
      quizList = document.querySelector('.birds__list'),
      birdsInfo = document.querySelector('.birds__info')

const rand = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


let curStage = 0,
    isPlay = false;
const nextStage = () => curStage++;


let quizBird = birdsData[curStage][rand(0,5)],
    selBird = false;
const audioQuiz = new Audio();
audioQuiz.src = quizBird.audio;
const correctAudio = new Audio();
correctAudio.src = './assets/correct.mp3';
const wrongAudio = new Audio();
wrongAudio.src = './assets/wrong.mp3';
console.log(quizBird.name[lang]);
console.log(lang);

const setSelBird = (el) => () => {
  selBird = el;
  if(el.id == quizBird.id) correctAudio.play();
  else wrongAudio.play();
  showBirdInfo();
}
const defaulBirdInfo = () => {
  birdsInfo.innerHTML = translate[lang].misc.birdsinfo;
}
defaulBirdInfo();
const showBirdInfo = () => {
  if (selBird) {
    birdsInfo.innerHTML = '';
    const imgBird = document.createElement('img');
    imgBird.classList.add('birds__info-image')
    imgBird.src = selBird.image;
    imgBird.height = 150;
    birdsInfo.append(imgBird);
    const infoBird = document.createElement('div');
    infoBird.classList.add('birds__info-info');
    infoBird.innerHTML = selBird.description[lang];
    birdsInfo.append(infoBird);
  }
}


const setQuizList = () => {
  if (quizList) {
    quizList.innerHTML = '';
    birdsData[curStage].forEach(el => {
      const li = document.createElement('li');
      li.classList.add('list__item');
      li.textContent = el.name[lang];
      li.addEventListener('click', setSelBird(el));
      quizList.append(li);
    });
  }
}

const setNewStage = () => {
    const curImg = document.querySelector('.cur-quiz__img');
    if (curImg) curImg.style.backgroundImage =  `url(${emptyBird})`;
    setQuizList();
};

setNewStage();
/**PLAYER */
const playButton = document.querySelector('.play'),
timeline = document.querySelector('.timeline'),
audioLen = document.querySelector('.length'),
audioName = document.querySelector('.song-name'),
volumeButton = document.querySelector('.volume-button'),
volumeEl = document.querySelector('.volume'),
volumeSlider = document.querySelector('.volume-slider'),
volumePercentage = document.querySelector('.volume-percentage'),
progressBar = document.querySelector('.progress'),
currentDuration = document.querySelector('.duration .current')

const playPauseAudio = () => {
    if (!isPlay) {
      isPlay = true;
      playButton.classList.add('pause');
      audioQuiz.play();
    } else {
      isPlay = false;
      playButton.classList.remove('pause');
      audioQuiz.pause();
    }
  };
  if (playButton) playButton.addEventListener('click', playPauseAudio);

//audioQuiz.addEventListener('ended', playNext);

audioQuiz.addEventListener(
  "loadeddata",
  () => {
    //audioName.textContent = document.querySelector('.item-active .song-name').textContent;
    if(audioLen)
    audioLen.textContent = getTimeCodeFromNum(audioQuiz.duration);
    //audioQuiz.volume = .75;
  },
  false
);

//progress bar
//click on timeline to skip around
if (timeline)
timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audioQuiz.duration;
  audioQuiz.currentTime = timeToSeek;
}, false);
//check audio percentage and update time accordingly
setInterval(() => {
  if (progressBar)
  progressBar.style.width = audioQuiz.currentTime / audioQuiz.duration * 100 + "%";
  if (currentDuration)
  currentDuration.textContent = getTimeCodeFromNum(audioQuiz.currentTime);
}, 500);
//volume slider click change volume
if(volumeSlider)
volumeSlider.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volumeSlider).width;
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audioQuiz.volume = newVolume;
  volumePercentage.style.width = newVolume * 100 + '%';
}, false)

//volume button mute\unmute
if(volumeButton)
volumeButton.addEventListener("click", () => {
  audioQuiz.muted = !audioQuiz.muted;
  if (audioQuiz.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

/*END OF GAME JS*/