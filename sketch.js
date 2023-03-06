//// global values
////P5.PLAY AND P5.SOUND ARE NEEDED FOR THIS CODE TO WORK
//// CAUTION!!! SOUND IS LOUD AND OBNOXIOUS AND MAY POSSIBLY (??) CRASH YOUR BROWSER??? but that's why it's called broken hero I suppose.
    // I turned the sound off in the code but you can turn it back on if you want to hear it (line 181)



//// game control
let stage = 0 // keeps track of your functions

//// player 1
let p1X = 300; // p1 = player 1
let p1Y = 500;
let pWidth = 75;
let pHeight = 100;

//// box platforms
let b1X = 1500;  // b1 = box 1
let b1Y = 200;
let b2X = 900;  // box 2
let b2Y = 500;
let b3X = 300;  // box 3
let b3Y = 200;
let bWidth = 250;
let bHeight = 60;

//// souls
let s1X = 1500; // s1 = soul 1
let s1Y = 130;
let s2X = 900; // soul 2
let s2Y = 430;
let s3X = 300; // soul 3
let s3Y = 130; 
let sWidth = 40;
let sHeight = 40;

//// point counter
let score = 0;


//// gravity
let jump = false; // boolean for jumping
let direction = 1; // force of Y gravity
let velocity = 2; // speed of player 1
let jumpPower = 8; // strength of player 
let fallingSpeed = 5; // equal to velocity
let minHeight = 800; // height of ground
let maxHeight = 50; // height of sky
let jumpCounter = 0; // keeps track of jumps

//// multimedia
let hero; // can't use player as a variable name bc it already exists
let platform; // can't use box as a variable name bc it already exists
let landscape; // can't use background as a variable name bc it already exists
let jumpSound;
let soul;

// generate random color 1
const r = Math.floor(Math.random() * 256); // this is the code that generates a random color for the text in the game
const g = Math.floor(Math.random() * 256); 
const b = Math.floor(Math.random() * 256);
const color = `rgb(${r}, ${g}, ${b})`;

// generate a random color
const r2 = Math.floor(Math.random() * 256);
const g2 = Math.floor(Math.random() * 256);
const b2 = Math.floor(Math.random() * 256);
const color2 = `rgb(${r2}, ${g2}, ${b2})`;

//// setup //////////////////////////////////////////// 
function setup() { // this is the setup function that will only run once at the beginning of the game
  createCanvas(windowWidth, windowHeight); // this is the canvas size of the game window
  rectMode (CENTER); // this is the code that makes the rectangles appear in the center of the screen
  textAlign (CENTER); // this is the code that makes the text appear in the center of the screen
  imageMode (CENTER); // this is the code that makes the images appear in the center of the screen


}// end setup

