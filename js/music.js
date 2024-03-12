const getMusic=async()=>{
  try{
  const response = await fetch(`https://musicplayerback.onrender.com/api/music/`);
  const musics = await response.json();
  let music =``;
  musics.map(({title,image,_id})=>
    music +=`
    <tr>
    <td>${title.toUpperCase()}</td>
    <td><img src="${image}" alt="img" loading="lazy" height="150px" width="250px"></td>
  <td>
  <button class="music" onclick="listenMusic('${_id}')">▶️</button>
  </td>
    </tr>
    `);
  document.getElementsByTagName("tbody")[0].innerHTML=music;
  }catch(error){
    console.log(error);
  }
}
getMusic();
function listenMusic(id){
  try{
  window.location.href=`listenmusic.html?id=${id}`;
  }catch(error){
    console.log(error);
  }
}
