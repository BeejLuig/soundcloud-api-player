const playlistTag = Select._id("playlist")
const clientId = 'fd4e76fc67798bfa742089ed619084a6'

var form = Select._element("form")
form.onsubmit = function(e){
  e.preventDefault()
  var query = Select._element("input").value
  Playlist.build(query)
}
