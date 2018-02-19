const data = [{
    id: 0,
    type: "music",
    title: "title",
    album: "album",
    author: "author",
    path: "path",
    cover: "cover",
    color: "rgba(0,0,0,1)"
}]


var accessToken = "52cb586e5cc246bc987047f540675c8e";
// $.ajax({
//     url: 'https://api.spotify.com/v1/search',
//     type: 'GET',
//     headers: {
//         'Authorization': 'Bearer ' + accessToken
//     },
//     success: function (data) {
//         console.log(data);
//     }
// });


$.ajax(
    {
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      data: {
        "grant_type":    "authorization_code",
        "code":          code,
        "redirect_uri":  myurl,
        "client_secret": mysecret,
        "client_id":     myid,
      },
      success: function(result) {
        // handle result...
      },
    }
  );