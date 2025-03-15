# Frontend Mentor - Social links profile solution

This is a solution to the [Social links profile challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/social-links-profile-UG32l9m6dQ). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)




## Overview

### The challenge

Users should be able to:

- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)



## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- CSS nesting



### What I learned

I decided to attempt nesting CSS this time, which was a lot of fun. Also quite satisfying as it cleans up the code flow and the class names a lot. 

``` 
css
  .social-links-card {
    display: grid;
    justify-items: center;
    text-align: center;

    background-color: var(--grey800);
    width: clamp(300px, 87%, 375px);
    padding: 1.5rem;
    border-radius: 10px;

    .avatar {
        border-radius: 100%;
        height: 90px;
    }

    .profile-info {
        padding: 1.5rem 0;

        h1 {
                font-size: 1.5rem;
                font-weight: 600;
                letter-spacing: .02em;
                margin-bottom: .5em;
            }
        p {
            font-size: .9rem;
            font-weight: 600;
            color: var(--green);
        }
    }

    .profile-desc {
        font-size: .9rem;
    }

    .links {
        display: grid;
        width: 100%;
        margin-top: 1.5rem;
        gap: 1rem;

        .btn {
            display: block;
            
            font-size: .9rem;
            font-weight: 600;
            color: var(--white);
            text-decoration: none;
            background-color: var(--grey700);
            padding-block: 1em;
            border-radius: 5px;

            &:hover, &:active, &:focus {
                background-color: var(--green);
                color: var(--grey900);
            }
        }
    }
   
} 

```

### Continued development

Refining the nesting process



## Author

- Website - [Jonatan Samuelsson](https://www.jontesamuelsson.se)
- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yjonatan-samuelsson)




