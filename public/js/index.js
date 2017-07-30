const playlistTag = Select._id("playlist")
const clientId = ''

var form = Select._element("form")
form.onsubmit = function(e){
  e.preventDefault()
  var query = Select._element("input").value
  Playlist.build(query)
}
