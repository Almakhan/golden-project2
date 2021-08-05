var background1, background1Img
var fox, foxImg
var caveman1,caveman1Img
var caveman2,caveman2Img
var orange, orangeImg
var banana, bananaImg
var cave, caveImg
var background2, background2Img
var warrior1, warrior1Img
var warrior2, warrior2Img
var dagger,  daggerImg
var enemy, enemyImg
var background3, background3Img
var level1Score=0
var level1Death=0
var invisibleCave

var END=0
var PLAY=1
var WIN=2
var END2=3
var PLAY2=4
var WIN2=5

var gameState=PLAY
function preload() {
    //LEVEL1
    background1Img=loadImage("LEVEL1Img/background1.png")
    background2Img=loadImage("LEVEL2Img/bg.jpg")
   // background3Img=loadImage("LEVEL3Img/space.jpg")
    foxImg=loadAnimation("LEVEL1Img/fox7.png","LEVEL1Img/fox1.png","LEVEL1Img/fox6.png",
     "LEVEL1Img/fox4.png","LEVEL1Img/fox5.png","LEVEL1Img/fox3.png","LEVEL1Img/fox2.png",)
    caveMan1Img=loadAnimation("LEVEL1Img/boy1.png","LEVEL1Img/boy2.png","LEVEL1Img/boy3.png")
    caveMan2Img=loadImage("LEVEL1Img/boy6.png")
    orangeImg=loadImage("LEVEL1Img/orange.png")
    bananaImg=loadImage("LEVEL1Img/banana.png")
    caveImg=loadImage("LEVEL1Img/cave 1.png")
    //LEVEL2
    enemyImg=loadImage("LEVEL2Img/enemy.png")
    daggerImg=loadImage("LEVEL2Img/knfe.png")
    warrior1Img=loadAnimation("LEVEL2Img/level2 PC1.png","LEVEL2Img/level2 PC2.png")
    warrior2Img=loadImage("LEVEL2Img/level2 PC1.png")

}
function setup() {
    createCanvas(1300,400)
    background1=createSprite(860,200,20,20)
    background2=createSprite(860,200,20,20)
    background3=createSprite(860,200,20,20)
    caveMan1=createSprite(200,200,20,20)
    caveMan1.addAnimation("run",caveMan1Img)
    caveMan1.scale=0.5

    invisibleGround=createSprite(200,350,1000,10)
    
    caveMan2=createSprite(200,200,20,20)
    caveMan2.addImage(caveMan2Img)
    caveMan2.scale=0.5

    foxGroup=new Group()
    fruitGroup=new Group()
    level1Score=0;
    level1Death=0;
    
}
function draw() {
    background(0)
    
   if(gameState===PLAY){
       levelOne();
       spawnFruitS();
       spawnFox()
       
       if(frameCount%200===0){
        cave=createSprite(1000, 200,20,20)
        cave.setCollider("rectangle",0,0,10,200)
        cave.debug=true
        if(cave.isTouching(caveman1)){
            gameState=WIN
        }
        cave.y = Math.round(random(200, 300))
        cave.addImage(caveImg)
        cave.velocityX=-7
        /*invisibleCave=createSprite(1000,200,20,20)
        invisibleCave.velocityX=-7
        invisibleCave.depth= cave.depth
        cave.velocityX=invisibleCave.velocityX
        invisibleCave.depth=invisibleCave.depth+1
        invisibleCave.y = Math.round(random(200, 300))*/
        
        caveMan2.depth= cave.depth
        caveMan2.depth=caveMan2.depth+1
        caveMan1.depth= cave.depth
        caveMan1.depth=caveMan1.depth+1
        
        }
       
       
      if(keyDown("F")){
        gameState=WIN
      }
       if (level1Death===1){
        gameState=END
      }
      
       
       
   }else if(gameState===END){
    background1.velocityX=0
    foxGroup.setVelocityXEach(0);
    fruitGroup.setVelocityXEach(0);
    foxGroup.destroyEach()
    foxGroup.setLifetimeEach(-0)
    fruitGroup.setLifetimeEach(-0);
    fruitGroup.destroyEach()
    caveMan1.visible=false
    caveMan2.visible=false
    
       if(keyDown("R")){
          restart1();
       }
   }else if(gameState===WIN){
    background1.velocityX=0
   // caveman1.destroy();
     if(keyDown("N")){
         gameState=PLAY2
     }

   }else if(gameState===PLAY2){
      levelTwo();
      
   }
   
    drawSprites()
    drawSprites()
textSize(20);
fill("BLUE");
text("FOOD: "+ level1Score,250,30);

textSize(20);
fill("RED");
text("DEATH "+ level1Death,150,30); 

if(gameState===END){
    textSize(40);
    fill("RED");
    text("YOU LOST ",450,200);
    textSize(20);
    fill("TURUOISE");
    text("Press 'R' to restart",450,240)
}
if(gameState===WIN){
    textSize(40);
    fill("green");
    text("YOU WIN ",450,200);
    textSize(20);
    fill("turquoise");
    text("press 'N' for next level ",450,200);
}
}

