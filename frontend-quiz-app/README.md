# Frontend Mentor - Frontend quiz app solution

This is a solution to the [Frontend quiz app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/frontend-quiz-app-BE7xkzXQnU). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)




## Overview

### The challenge

Users should be able to:

- Select a quiz subject
- Select a single answer from each question from a choice of four
- See an error message when trying to submit an answer without making a selection
- See if they have made a correct or incorrect choice when they submit an answer
- Move on to the next question after seeing the question result
- See a completed state with the score after the final question
- Play again to choose another subject
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Navigate the entire app only using their keyboard
- **Bonus**: Change the app's theme between light and dark


## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JS



### What I learned

Even though I went a bit overboard on this one, I really lerarned a lot. I decided to focus on developing my JavaScript skills and chose to make it a standalanoe component. This meant populating the DOM quiz element entirely with JS, as well as injecting the styles rather than linking. The point of all this was to create a quiz-app that can be reused and embedded anywhere, by simply having a DOM-element with a class of `.frontend-quiz`, putting the files (json, css, icons) in the correct server folder, and linking the `frontend-quiz.js` script. 

I also made use of `@container`-queries to ensure responsiveness inside a user-resizable element. 

Overall, I'm very proud of how this turned out.


### Continued development

This took a long time, and so time managment becomes something to ponder going forward. 

Also, if I did it again, I would simplify the JavaScript. It was very instructive to use classes and nested classes in the way that I did, but it was not at all neccessary for a project of this size.

### Useful resources

- Anything by Kevin Powell on YouTube
- COuntless MDM and W3school articles



## Author

- Website - [Jonatan Samuelsson](https://jontesamuelsson.se)
- Frontend Mentor - [@jonatan-samuelsson](https://www.frontendmentor.io/profile/jonatan-samuelsson)


