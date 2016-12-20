// Put your Last.fm API key here
var api_key = "e0c66e2099f1ccde5f18a0d46607baf4";

function initialize()
{

}

//Function to get the basic informations about the artist
function sendRequest () {
    var xhr = new XMLHttpRequest();
    var artist = encodeURI(document.getElementById("form-input").value);
    var method = "artist.getinfo";
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            var url = json.artist.url;
            var bio = json.artist.bio.content;
            var out = '<h1>'+json.artist.name + '</h1><br>' + "<a href=\""+url+"\"> Click here </a> to redirect to last.fm<br><br>";
            out = out + "<img src=" + json.artist.image[2]['#text']+ "/><br><h3>BIOGRAPHY:-</h3>";
            document.getElementById("name").innerHTML = out;
            document.getElementById("artist").innerHTML = '<p style="font-family:verdana; font-size:12px;">' + bio + '</p>';
        }
    };
    xhr.send(null);

}

//Function to retrieve the top albums
function top_albums_function () {
    var xhr = new XMLHttpRequest();
    var artist = encodeURI(document.getElementById("form-input").value);
    var method = "artist.getTopAlbums";
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var album = json.topalbums.album;
            var str = JSON.stringify(json,undefined,2);
            var out = '<br><h2 style="font-family:verdana;">Top Albums </h2><ul style="font-family:verdana; font-size:12px;">';
            var i;
            for (i=0; i<album.length;i++)
            {
                //out = out + "<li>"+album[i].name+ "</li>";
                out = out + '<li>'+album[i].name+ "<br><img src="+ album[i].image[2]['#text'] + "</img>" + "</li><br>";
            }
            out = out + "</ul>";
            //document.getElementById("top_tile").innerHTML = "";
            document.getElementById("top_albums").innerHTML = "<pre>" + out + "</pre>";
        }
    };
    xhr.send(null);
}

//Function to retrieve similar artists
function similar_artists_function () {
    var xhr = new XMLHttpRequest();
    var artist = encodeURI(document.getElementById("form-input").value);
    var method = "artist.getSimilar";
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var similar = json.similarartists.artist;
            var str = JSON.stringify(json,undefined,2);
            var out = '<h2 style="font-family:verdana;">Similar Artists </h2><ul style="font-family:verdana; font-size:12px;">';
            var i;
            for (i=0; i<similar.length;i++)
            {
                out = out + "<li>"+similar[i].name+"</li>";
            }
            out = out + "</ul>";
            document.getElementById("similar_artist").innerHTML =   out ;
        }
    };
    xhr.send(null);

}
