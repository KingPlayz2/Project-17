var PLAY=1;
var END=0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var gameState=PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width /2;
  console.log(ground.x)
  
   FoodGroup = createGroup();
  obstacleGroup = createGroup();

  
score=0;  

  
}


function draw() {
background("lightblue")  ;
  if(gameState===PLAY){ 
stroke("red");
fill("red")
textSize(20);
text("Score: "+score,100,70);
  
stroke("black");
fill("black")
textSize(20);  
survivalTime=Math.ceil(frameCount/frameRate())  
text("SurvivalTime: "+survivalTime,100,50)  
  
if(ground.x<0){
ground.x=ground.width/2;
}  
  
if(keyDown("space")&& monkey.y >= 300){
monkey.velocityY=-15;
} 
  
monkey.velocityY=monkey.velocityY +0.8;  
  
if(FoodGroup.isTouching(monkey)){
FoodGroup.destroyEach();
score = score+10;  
}  
  
food();  
spawnObstacle();
  
if(obstacleGroup.isTouching(monkey)){
    gameState=END;
} 
}if(gameState===END){
    ground.velocityX = 0;
  
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  
    monkey.velocityY=monkey.velocityY +0.8;  
  
    stroke("red");
    fill("red")
    textSize(20);
    text("Score: "+score,100,70);
  
    stroke("black");
    fill("black")
    textSize(20);    
    text("SurvivalTime: "+survivalTime,100,50);  
  
    fill("blue");
    text("Game Over",150,200);
    textSize(50);
    }  
  
  
  
  
  
 monkey.collide(ground) ;
drawSprites();
}

function food(){
if(frameCount %80===0){
banana=createSprite(500,10,10,20)
banana.y=Math.round(random(120,200));
banana.addImage(bananaImage);
banana.velocityX=-4;
banana.scale=0.1; 
banana.lifetime=200;
 
FoodGroup.add(banana);  
   }  
}
function spawnObstacle(){
if(frameCount % 300===0){
var obstacle=createSprite(500,310,10,10);
obstacle.velocityX=-5;
obstacle.addImage(obstacleImage); 
obstacle.scale=0.1;  
obstacle.lifetime=200;

  
  obstacleGroup.add(obstacle);
  
   }  
}