//// game code -- this is where creating things in the canvas goes //////////////////////////////////////////// 
function game (){ // this is the game function that will be called in the draw function below
  // game appearance
    image(landscape, windowWidth / 2, windowHeight / 2, windowWidth, windowHeight) // this is the background image of the game

  // window frame
    noFill(color);
    stroke(color2); 
    strokeWeight(15);
    rect(width / 2, height / 2, width, height); // this is the window frame that the game is in

  // create box platforms
    image(platform, b1X, b1Y, bWidth, bHeight); // this is the image of the box platform, should I change the image for each box?
    image(platform, b2X, b2Y, bWidth, bHeight);
    image(platform, b3X, b3Y, bWidth, bHeight);

  // create player
    image(hero, p1X, p1Y, pWidth, pHeight);

  // create souls
    // soul 1
    image(soul, s1X, s1Y, sWidth, sHeight);  // use different images for different souls? or just change the color?
    // if on souls
    if(p1X >= s1X - sWidth / 2 && p1X <= s1X + sWidth / 2 && p1Y >= s1Y - sHeight / 2 && p1Y <= s1Y + sHeight / 2){ // this is the code that makes the player collect the souls
    s1X = random(0, windowWidth); // this is the code that makes the souls move to a random location on the screen
    s1Y = random(0, windowHeight);
    score = score + 1; // this is the code that adds to the score
  } // end if on souls 1

  // soul 2
    image(soul, s2X, s2Y, sWidth, sHeight);
    // if on soul 2
    if(p1X >= s2X - sWidth / 2 && p1X <= s2X + sWidth / 2 && p1Y >= s1Y - sHeight / 2 && p1Y <= s2Y + sHeight / 2){
    s2X = random(0, windowWidth);
    s2Y = random(0, windowHeight);
    score = score + 1;
  } // end if on souls 2

  // soul 3
    image(soul, s3X, s3Y, sWidth, sHeight);
    // if on souls 3
    if(p1X >= s3X - sWidth / 2 && p1X <= s3X + sWidth / 2 && p1Y >= s3Y - sHeight / 2 && p1Y <= s3Y + sHeight / 2){ 
    s3Y = random(0, windowHeight);
    score = score + 1;
  } // end if on souls 3

  // scoreboard
  textFont('Helvetica'); // change the font to something more fun?
  fill(color);
  stroke(color2);
  strokeWeight(10);
  textSize(30);
  text('SOULS:', 100, 50);
  text(score, 200, 50); // this is the score counter

  // collisions with platforms
    // if on box 1
    if (p1Y + pHeight / 2 >= b1Y - bHeight / 2 && p1Y - pHeight / 2 <= b1Y + bHeight / 2 && p1X >= b1X - bWidth / 2 && p1X <= b1X + bWidth / 2) { // this is the code that makes the player land on the box platforms and not fall through them
    p1Y = b1Y - bHeight / 2 - pHeight / 2; // adjust player position
    velocity = 0; // stop player from falling through box platform
    jumpCounter = 0; //this is the code that makes the player jump again after landing on a box platform. It's not working though :( (?)
    } // end if on box

    // if on box 2
    if (p1Y + pHeight / 2 >= b2Y - bHeight / 2 && p1Y - pHeight / 2 <= b2Y + bHeight / 2 && p1X >= b2X - bWidth / 2 && p1X <= b2X + bWidth / 2) {
    p1Y = b2Y - bHeight / 2 - pHeight / 2; // adjust player position
    velocity = 0;
    jumpCounter = 0;
    } // end if on box
      
    // if on box 3
    if (p1Y + pHeight / 2 >= b3Y - bHeight / 2 && p1Y - pHeight / 2 <= b3Y + bHeight / 2 && p1X >= b3X - bWidth / 2 && p1X <= b3X + bWidth / 2) {
    p1Y = b3Y - bHeight / 2 - pHeight / 2; // adjust player position
    velocity = 0;
    jumpCounter = 0;
    } // end if on box


} // end game function


//// draw //////////////////////////////////////////// 
function draw() { // this is the draw function that will be called in the setup function above
// call functions
  keyPressed(); // this is to make sure the player can't jump infinitely (mine seems to be broken tho? will continue to investigate)
  gravity(); // this is the gravity function that will be called in the draw function below

  if(stage == 0){ // if stage is 0
    game(); // call game function
  } // end if stage 0


} // end draw function


//////////////////////////////////////////////// gravity
function gravity(){ 
 if(p1Y >= minHeight && jump == false ){ // if player is on the ground and not jumping
    p1Y = p1Y; // don't move player up or down
 }
 else{ // if player is in the air
  //jumpSound.play();
  p1Y = p1Y + (direction * velocity);// move player up or down depending on direction and velocity
  jumpCounter = 0; // reset jump counter when falling
 }
 
 if(jump == true){ // if jumping is true (jump key is pressed)
  if(p1Y <= maxHeight || jumpCounter >= jumpPower){ // if player is at maxHeight or has jumped for jumpPower amount of time (jumpPower is the amount of time the player can jump for) 
    velocity = fallingSpeed; // fall at maxHeight
  } //
  else{
   velocity = -jumpPower; //jumping
    jumpCounter = jumpCounter + 1; //

  } //
 } // end jump
 else{ // if not jumping
  velocity = fallingSpeed; // fall at fallingSpeed
 } // end not jumping


} // end gravity function


//// movement, key inputs, and preload ////////////////////////////////////////////
function keyPressed() { // this is the keyReleased function that will be called in the setup function above 
  if(kb.pressing('left')){ // if left arrow or a is pressed
    p1X = p1X - 5; // move left
  } //close move left

  if(kb.pressing('right')){ // if right arrow or d is pressed
    p1X = p1X + 5; //move right 
  } //close move right
  

} // end keyPressed function

//// keyTyped
function keyTyped(){ // this is the keyTyped function that will be called in the setup function above 
if(kb.pressing('up')){ // if up arrow or w is pressed
  jump = true; // jump
} // close jump
else{ // if up arrow or w is not pressed
  jump = false; // don't jump
} // close don't jump


} // end keyTyped function


//// preload
function preload(){
  hero = loadImage('images/hero.png');
  platform = loadImage('images/platform.png');
  landscape = loadImage('images/landscape.png');
  jumpSound = loadSound('sounds/jump.mp3');
  soul = loadImage('images/soul.png');

  
} // end preload