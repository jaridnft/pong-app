# Pong game with 'backspin' physics engine

#### Author: Jarid Warren [ <jaridwarren@gmail.com> ]

An enchancement to the classic basic pong game using SVG and requestAnimationFrame().

Like the real game it's based on, ping pong, hitting the ball while your paddle is moving will create a backspin effect.

![alt text](./assets/images/demo.gif 'Backspin Pong Demo')

## Motivation

This project was an opportunity to practice modularity with object oriented programming.

In addition, it was a chance to challenge myself by applying some linear algebra I had learned during my computer engineering degree.

## Technology

- JavaScript ES6 ( [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) )
- NPM / [Webpack](http:https://webpack.js.org/)
- HTML5 / CSS3
- Rendering Engine / SVG

## Code Sample

Below is the primary method, backspin(). The function applies a vector perpendicular to the path of the ball on a backspin event.
Over time, this vector decays, creating the 'arc' effect.

```javascript
// src/partials/Ball.js:142
backspin(player, svg) {            // this function will only alter ball path if this.ballSpinConstant > 0
     if (this.hotOffThePaddle) {
       this.ballSpinConstant = CONFIG.spinConst * player.speedDelta;
       this.previousSpin = this.ballSpinConstant;
       this.hotOffThePaddle = !this.hotOffThePaddle;
       this.bounceDecay =  ;
     }

     let spinVectorX = this.vy * this.ballSpinConstant;   // to create a 'spin' we have to apply a vector perpendicular to [vx,  vy]
     let spinVectorY = -this.vx * this.ballSpinConstant; // by definition, this vector is [vy, -vx]

    if (player.player === 'player ') {             // logic to reverse backspin direction depending on paddle side
       this.vx += spinVectorX;
       this.vy += spinVectorY;
     } else {
       this.vx -= spinVectorX;
       this.vy -= spinVectorY;
     }

     // ballSpinConstant needs to go to 0, or else you can create a perfect circle instead of arc
     // CONFIG.spinDecay < 1, and here we set directly to 0 when it gets sufficiently small
     if (this.ballSpinConstant > 0.0001) {
       this.ballSpinConstant *= CONFIG.spinDecay;
     } else if (this.ballSpinConstant < -0.0001) {
       this.ballSpinConstant *= CONFIG.spinDecay;
     } else {
       this.ballSpinConstant = 0;
     }
```

## Setup
Download or clone repo, then run the following commands in terminal:

**Initialize NPM:**

`> npm init` 

**Install Webpack:**

`> npm install`

**Build project:**

`> webpack`

**Build project for production (compression):**

`> webpack -p`

**Launch dev server to automatically update changes:**

`> webpack-dev-server`

## Keys

**Player 1:**

 * w: up
 * s: down

**Player 2:**

 * ▲ : up
 * ▼: down

**Both Players**

 * spacebar: pause

## More Game Information

* ball speed will increase on each paddle collision
* backspin will only be applied when paddle is moving on contact
* the paddles accelerate, the faster you go the more backspin you can make!
* 'backspin' text will appear to notify user of new ball path
* game is over when one player reaches 10, on menu select 'n' or 'N' to start a new game

## @TODO

* Add start menu that gives user 1 player (with AI opponent) or 2 player option
