const bottone = document.querySelector('#bottone');
const contenitorepiatto = document.getElementById('piatto');
bottone.addEventListener('click', generatore);
const f = document.querySelector('form');
f.addEventListener('submit', search)

function generatore(event){


    rest_url ='https://foodish-api.herokuapp.com/api/';

    fetch(rest_url).then(onResponse).then(onJson1);
  


}

function onResponse(response){

    console.log(response.status);
   
    return response.json();


}

function onJson1(json){

    console.log(json);
    const p = document.querySelector('#piatto');
    p.innerHTML='';
    const contenitore = document.createElement('img');
    contenitore.src=json.image;
    p.appendChild(contenitore);

}

function onJson(json) {

   console.log(json);
   const library = document.querySelector('#view');
   library.innerHTML = '';
   const results = json.artists.items;
   let nris = results.length;
   if(nris > 3)

    console.log('Superati i 3 risultati');

     nris = 3;
  
   for(let i=0; i<nris; i++)
   {
     const artist_data = results[i]
     const title = artist_data.name;
     const image = artist_data.images[i].url;
     const follow = results[i].followers.total;
     const genere = results[i].genres[0];
  
     const artist = document.createElement('div');
     artist.classList.add('artist');
     const img = document.createElement('img');
     img.src = image;
     const nome = document.createElement('span');
     nome.textContent = title;

     const followers = document.createElement('span');
     followers.textContent = 'Followers: ' + follow;

     const gen = document.createElement('span');
     gen.textContent = 'Genere Musicale: ' + genere;

     artist.appendChild(img);
     artist.appendChild(nome);
     artist.appendChild(followers);
     artist.appendChild(gen);
     library.appendChild(artist);
   }
 }
 
 function onResponse(response) {
   console.log('Risposta ricevuta!!!');
   return response.json();
 }
 
 function search(event)
 {

   event.preventDefault();
   const artist_input = document.querySelector('#artist');
   const artist_value = encodeURIComponent(artist_input.value);
   console.log('Ricerca di: ' + artist_value);
   fetch("https://api.spotify.com/v1/search?type=artist&q=" + artist_value,
     {
       headers:
       {
         'Authorization': 'Bearer ' + token
       }
     }
   ).then(onResponse).then(onJson);
 }
 
 function onTokenJson(json)
 {
   console.log(json)
   token = json.access_token;
 }
 
 function onTokenResponse(response)
 {
   return response.json();
 }
 

 const client_id = 'd4c860fba30d49e5ad6cce24a046379b';
 const client_secret = '5174c572bd624d8588ce342797b766a4';
 let token;

 fetch("https://accounts.spotify.com/api/token",
    {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
     'Content-Type': 'application/x-www-form-urlencoded',
     'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
   }
 ).then(onTokenResponse).then(onTokenJson);

