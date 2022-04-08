const $ = document;
const myVars = {
    background: $.getElementById('background'),
    cover: $.getElementById('cover'),
    title: $.getElementById('title'),
    artist: $.getElementById('artist'),
    audio: $.querySelector('audio'),
    progressContainer:$.getElementById('progress-container'),
    progress:$.getElementById('progress'),
    currentTime: $.getElementById('current-time'),
    duration: $.getElementById('duration'),  
    previous: $.getElementById('previous'),
    next: $.getElementById('next'),
    play: $.getElementById('play'),
    list: $.getElementById('music-list'),
    
    isPlaying:false,
    songsIndex:0
}

const mySongs = [
    {
        title:'Hichi Nago',
        artist:'Majid KharatHa',
        cover:'file/cover/1.jpg',
        src:'file/music/1.mp3'
    },
    {
        title:'Kharabesh Kardi',
        artist:'Majid KharatHa',
        cover:'file/cover/2.jpg',
        src:'file/music/2.mp3'
    },
    {
        title:'Ghalbe Mani',
        artist:'Majid KharatHa',
        cover:'file/cover/3.jpg',
        src:'file/music/3.mp3'
    }
]

for (let i = 0 ; i<mySongs.length;i++) {
    let createDivOne =$.createElement("div");
    createDivOne.classList.add('track')
    let createImg =$.createElement("img");
    createImg.src=mySongs[i].cover;
    let createDivTwo =$.createElement("div");
    createDivTwo.classList.add('text')
    let createDivTwoOne =$.createElement("div");
    createDivTwoOne.classList.add('music-title')
    createDivTwoOne.textContent=mySongs[i].title;
    let createDivTwoTwo =$.createElement("div");
    createDivTwoTwo.classList.add('music-artist')
    createDivTwoTwo.textContent=mySongs[i].artist;
    createDivTwo.appendChild(createDivTwoOne);
    createDivTwo.appendChild(createDivTwoTwo);
    createDivOne.appendChild(createImg);
    createDivOne.appendChild(createDivTwo);
    createDivOne.addEventListener('click',function () {
        createDivOne.style.backgroundColor="#13260c"
        loadSong(mySongs[i])
        playSong()
    })
    myVars.list.appendChild(createDivOne);
}

function playSong () {
myVars.isPlaying=true;
myVars.play.classList.replace('fa-play','fa-pause');
myVars.play.setAttribute('title','Play');
myVars.audio.play();
}


function pauseSong () {
    myVars.isPlaying=false;
    myVars.play.classList.replace('fa-pause','fa-play');
    myVars.play.setAttribute('title','Pause');
    myVars.audio.pause();
}

function keyDo (event) {
    switch(event.keyCode){
        case 32: switchPlayPause();
        break;
        case  37:
        previousSong();
        break;
        case   39:
        nextSong();
        break;}
}

function previousSong () {
    myVars.songsIndex--;
    if (myVars.songsIndex<0) {
        myVars.songsIndex=mySongs.length-1;
    }
    loadSong(mySongs[myVars.songsIndex])
    playSong()
}

function nextSong () {
    myVars.songsIndex++;
    if (myVars.songsIndex>mySongs.length) {
        myVars.songsIndex=0
    }
    loadSong(mySongs[myVars.songsIndex])
    playSong()
}

function switchPlayPause () {
    if (myVars.isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
}

function loadSong (song) {
    myVars.title.textContent=song.title;
    myVars.artist.textContent=song.artist;

    myVars.cover.classList.remove('animation');
    setTimeout(()=>{
        myVars.cover.src=song.cover;
        myVars.cover.classList.add('animation');
    },100)
    myVars.background.src=song.cover;
    myVars.audio.src=song.src;
}

function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = myVars.audio.duration;
    myVars.audio.currentTime = (clickX / width) * duration;
  }

  function updateProgressBar(event) {
    if (myVars.isPlaying) {
      const duration = event.srcElement.duration;
      const currentTime = event.srcElement.currentTime;
      // Update progress bar width
      const progressPercent = (currentTime / duration) * 100;
      myVars.progress.style.width = progressPercent + "%";
      // Calculate display for duration
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
    //   if (durationMinutes < 10) {
    //     durationMinutes = "0" + durationMinutes;
    //   }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      // Delay switching duration Element to avoid NaN
      if (durationSeconds) {
        myVars.duration.textContent = durationMinutes + ":" + durationSeconds;
      }
        
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
    //   if (currentMinutes < 10) {
    //     currentMinutes = "0" + currentMinutes;
    //   }
      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      myVars.currentTime.textContent = currentMinutes + ":" + currentSeconds;
    }
  }

loadSong(mySongs[myVars.songsIndex]);

myVars.play.addEventListener('click',switchPlayPause);
$.body.addEventListener('keydown',keyDo);
myVars.previous.addEventListener('click',previousSong);
myVars.next.addEventListener('click',nextSong);
myVars.progressContainer.addEventListener('click',setProgressBar);
myVars.audio.addEventListener('timeupdate',updateProgressBar);
myVars.audio.addEventListener('ended',nextSong);