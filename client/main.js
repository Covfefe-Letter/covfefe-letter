
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

$('#analyze').on('click', function(){
var result1;
var result2;

$.when(
  //Natural Language API
    $.ajax({
        method: 'POST',
        url: `api/CoverLetters/naturalLanguage?access_token=test&text=${text}`,
        success: function(language){
                result1 = language;
        }
    }),

//Tone Analysis API
    $.ajax({
        method: 'POST',
        url: `api/CoverLetters/tone?access_token=test&text=${text}`,
        success: function(tone){
            result2 = tone;
        }
    })

).then(function() {
    // $('#result1').html(result1);
    // $('#result2').html(result2);
    var confidence = Math.round(result2.toneText.overall.confidence * 100)
    var tentativeness = Math.round(result2.toneText.overall.tentativeness * 100)
    var positivity = Math.round(result1.nluText.sentiment * 100)
    var posOrNeg = positivity >= 0 ? 'positivity' : 'negativity'
    var $sentiment = $('<p></p>').text(`Your confidence is ${confidence}%. Your tentativeness is ${tentativeness}%. Your ${posOrNeg} is ${positivity}%.`)
    $('#tone').append($sentiment)
    var sentences = result2.toneText.sentences
    var angrySentenceArr = sentences.filter(sentence => sentence.anger > 0.5)
    var disgustedSentenceArr = sentences.filter(sentence => sentence.disgust > 0.5)
    var fearfulSentenceArr = sentences.filter(sentence => sentence.fear > 0.5)
    var sadSentenceArr = sentences.filter(sentence => sentence.sadness > 0.5)
    var tentativeSentenceArr = sentences.filter(sentence => sentence.tentative > 0.5)
    var confidentSentenceArr = sentences.filter(sentence => sentence.confident > 0.5)
    var openSentenceArr = sentences.filter(sentence => sentence.openness_big5 > 0.5)
    var conscientiousSentenceArr = sentences.filter(sentence => sentence.conscientiousness_big5 > 0.5)
    var agreeableSentenceArr = sentences.filter(sentence => sentence.agreeableness_big5 > 0.5)
    if (angrySentenceArr.length > 0) {
      var $angerButton = $('<button type="button" class="btn btn-warning improveButton">Anger</button>')
      $('#improve').append($angerButton)
    }
    if (disgustedSentenceArr.length > 0) {
      var $disgustButton = $('<button type="button" class="btn btn-warning improveButton">Disgust</button>')
      $('#improve').append($disgustButton)
    }
    if (fearfulSentenceArr.length > 0) {
      var $fearButton = $('<button type="button" class="btn btn-warning improveButton">Fear</button>')
      $('#improve').append($fearButton)
    }
    if (sadSentenceArr.length > 0) {
      var $sadnessButton = $('<button type="button" class="btn btn-warning improveButton">Sadness</button>')
      $('#improve').append($sadnessButton)
    }
    if (tentativeSentenceArr.length > 0) {
      var $tentativenessButton = $('<button type="button" class="btn btn-warning improveButton">Tentativeness</button>')
      $('#improve').append($tentativenessButton)
    }
    if (confidentSentenceArr.length > 0) {
      var $confidenceButton = $('<button type="button" class="btn btn-success improveButton">Confidence</button>')
      $('#strength').append($confidenceButton)
    }
    // if (sadSentenceArr.length > 0) {
    //       var $sadSentences = $('<h5>These sentences show high levels of sadness</h5>')

    //   $('#improve').append($sadSentences)
    // }
    // var $sadSentences = $('<h5>These sentences show high levels of sadness</h5>')
    // //var $break = $('<br></br>')
    // sadSentenceArr.forEach(sentence => {
    //   $sentence = $('<p></p>').text(text.slice(sentence.from, sentence.to))
    //   $sadSentences.append($sentence)
    // })
    // //var $sadSentences = $('<p></p>').text(`These sentences show high levels of sadness: ${sadSentences}`)
    // var angrySentences = angrySentenceArr.reduce((sentences, sentence) => sentences + ' ' + text.slice(sentence.from, sentence.to), '')
    // var $angrySentences = $('<p></p>').text(`These sentences show high levels of anger: ${angrySentences}`)
    // var disgustedSentences = disgustedSentenceArr.reduce((sentences, sentence) => sentences + ' ' + text.slice(sentence.from, sentence.to), '')
    // var $disgustedSentences = $('<p></p>').text(`These sentences show high levels of digust: ${disgustedSentences}`)
    // var fearfulSentences = fearfulSentenceArr.reduce((sentences, sentence) => sentences + ' ' + text.slice(sentence.from, sentence.to), '')
    // var $fearfulSentences = $('<p></p>').text(`These sentences show high levels of fear: ${fearfulSentences}`)
    // var tentativeSentences = tentativeSentenceArr.reduce((sentences, sentence) => sentences + ' ' + text.slice(sentence.from, sentence.to), '')
    // var $tentativeSentences = $('<p></p>').text(`These sentences show high levels of tentativeness: ${tentativeSentences}`)
    // $('#improve').append($angrySentences)
    // $('#improve').append($fearfulSentences)
    // $('#improve').append($disgustedSentences)
    // $('#improve').append($tentativeSentences)
})
})

$(document).ready(function(){
  $(".nav-tabs a").click(function(){
    $(this).tab('show');
  })
})

$('#submitURL').on('click', function(e) {
  e.preventDefault()
  var urlString = e.target.previousElementSibling.value
  $.ajax({
    method: 'POST',
    url: `api/CoverLetters/analyzeURL?access_token=test&urlString=${urlString}`
  })
  .then(function(data){
       console.log(data)
  })
})