function levelOne(){
    
    background1.addImage(background1Img)
    background1.velocityX=-3
    if(background1.x < 430 )
  {
    background1.x = width/2;
  }
  
   
  //visiblity
  caveMan2.visible=false
  caveMan1.visible=true
  invisibleGround.visible=false
  //gravity for caveman
  caveMan2.velocityY = caveMan2.velocityY + 0.8
  caveMan2.collide(invisibleGround)
  caveMan1.y=caveMan2.y
  //jump
  if (keyDown(UP_ARROW)){
    caveMan2.visible=true
   // caveMan2.addImage(caveMan2Img)
    caveMan1.visible=false
    caveMan2.velocityY=-5


  }
  

}
function spawnFruitS(){

    if (frameCount % 100 === 0) {
      fruit=createSprite(1300,50,20,20)
      fruit.velocityX=-7
      fruit.scale=0.3
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: fruit.addImage(orangeImg);
                break;
        case 2:fruit.addImage(bananaImg);
        fruit.scale=0.2
                break;
        default: break;
      }
      fruitGroup.add(fruit)
  }
  if (caveMan1.isTouching(fruitGroup)||(caveMan2.isTouching(fruitGroup))) {
    for(var k=0;k<fruitGroup.length;k++){
    if(fruitGroup.contains(fruitGroup.get(k))){
    if(caveMan1.isTouching(fruitGroup.get(k))||(caveMan2.isTouching(fruitGroup.get(k)))){
    fruitGroup.get(k).destroy();
    level1Score=level1Score+1
      } } }}
}  
function spawnFox(){
    if (frameCount%200===0){
      fox=createSprite(1300,300,20,20)
     fox.y = Math.round(random(280, 300))
      fox.addAnimation("fox",foxImg)
      fox.scale=0.3
      fox.velocityX=-7
      foxGroup.add(fox)
  }
  if (caveMan1.isTouching(foxGroup)||(caveMan2.isTouching(foxGroup))) {
    for(var k=0;k<foxGroup.length;k++){
    if(foxGroup.contains(foxGroup.get(k))){
    if(caveMan1.isTouching(foxGroup.get(k))||(caveMan2.isTouching(foxGroup.get(k)))){
    foxGroup.get(k).destroy();
    level1Death=level1Death+1
    
  }}}
  }
  }
function restart1()  {
    gameState=PLAY
    background1.velocityX=-4
    caveMan1.visible=true
    caveMan2.visible=true

    background1.velocityX=-3
    level1Death=0
    level1Score=0
    if(background1.x < 380 )
  {
    background1.x = width/2;
  }

}


function levelTwo(){
    
    background2.addImage(background2Img)

    
}
function levelThree(){
   
    background3.addImage(background3Img)
    background3.scale=5.5
    
}