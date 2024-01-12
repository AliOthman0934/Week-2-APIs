'use strict';

const STEP_INTERVAL_MS = 50;
const STEP_SIZE_PX = 10;
const DANCE_TIME_MS = 5000;
const DANCING_CAT_URL =
  'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    // Copy over the implementation from last week
    const step = ()=> {
      if(startPos < stopPos){
        startPos+= STEP_SIZE_PX ;
        img.style.left = startPos + "px";
        setTimeout(step,STEP_INTERVAL_MS);
      }else{
        resolve();
      }
    };
    step();
  });
};

function dance(img) {
  return new Promise((resolve) => {
    // Copy over the implementation from last week
    const orignalSrc = img.src ;
    img.src = DANCING_CAT_URL ;
    setTimeout(()=>{
      img.src = orignalSrc;
      resolve();
    },DANCE_TIME_MS)
  });
};

async function catWalk() {
  const img = document.querySelector('img');
  const startPos = -img.width;
  const centerPos = (window.innerWidth - img.width) / 2;
  const stopPos = window.innerWidth;

  // Use async/await syntax to loop the walk and dance functions
  await walk (img,startPos,centerPos);
  await dance (img);
  await walk (img,centerPos,stopPos);
  catWalk();
}


window.addEventListener('load', catWalk);