
addEventListener('load',()=>{
    gif.style.opacity=0
})


let songindex=0;
let audio= new Audio(`songs/${songindex}.mp3`)
let masterplay=document.getElementById('masterplay');
let myprogressbar= document.getElementById('myprogressbar');
let gif= document.getElementById('gif')
let songItems= Array.from(document.getElementsByClassName('songItem'))
let mastersongname= document.getElementById('mastersongname')
let banner= document.getElementById('songbanner')


let songs=[
    {songName:"Love me like you do", filePath:"songs/0.mp3", coverPath:"grey.JPG"},
    {songName:"Earned it", filePath:"songs/1.mp3", coverPath:"darker.PNG"},
    {songName:"Not afraid anymore", filePath:"songs/2.mp3", coverPath:"freed.JPG"},
]

songItems.forEach((element, i ) => {
    element.getElementsByTagName('img')[0].src=songs[i].coverPath
});

masterplay.addEventListener('click',()=>{
    if(audio.paused || audio.currentTime<=0){
        audio.play()
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause')
        gif.style.opacity=1
        banner.getElementsByTagName('img')[0].src= songs[0].coverPath
        
    }else{
        audio.pause()
        masterplay.classList.add('fa-play');
        masterplay.classList.remove('fa-pause')
        gif.style.opacity=0
    }
})

audio.addEventListener('timeupdate',()=>{
    progress=parseInt((audio.currentTime/audio.duration) * 100)
    myprogressbar.value=progress
})

myprogressbar.addEventListener('change',()=>{
    audio.currentTime=myprogressbar.value * audio.duration/100
})


const makeallplays=()=>{
    Array.from(document.getElementsByClassName('songitemsplay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle')
        element.classList.add('fa-play-circle')
        })
    }


Array.from(document.getElementsByClassName('songitemsplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeallplays()
        index= e.target.id;
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add('fa-pause-circle')
        audio.src=`songs/${index}.mp3`
        mastersongname.innerText= songs[songindex].songName
        audio.currentTime=0;
        audio.play()
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause')
        gif.style.opacity=1
        banner.getElementsByTagName('img')[0].src= songs[index].coverPath

    })
})


document.getElementById('next').addEventListener('click',(e)=>{
    if(songindex>=2){
        songindex=0
    }
    else{
        songindex+=1;
    }
    audio.src=`songs/${songindex}.mp3`
    mastersongname.innerText= songs[songindex].songName
    audio.currentTime=0;
    audio.play();
    gif.style.opacity=1
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-pause')
    banner.getElementsByTagName('img')[0].src= songs[songindex].coverPath
})

document.getElementById('previous').addEventListener('click',(e)=>{
    if(songindex<=0){
        songindex=0
    }
    else{
        songindex-=1;
    }
    index= e.target.id;
    audio.src=`songs/${songindex}.mp3`
    mastersongname.innerText= songs[songindex].songName
    audio.currentTime=0;
    audio.play();
    gif.style.opacity=1
    masterplay.classList.remove('fa-play')
    masterplay.classList.add('fa-pause')
    banner.getElementsByTagName('img')[0].src= songs[songindex].coverPath
})