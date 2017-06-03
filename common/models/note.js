'use strict';
//NATURAL LANGUAGE UNDERSTANDING
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

var natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': 'bc63e495-bb3c-4753-b524-4c8cffad7f04',
    'password': 'FptCILNHL4cn',
    'version_date': '2017-02-27'
});

//TONE ANALYSIS
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

var tone_analyzer = new ToneAnalyzerV3({
    username: '0e298d54-6b13-4622-9ec6-fc60141d94c3',
    password: 'jjdt0MsvbZgs',
    version_date: '2016-05-19'
});

//MODEL
module.exports = function (Note) {
    Note.excite = function (text, cb) {
        cb(null, text + "!!!!!!!!");
    };

    Note.keywords = function (text, cb) {

        var keywordParams = {
            'text': text,
            'features': {
                'keywords': {
                    'sentiment': true,
                    'emotion': true,
                    'limit': 40
                }
            }
        };

        var res;

        natural_language_understanding.analyze(keywordParams, function (err, response) {
            if (err) {
                console.error(err)
            }
            else {
                // res = JSON.stringify(response, null, 2);
                cb(null, response);
                console.log(response)
            }
        });
    }

    Note.tone = function(text, cb) {
        var toneParams = {
            "text": text,
            "tones": "emotion, language, social"
        }

        tone_analyzer.tone(toneParams, function (error, response) {
            if (error)
                console.error(error);
            else
                cb(null, response);
                console.log(response)
        }
        );
    }
};
