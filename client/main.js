
// var loopback = require('loopback')
// var User = loopback.User;
// app.model(User);

var options = {
    theme: 'snow'
};

var editor = new Quill('#editor', options);
var text = ''

editor.on('text-change', function() {
  text = editor.getText()
});

$('button').on('click', function(){
    $.ajax({
      method: 'POST',
        url: `api/CoverLetters/tone?access_token=test&text=${text}`
    })
    .then(function(tone){
      console.log(tone)
    })
})

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
  })
})
