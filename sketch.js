var backGround, BackImg;
var spaceShip, shipImg;
var pause, start, pauseImg, startImg;
var comet, cometImg, cometG;
var basalt, blast;
var laser, bulletImg, laserG;
var charge = 0;
var score = 0;
var play = 1;
var pause = 2;
var end = 0;
var gameState = play;
var gameOver, gameOverImg;
var restart, resetImg;
var enemyAttack = 2;
var enemy, enemy1, enemyImg, enemyG, enemy1G;
var enimy2, enimy2Img, enimy2G;
var laser1, laser2, laser2G, laser1G, laserImg;
var explosionSound;
var spaceSound;

function preload() {
  BackImg = loadImage("starsky1.jpg");
  shipImg = loadAnimation("spacejet.png", "spacejet2.png");
  resetImg = loadImage("restart.jpg");
  enemyImg = loadImage("orangeEnemy.png");
  enemy2Img = loadImage("alianship.jpg");
  pauseImg = loadImage("PauseButton.png");
  startImg = loadImage("Start_Button.png");
  cometImg = loadImage("comet1.png");
  laserImg = loadImage("laser1G.png");
  blast = loadAnimation("blast1.png", "blast3.png");
  bulletImg = loadImage("bullet.png.jpg.png");
  gameOverImg = loadImage("gameover.png");
  explosionSound = loadSound("explosion.mp3.mp3");
  spaceSound = loadSound("Spacesound.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  backGround = createSprite(200, 300, 400, 20);
  backGround.addImage("ground", BackImg);

  gameover = createSprite(width / 2, height / 2);
  gameover.addImage("end", gameOverImg);
  gameover.visible = false;

  restart = createSprite(gameover.x, gameover.y + 100);
  restart.addImage("restat", resetImg);
  restart.visible = false;
  restart.scale = 0.5;

  spaceShip = createSprite(width / 2, height - 100);
  spaceShip.addAnimation("shipOfSpace", shipImg);
  spaceShip.scale = 0.2;

  pause = createSprite(50, 25);
  pause.addImage("PauseGame", pauseImg);
  pause.scale = 0.7;

  start = createSprite(50, 25);
  start.addImage("PauseGame", startImg);
  start.scale = 0.7;
  start.visible = false;
  start.depth = pause.depth;
  start.depth = pause.depth - 1;

  cometG = new Group();
  enemyG = new Group();
  enemy2G = new Group();
  laserG = new Group();
  laser1G = new Group();
  enemy1G = new Group();
  laser2G = new Group();
}

function draw() {
  background("white");

  if (gameState === play) {
    text("reload: " + charge, height, width);

    charge = charge + Math.round(getFrameRate() / 50);
  }

  drawSprites();

  enemyG.velocityX = 3;

  textSize(20);
  fill("white");
  text("score:" + score, width - 100, height - 550);

  if (gameState === play) {
    score = score + Math.round(getFrameRate() / 60);

    if (
      enemy2G.isTouching(cometG) ||
      enemy2G.isTouching(enemyG) ||
      laser1G.isTouching(enemy2G) ||
      enemy2G.isTouching(laser2G)
    ) {
      enemy2G.destroyEach();
      explosionSound.play();
    }

    if (laser1G.isTouching(cometG) || laser2G.isTouching(cometG)) {
      cometG.destroyEach();
      explosionSound.play();
    }

    if (
      spaceShip.isTouching(cometG) ||
      enemy2G.isTouching(spaceShip) ||
      laser1G.isTouching(spaceShip) ||
      laser2G.isTouching(spaceShip)
    ) {
      gameState = end;
      spaceShip.addAnimation("shipOfSpace", blast);
      explosionSound.play();
    }

    if (laserG.isTouching(cometG)) {
      cometG.destroyEach();
      laserG.destroyEach();
      explosionSound.play();
    }
    if (laserG.isTouching(enemyG)) {
      enemyG.destroyEach();
      laserG.destroyEach();
      explosionSound.play();
    }

    if (enemyG.isTouching(cometG) || enemy2G.isTouching(cometG)) {
      enemyG.destroyEach();
      explosionSound.play();
    }

    if (laserG.isTouching(enemy2G)) {
      laserG.destroyEach();
      enemy2G.destroyEach();
      explosionSound.play();
    }

    if (laserG.isTouching(laser1G) || laserG.isTouching(laser2G)) {
      laser1G.destroyEach();
      laserG.destroyEach();
      explosionSound.play();
    }

    //call function
    blackComet();
    enemyA();
    enemyB();

    //make backGround move down
    backGround.velocityY = 9;

    if (keyDown("space") && charge >= 30) {
      lazer();
      charge = 0;
    }

    //make infinity Ground
    if (backGround.y > 450) {
      backGround.y = height / 2;
    }

    //make sapceShip move with mouse
    spaceShip.x = mouseX;

    if (mousePressedOver(pause)) {
      gameState = pause;
    }
  } else if (gameState === end) {
    backGround.velocityY = 0;
    //cometG.setVelocityYEach(0);
    gameover.visible = true;
    restart.visible = true;
    score = 0;
    cometG.destroyEach();
    enemyG.destroyEach();
    enemy2G.destroyEach();
    laser1G.destroyEach();
    enemy1G.destroyEach();
    laser2G.destroyEach();

    if (mousePressedOver(restart)) {
      reset();
      spaceShip.addAnimation("shipOfSpace", shipImg);
    }
  } else if (gameState === pause) {
    //make backGround move down
    backGround.velocityY = 0;
    cometG.setVelocityYEach(0);
    laser1G.setVelocityXEach(0);
    laser1G.setVelocityYEach(0);
    laserG.setVelocityXEach(0);
    enemyG.setVelocityXEach(0);
    laser2G.setVelocityYEach(0);
    enemy1G.setVelocityXEach(0);
    laser2G.setVelocityXEach(0);
    enemy1G.setVelocityXEach(0);

    pause.addImage("PauseGame", startImg);

    if (mousePressedOver(start)) {
      gameState = play;
      cometG.setVelocityYEach(8);
      laserG.setVelocityYEach(9);
      laser1G.setVelocityYEach(9);
      laser1G.setVelocityXEach(9);
      enemyG.setVelocityXEach(9);
      laser2G.setVelocityYEach(9);
      laser2G.setVelocityXEach(-9);
      enemy1G.setVelocityXEach(-9);
      enemyG.setVelocityXEach(9);
      pause.addImage("PauseGame", pauseImg);
    }
  }
}

function blackComet() {
  if (World.frameCount % 80 === 0) {
    comet = createSprite(Math.round(random(50, width - 70), 40, 10, 10));
    comet.addImage(cometImg);
    comet.velocityY = 8;
    cometG.add(comet);
    comet.lifetime = height;
    comet.scale = random(0.3, 0.6);
    cometG.add(comet);
  }
}

function reset() {
  gameState = play;
  gameover.visible = false;
  restart.visible = false;
  spaceShip.visible = true;
}

function enemyA() {
  if (frameCount % 300 === 0) {
    enemy = createSprite(width / 10, height - 600);
    enemy1 = createSprite(width, height - 600);
    laser2 = createSprite(enemy1.x, enemy1.y);
    laser1 = createSprite(enemy.x, enemy.y);
    laser2.scale = 0.15;
    laser2.velocityY = 9;
    laser2.velocityX = -9;
    laser2.addImage(laserImg);
    enemy1.addImage(enemyImg);
    enemy1.velocityX = -9;
    enemy1.scale = 0.2;
    enemy1.rotation = 180;
    laser2.depth = enemy1.depth;
    laser2.depth = laser2.depth - 1;
    laser2G.add(laser2);
    laser2.lifetime = height;
    laser1.velocityY = 9;
    enemy.addImage(enemyImg);
    laser1.scale = 0.15;
    laser1.velocityX = 9;
    laser1.addImage(laserImg);
    laser1.depth = enemy.depth;
    laser1.depth = laser1.depth - 1;
    laser1G.add(laser1);
    laser1.lifetime = height;
    laser1.velocityY = 9;
    enemy.addImage(enemyImg);
    enemy.scale = 0.2;
    enemy.rotation = 180;
    enemy.velocityX = 9;
    enemyG.add(enemy);
    enemy1G.add(enemy1);
  }
}

function enemyB() {
  if (frameCount % 250 === 0) {
    enemy2 = createSprite(Math.round(random(50, width - 70), 40, 10, 10));
    enemy2.addImage(enemy2Img);
    enemy2.scale = 0.3;
    enemy2.velocityY = 9;
    enemy2G.add(enemy2);
  }
}

function endStop() {
  backGround.velocityY = 0;
}

function lazer() {
  laser = createSprite(spaceShip.x, spaceShip.y, 10);
  laser.addImage(bulletImg);
  laser.scale = 0.2;
  laser.velocityY = -9;
  laser.rotation = 325;
  laser.depth = spaceShip.depth;
  laser.depth = laser.depth - 1;
  laserG.add(laser);
  laser.lifetime = height;
}
