var girl, girl1Img, girl2Img;
var ground1, ground2, groundImg;
var edges;
var platform, platformImg, platformGroup;
var coin, coinImg, coinGroup;
var stoneImg;
var trunkImg;
var gold, goldImg, goldGroup;
var snakeImg;
var lifeImg;
var fireImg;
var obstacleGroup;
var gameState = "play";
var heartImg1,heartImg2,heartImg3;
var heart1,heart2,heart3;
var bullets = 70;
var life = 3;
var score = 0;
var invisibleGround,gameOver,gameOverImg;
var collideSound,collectSound,jumpSound,gameOverSound;


function preload() {
  collectSound=loadSound("collect.wav");
  collideSound=loadSound("collide.wav");
  jumpSound=loadSound("jump.wav");
  gameOverSound=loadSound("gameoversound.wav");

  groundImg = loadImage("Images/background.png");

  girl1Img = loadAnimation("Girl/girl02.png");
  girl2Img = loadAnimation(
    "Girl/girl00.png",
    "Girl/girl01.png",
    "Girl/girl02.png",
    "Girl/girl03.png",
    "Girl/girl04.png",
    "Girl/girl05.png",
    "Girl/girl06.png",
    "Girl/girl07.png",
    "Girl/girl08.png",
    "Girl/girl09.png",
    "Girl/girl10.png",
    "Girl/girl11.png"
  );

  platformImg = loadImage("Images/bricks_2.png");
  coinImg = loadImage("Images/coin.png");
  goldImg = loadImage("Images/gold.png");
  //stoneImg = loadImage("Images/Stone.png");
 // trunkImg = loadImage("Images/stump.png");
  //snakeImg = loadImage("Images/snake.png");
  lifeImg = loadImage("Images/Life.png");
  fireImg = loadAnimation(
    "Images/fire1.png",
    "Images/fire2.png",
    "Images/fire3.png",
    "Images/fire4.png",
    "Images/fire5.png"
  );
 //fireImg=loadImage("Images/fire1.png")
  heartImg1 = loadImage("Images/heart1.png");
  heartImg2 = loadImage("Images/heart2.png");
  heartImg3 = loadImage("Images/heart3.png");
  gameOverImg=loadImage("Images/game_over.png");

}

function setup() {
  createCanvas(800, 410);
  ground1 = createSprite(400, 200, 800, 400);
  ground1.addImage("ground1", groundImg);
  ground1.velocityX = 0;

  ground2 = createSprite(400, 200, 800, 400);
  ground2.addImage("ground2", groundImg);

  invisibleGround=createSprite(400,410,800,20);
  invisibleGround.visible=false;

  gameOver=createSprite(400,200,50,50);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;

  girl = createSprite(150, 260, 50, 50);
  girl.addAnimation("standing", girl1Img);
  girl.addAnimation("running", girl2Img);
  girl.scale = 0.4;
  girl.debug = false;
  girl.setCollider("rectangle", 0, 35, 200, 350);

  heart1 = createSprite(680,40,20,20);
  heart1.visible=false;
  heart1.addImage("heart1",heartImg1);
  heart1.scale = 0.2;

  heart2 = createSprite(660,40,20,20);
  heart2.visible=false
  heart2.addImage("heart2",heartImg2);
  heart2.scale = 0.2;

  heart3= createSprite(640,40,20,20);
  heart3.visible=true;
  heart3.addImage("heart3",heartImg3);
  heart3.scale = 0.2;

  platformGroup = new Group();
  coinGroup = new Group();
  goldGroup = new Group();

  obstacleGroup = new Group();
  edges = createEdgeSprites();
}

function draw() {
  background(0);
  if (gameState === "play") {
    if(life ===3){
      heart3.visible=true;
      heart1.visible=false;
      heart2.visible=false;
    }
 
    if(life ===2){
     heart3.visible=false;
     heart1.visible=false;
     heart2.visible=true;
   }
 
   if(life ===1){
     heart3.visible=false;
     heart1.visible=true;
     heart2.visible=false;
   }
    if (ground2.x < 300) {
      ground2.x = 400;
    }

    if(keyDown("space")){
      jumpSound.play();
      girl.velocityY=-16;
    }
    girl.velocityY=girl.velocityY+0.5;
    if (keyDown("right")) {
      ground2.velocityX = -6;
      girl.changeAnimation("running", girl2Img);
      obstacleGroup.setVelocityXEach(-6);
    }

    girl.collide(edges);
    girl.collide(invisibleGround);

    spawnPlatforms();
    spawnObstacles();
    if (obstacleGroup.isTouching(girl)) {
      collideSound.play();
      life=life-1;
      obstacleGroup.destroyEach();
    }
    if(coinGroup.isTouching(girl)){
      collectSound.play();
      score=score+5;
      coinGroup.destroyEach();
    }
    if(goldGroup.isTouching(girl)){
      collectSound.play();
      score=score+50;
      goldGroup.destroyEach();
    }

    girl.collide(platformGroup)
      if(life===0){
        heart3.visible=false;
        heart1.visible=false;
        heart2.visible=false;
        gameState="end"
      }
  } else if (gameState === "end") {
    gameOverSound.play();
    gameOver.visible=true;

    ground2.velocityX = 0;
    girl.velocityY=0;
    girl.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    platformGroup.setVelocityXEach(0);
    coinGroup.setVelocityXEach(0);
    goldGroup.setVelocityXEach(0);
    girl.changeAnimation("standing",girl1Img);
    
  }

  drawSprites();
  fill(255)
  textSize(20)
  text("Score: " + score,580,100);
}

function spawnObstacles() {
  if (frameCount % 260 === 0) {
   var obstacle = createSprite(1000, 350, 50, 50);
    obstacle.velocityX = -6;
    obstacle.addAnimation("fire",fireImg);
    obstacle.scale = 0.25;
    //var rand = Math.round(random(1, 4));
    /*switch (rand) {
      case 1:
        obstacle.addImage("snake", snakeImg);
        obstacle.scale = 0.2;
        break;
      case 2:
        obstacle.addImage("stone", stoneImg);
        obstacle.scale = 0.1;
        break;
      case 3:
        obstacle.addImage("fire", fireImg);
        obstacle.scale = 0.25;
        break;
      case 4:
        obstacle.addImage("trunk", trunkImg);
        obstacle.scale = 0.3;
        break;

      default:
        break;
    }*/

    obstacle.lifetime = 800;
    obstacleGroup.add(obstacle);
    obstacle.setCollider("rectangle",0,0,50,5)
    obstacle.debug=false;
  }
}

function spawnPlatforms() {
  if (frameCount % 300 === 0) {
    platform = createSprite(1000, 200, 50, 50);
    platform.addImage(platformImg);
    platform.scale = 0.2;
    platform.setCollider("rectangle",0,0,650,100)
    platformGroup.add(platform);
    platform.lifetime = 800;
    platformGroup.setVelocityXEach(-6);
    platform.debug=true;
    
  }

  if (frameCount % 300 === 0) {
    coin = createSprite(1020, 170, 50, 50);
    coin.addImage(coinImg);
    coin.scale = 0.04;
    coinGroup.add(coin);
    coin.lifetime = 800;
    coinGroup.setVelocityXEach(-6);
  }

  if (frameCount % 320 === 0) {
    gold = createSprite(1000, 100, 50, 50);
    gold.addImage(goldImg);
    gold.scale = 0.1;
    goldGroup.add(gold);
    gold.lifetime = 800;
    goldGroup.setVelocityXEach(-6);
  }
}
