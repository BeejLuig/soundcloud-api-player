class Playlist {
  constructor(tracks){
    Playlist.all = Playlist.all || []
    this.tracks = tracks
    this.currentTrack = 0

    for(let i=0; i<tracks.length; i++) {
      let track = this.tracks[i]
      track.index = i
      track.artwork_url = track.artwork_url || "http://senda-arcoiris.info/images/100x100.gif"
    }

    this.template = `
      <div class="container">
        {{#tracks}}
          <div class="card">
            <div class="card-body">
              <div class="artwork" style="background-image: url({{artwork_url}})" onclick="Playlist.stream(this)" id={{index}} data-id={{id}}></div>
              <h3 onclick="Playlist.stream(this)" id={{index}} data-id={{id}} class="track-title">{{title}}</h3>
              <p><a href="{{user.permalink_url}}" target="_blank">by {{user.username}}</a><p>
            </div>
          </div>
        {{/tracks}}
        <div class="controls">
          <button id="play">play</button>
          <button id="pause">pause</button>
          <button id="prev">previous</button>
          <button id="next">next</button>
        </div>
      </div>
    `

    Playlist.all.push(this)
  }

  static stream(element){
    var id = element.dataset.id
    var index = element.id
    var playlist = Playlist.all[0]
    var nextSong = Select._id(parseInt(index)+1)

    playlist.currentTrack = index

    SC.initialize({
      client_id: clientId
    });

    SC.stream('/tracks/' + id).then(function(player){

      player.play();

      player.on("finish",function(){
        Playlist.stream(nextSong)
      });

      var pauseBtn = Select._id('pause')
      var playBtn = Select._id('play')
      var prevBtn = Select._id('prev')
      var nextBtn = Select._id('next')

      playBtn.onclick = () => {
        player.play()
      }


      pauseBtn.onclick = () => {
        player.play()
        player.pause()
      }

      prevBtn.onclick = () => {
        var prevSong = Select._id(parseInt(index)-1)
        Playlist.stream(prevSong)
      }

      nextBtn.onclick = () => {
        Playlist.stream(nextSong)
      }
    });
  }

  static build(query){

    playlistTag.innerHTML = "Loading..."

    SC.initialize({
      client_id: clientId
    });
    SC.get('/tracks', {
      q: query
    }).then(function(tracks) {
      var playlist = new Playlist(tracks)
      playlistTag.innerHTML = Mustache.render(playlist.template, { tracks: playlist.tracks })
      return playlist
    });
  }

}
