const urlParams = new URLSearchParams(window.location.search);
const data =[];

for(const param of urlParams){
  data.push(param);
}

const[[key,value]]=data;
const getOne=async()=>{
  try{
  const response = await axios.get(`https://musicplayerback.onrender.com/api/music/${value}`);
  const {title,image,link,id} = response.data;
  let musicPlayer =`
  <div class="child">
  <pre><h1>${title.toUpperCase()}</h1></pre>
  <img alt="img" loading="lazy" src="${image}" height="300px" width="500px">
  <div class="control">
  <button id="prev" class="btns" onclick="prev(${id})">⏮️</button>
  <audio src="${link}" controls autoplay></audio>
  <button class="btns" onclick="next(${id})">⏭️</button>
  </div>
  </div>
  `;
  document.getElementsByClassName("parent")[0].innerHTML=musicPlayer;
  }catch(error){
    console.log(error);
  }
}
getOne();
async function prev(id){
  let prev = id-1;
  if(prev<=0){
    document.getElementById("prev").style.cursor="not-allowed";
    document.getElementById("prev").style.backgroundColor="grey";
    document.getElementById("prev").style.opacity="0.6";
  }
  else if(prev>=1){
  document.getElementById("prev").style.cursor="pointer";
  document.getElementById("prev").style.backgroundColor="black";
  document.getElementById("prev").style.opacity="1";
  const response = await axios.get(`https://musicplayerback.onrender.com/api/music`);
  const filter = response.data.filter((element)=>element.id===prev);
  let listing =``;
  filter.map(({title,image,link,id})=>
  listing +=`
  <div class="child">
  <pre><h1>${title.toUpperCase()}</h1></pre>
  <img alt="img" loading="lazy" src="${image}" height="300px" width="500px">
  <div class="control">
  <button id="prev" class="btns" onclick="prev(${id})">⏮️</button>
  <audio src="${link}" controls autoplay></audio>
  <button class="btns" onclick="next(${id})">⏭️</button>
  </div>
  </div>
  `
  );
  document.getElementsByClassName("parent")[0].innerHTML=listing;
  }
}
async function next(ids){
  let next = ids+1;
  const response = await axios.get(`https://musicplayerback.onrender.com/api/music`);
  let max; 
  for(let i=0;i<response.data.length;i++){
    max = Math.max(response.data[i].id);
  }
  if(next>max){
    const response = await axios.get(`https://musicplayerback.onrender.com/api/music/65f033e4f777594c54bad5f5`);
    const {title,image,link,id} = response.data;
    let musicPlayer =`
    <div class="child">
    <pre><h1>${title.toUpperCase()}</h1></pre>
    <img alt="img" loading="lazy" src="${image}" height="300px" width="500px">
    <div class="control">
    <button id="prev" class="btns" onclick="prev(${id})">⏮️</button>
    <audio src="${link}" controls autoplay></audio>
    <button class="btns" onclick="next(${id})">⏭️</button>
    </div>
    </div>
    `;
    document.getElementsByClassName("parent")[0].innerHTML=musicPlayer;
  }
  else{
  const filter = response.data.filter((element)=>element.id===next);
  let listing =``;
  filter.map(({title,image,link,id})=>
  listing +=`
  <div class="child">
  <pre><h1>${title.toUpperCase()}</h1></pre>
  <img alt="img" loading="lazy" src="${image}" height="300px" width="500px">
  <div class="control">
  <button id="prev" class="btns" onclick="prev(${id})">⏮️</button>
  <audio src="${link}" controls autoplay></audio>
  <button class="btns" onclick="next(${id})">⏭️</button>
  </div>
  </div>
  `
  );
  document.getElementsByClassName("parent")[0].innerHTML=listing;
  }
}
