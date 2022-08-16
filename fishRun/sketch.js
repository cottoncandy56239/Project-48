var bg, bg_image
var fish, fish_image
var fish1, fish1_image
var fish2, fish2_image
var fish3, fish3_image
var shark, shark_image
var Score = 0
var lives = 5
var sharksGroup 
var fish1Group, fish2Group, fish3Group
var gameOverSound, chompSound, sadSound

function preload(){
  bg_image = loadImage("background.jpeg");
  fish_image = loadImage("fishMain.png");
  fish1_image = loadImage("fish1.png");
  fish2_image = loadImage("fish2.png");
  fish3_image = loadImage("fish3.png");
  shark_image = loadImage("shark.png");
  gameOverSound = loadSound("gameOver.m4a");
  chompSound = loadSound("chomp.m4a");
  sadSound = loadSound("sad.m4a");

}
function setup(){
createCanvas(800,500);
bg = createSprite(400,250,800,500)
bg.addImage(bg_image);
bg.velocityX = -2;
bg.scale = 1.5;

fish = createSprite(100,250,100,100)
fish.addImage(fish_image);
fish.scale = 0.4;

sharksGroup = new Group();
fish1Group = new Group();
fish2Group = new Group();
fish3Group = new Group();
}

function spawnFish1(){
  if(frameCount%200 === 0) {
    fish1 = createSprite(550,250,100,100)
    fish1.addImage(fish1_image);
    fish1.scale = 0.25;
    fish1.y = Math.round(random(20,600));
    fish1.velocityX = -3;

    fish1Group.add(fish1);
}
}

function spawnFish2(){
  if(frameCount%250 === 0){
    fish2 = createSprite(600,125,100,100)
    fish2.addImage(fish2_image);
    fish2.scale = 0.4;  
    fish2.y = Math.round(random(20,600));
    fish2.velocityX = -5;

    fish2Group.add(fish2);
  }
}

function spawnFish3(){
  if(frameCount%300 === 0){
    fish3 = createSprite(600,375,100,100)
    fish3.addImage(fish3_image);
    fish3.scale = 0.4;
    fish3.y = Math.round(random(20,600));
    fish3.velocityX = -4;

    fish3Group.add(fish3);
  }
}

function spawnSharks(){
  if(frameCount%275 === 0){
    shark = createSprite(400,10,100,100);
    shark.addImage(shark_image);
    shark.scale = 0.5
    shark.velocityX = -2
    shark.y = Math.round(random(50,450));

    sharksGroup.add(shark);
  }
}

function draw(){
  background("skyblue")
  if(bg.x<=300){
    bg.x = width/2
  }
  if(keyIsDown(UP_ARROW)){
    fish.position.y -= 5
  }
  if(keyIsDown(DOWN_ARROW)){
    fish.position.y += 5
  }
  spawnFish1();
  spawnFish2();
  spawnFish3();
  spawnSharks();
  drawSprites();

  textSize(25);
  text("Score: "+Score, 650,20);
  text("Lives: "+lives, 50,20); 

  if(sharksGroup.isTouching(fish)){
    lives -= 1;
    sharksGroup.destroyEach();
    sadSound.play();
  }
  if(lives<=0){
    textSize(35)
    fill("purple")
    text("Game Over",300,250)
    fish.destroy();
    sharksGroup.destroyEach();
    fish1Group.destroyEach();
    fish2Group.destroyEach();
    fish3Group.destroyEach();
    bg.velocityX = 0;
    gameOverSound.play();
  }
  if(fish1Group.isTouching(fish)){
    Score += 20;
    fish1Group.destroyEach();
    chompSound.play();
  }
  if(fish2Group.isTouching(fish)){
    Score += 30;
    fish2Group.destroyEach();
    chompSound.play();
  }
  if(fish3Group.isTouching(fish)){
    Score += 25;
    fish3Group.destroyEach();
    chompSound.play();
  }
  }