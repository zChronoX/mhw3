//Api Spotify

function onJsonSpotify(json) {
    console.log(json);
    const library = document.querySelector('#a1');
    library.innerHTML = '';
    const results = json.albums.items;
    let num_results = results.length;
    if (num_results > 3)
        num_results = 3;
    for (let i = 0; i < num_results; i++) {
        const album_data = results[i]
        const title = album_data.name;
        const url= album_data.uri;
        var site= document.createElement('a');
        site.setAttribute('href', url);
        const selected_image = album_data.images[1].url;
        const album = document.createElement('div');
        album.classList.add('album');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = 'Titolo: ' + title;
        site.textContent = 'Ascolta su Spotify';
        const artist= album_data.artists[0].name;
        const artist_name= document.createElement('span');
        artist_name.textContent = 'Artista: ' + artist;
        album.appendChild(img);
        album.appendChild(caption);
        album.appendChild(artist_name);
        album.appendChild(site);
        library.appendChild(album);
    
    }
}

//Funzione risposta

function onResponse(response) {
    console.log('Success!');
    return response.json();
}

function RicercaSpotify(event) {
    event.preventDefault();     // Impedisco il submit
    const input = document.querySelector('#track');
    const input_value = encodeURIComponent(input.value);
    console.log('Eseguo la ricerca di: ' + input_value);
    // Esegui la richiesta
    fetch("https://api.spotify.com/v1/search?type=album&q=" + input_value,
        {
            headers:
            {
                'Authorization': 'Bearer ' + tokenS
            }
        }
    ).then(onResponse, onError).then(onJsonSpotify);
}

//Funzione token

function ontokenJson(json) {
    console.log(json)
    tokenS = json.access_token;
}
//Funzione risposta token
function ontokenResponse(response) {
    console.log('token Ricevuto!');
    return response.json();
}

//Funzione errore

function onError(error) {
    console.log('Error' + error);
}

//Credenziali Autenticazione OAuth2 Spotify

const client_id = '53a1163462ce409a8a82ea1edec500bd';
const client_secret = 'ebcde69f342040e5a27f5156af282abb';
let tokenS;
//Richiesta token Spotify

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
).then(ontokenResponse).then(ontokenJson);


//EventListener Api Spotify

const f1 = document.querySelector('#formApi1');
f1.addEventListener('submit', RicercaSpotify);


//EventListener YouTube
const f2 = document.querySelector('#formApi2');
f2.addEventListener('submit', search);

//Api YouTube con API Key

const ytUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCT-tEDbhvBTfwmLMeGVOxwnsTTX8SrAgs&q=';


//Funzione risposta Youtube

function onResponseYoutube(response) {
    console.log('Success Youtube!');
    return response.json();
}

function onJsonYoutube(json) {
    console.log(json);
    const library = document.querySelector('#a2');
    library.innerHTML = '';
    const results = json.items;
    let results_value = results.length;
    if (results_value > 3)
        results_value = 3;
    for (let i = 0; i < results_value; i++) {
        const videos = results[i];
        const title = videos.snippet.title;
        const selected_image = videos.snippet.thumbnails.medium.url;
        const channel_title= videos.snippet.channelTitle;
        const id= videos.id.videoId;
        const url=('https://www.youtube.com/watch?v='+id);
        var site= document.createElement('a');
        site.setAttribute('href', url);
        site.textContent = 'Guarda su YouTube';
        const chtitle= document.createElement('span');
        chtitle.textContent= 'Pubblicato da: ' + channel_title;
        const video = document.createElement('div');
        video.classList.add('video');
        const img = document.createElement('img');
        img.src = selected_image;
        const caption = document.createElement('span');
        caption.textContent = 'Titolo: ' + title;
        video.appendChild(img);
        video.appendChild(caption);
        video.appendChild(chtitle);
        video.appendChild(site);
        library.appendChild(video);
    }
}





function search(event) {
    event.preventDefault();
    const text = document.querySelector('#content');
    const text_value = encodeURIComponent(text.value);
    console.log('Cerco:' + text_value);
    fetch(ytUrl + text_value,
        {
            headers:
            {
                'Authorization': 'Bearer'
            }
        }
    ).then(onResponseYoutube, onError).then(onJsonYoutube);
}

