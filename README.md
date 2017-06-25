# Covfefe Letter

An app that helps you write cover letters better than our President can write tweets. 

HTML | CSS | jQuery | Loopback | IBM Watson APIs

Made by @jodiely (Developer at Large), @keziyah (Engineer Extraordinaire), @MariannaAtPlay (Queen of Codeland), @rachelfreya (Hacker in Chief), and @ys238 (Empress of Ideas). 

A project started at the 2017 Mobile Monday API First Hackathon (June 2-4). 

## How to use

Live site: http://covfefe-letter.mybluemix.net/

Or: Clone it, go into the directory, and `npm start`. 
You will need a secrets.js file with your credentials for the Watson Natural Language Understanding and Tone Analysis APIs. 

```javascript
module.exports = {
    NLUusername: 'your-natural-language-understanding-username', 
    NLUpassword: 'your-natural-language-understanding-password', 
    toneusername: 'your-tone-analysis-username', 
    tonepassword: 'your-tone-analysis-password'
}
```

## How It Works

Write, or copy and paste a cover letter for a specific job description. 
When you're finished, click analyze, and we'll tell you how you did. 
For example, we'll give you feedback on how confident your letter sounds, or whether some of your sentences sound too tentative.

Need ideas? Well, you should always relate your cover letter to the job and company you're applying for. Click on the suggestions tab and paste in the url for the job description. We'll give you keywords from the description that you can incorporate into your letter. 

Now, revise your cover letter and paste it in again. Compare your current scores to your previous ones. Hopefully you did better. 

## Future releases...

Soon, you will be able to:
*Log in with LinkedIn to compare your resume and skills to the job description
*Save your cover letter
*Use a Mad Libs style cover letter starter if you haven't written one
*And more...
