'use strict';
//NATURAL LANGUAGE UNDERSTANDING

var keys = require('../../secrets.js')
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': keys.NLUusername,
    'password': keys.NLUpassword,
    'version_date': '2017-02-27'
});

//TONE ANALYSIS
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: keys.toneusername,
    password: keys.tonepassword,
    version_date: '2016-05-19'
});

//MODEL
module.exports = function (CoverLetter) {

    CoverLetter.naturalLanguage = function (text, cb) {

        var NLUparams = {
            'text': text,
            'features': {
                'sentiment': {}, //leave this as a blank object unless there are targets
                'keywords': {
                    'limit': 30
                }
            }
        }

        natural_language_understanding.analyze(NLUparams, function (err, response) {
            if (err) {
                console.error(err)
            }
            else {
                var res = { sentiment: response.sentiment.document.score, keywords: response.keywords }
                cb(null, res);
            }
        })
    }

    CoverLetter.tone = function (text, cb) {
        var toneParams = {
            "text": text,
            "tones": "emotion, language, social"
        }

        tone_analyzer.tone(toneParams, function (error, response) {
            if (error) {
                console.error(error);
            }
            else {
                //This logic makes the Tone Analysis API data easier to access.
                //You will get an array with a length of the number of sentences in the text. Each element is an object that has all the 
                //data you need for each individual sentence.  
                //To highlight, use .from and .to. These represent the chars in the string. 

                //Overall "confident" and "tentative" score
                var conf = response.document_tone.tone_categories[1].tones[1].score
                var tent = response.document_tone.tone_categories[1].tones[2].score

                //Arrange data for each sentence into one array with no nested objects. 
                var newSentences = response.sentences_tone && response.sentences_tone.map(function (sentence) {
                    var sentData = {
                        from: sentence.input_from,
                        to: sentence.input_to
                    }

                    sentence.tone_categories.forEach(function (category) {
                        category.tones.forEach(function (name) {
                            sentData[name.tone_id] = name.score
                        })
                    })

                    return sentData;
                })

                var res = {
                    overall: {
                        confidence: conf,
                        tentativeness: tent
                    },
                    sentences: newSentences
                }

                cb(null, res);
            }
        })
    }

    //For when someone types in a URL for a job description
    CoverLetter.analyzeURL = function (urlString, cb) {

        var NLUparams = {
            'url': urlString,
            'features': {
                'keywords': {
                    'limit': 30
                }
            }
        }

        natural_language_understanding.analyze(NLUparams, function (err, response) {
            if (err) {
                console.error(err)
            }
            else {
                cb(null, response);
            }
        })

    }
};

