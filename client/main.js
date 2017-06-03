'use strict';

// var loopback = require('loopback')
// var User = loopback.User;
// app.model(User);

var options = {
    theme: 'snow'
};

var editor = new Quill('#editor', options);

editor.on('text-change', function() {
    var text = editor.getText()
    console.log(text);
});

$('button').on('click', function(){
    console.log('hiii')
})