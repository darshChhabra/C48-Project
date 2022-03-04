var mario,marioImg,backgroundImg;
var invisibleGround,mario_collided;
var bg;
var brickImg;
var brick;
var bricksGroup
var obstacle
var obstacleGroup
var restartImg, restart
var gameOverImg, gameOver
var coins = 0
var gameState = "play"

function preload(){
  
  marioImg=loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  backgroundImg=loadImage("bg.png");
  ground2img=loadImage("ground2.png")
  brickImg=loadImage("brick.png");
  mario_collided=loadAnimation("collided.png")
  obstacle = loadImage("mushroom.png")
  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
}
function setup(){
  createCanvas(600,300);
  
  bricksGroup = new Group
  obstacleGroup = new Group
  
  bg=createSprite(300,290);
  bg.addImage("bg",ground2img);
  bg.scale=1;

  gameOver = createSprite(300, 150, 20, 20)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 1
  gameOver.visible = false

  restart = createSprite(300, 200, 20, 20)
  restart.addImage(restartImg)
  restart.scale = 0.8
  restart.visible = false
 
  mario=createSprite(50,250,20,20);
  mario.addAnimation("mario",marioImg);
  mario.addAnimation("collision",mario_collided)
  mario.scale=2; 

  invisibleGround=createSprite(50,260,600,10)
  invisibleGround.visible=false;

  mario.setCollider("rectangle",0,0,20,mario.height);
  mario.debug=true;

  //ob.setCollider("rectangle",0,0,20,ob.height);
  //ob.debug=true;
 
}
function draw(){
  
  background(backgroundImg);
  if(gameState === "play"){

  bg.velocityX=-12;
    
  if(bg.x<190){
    bg.x=bg.width/2;
  }
  mario.changeAnimation("mario",marioImg);

  if(keyDown("space")&&mario.y>215){
    mario.velocityY=-15; 
  } 

  mario.velocityY=mario.velocityY+1;

  if(obstacleGroup.isTouching(mario)){
    gameState = "end"
  }
  
  }
  mario.collide(invisibleGround);
  drawSprites()

  bricks()
  obstacles()

  if(gameState === "end"){
    restart.visible = true
    gameOver.visible = true
    bg.velocityX = 0
    mario.velocityY = 0
    mario.changeAnimation("collision", mario_collided)
    obstacleGroup.setVelocityXEach(0)
    obstacleGroup.setLifetimeEach(-1)
    bricksGroup.setVelocityXEach(0)
    bricksGroup.setLifetimeEach(-1)
  }

  if(mario.isTouching(bricksGroup)){
    coins = coins + 1
    bricksGroup.destroyEach()
    
  }
  
  if(mousePressedOver(restart)){
    reload()
  }

  fill("black")
  textSize(30)
  text("Coins = " + coins, 450, 30)
}



function bricks(){
if(frameCount%100===0){        
brick=createSprite(700,Math.round(random(120,160)));
    brick.velocityX=-12;
     brick.lifetime=180;
     brick.addImage("brick",brickImg);
     brick.depth=mario.depth;
     mario.depth=mario.depth+1;
     bricksGroup.add(brick)
     brick.scale = 1.4
   }
}

function obstacles(){
  if(frameCount%60===0){
    var ob = createSprite(700,Math.round(random(225, 225)))
    ob.velocityX = -12
    ob.lifetime = 200
    ob.addImage("ob", obstacle)
    ob.depth = mario.depth + 1
    obstacleGroup.add(ob)
    ob.scale = 0.15
  }
}




function reload(){
    
    coins = 0
    obstacleGroup.destroyEach()
    bricksGroup.destroyEach()
    gameState = "play"
    restart.visible = false
    gameOver.visible = false
  
}



