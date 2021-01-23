//Create variables here
var dog, happyDog, database, foodS, foodStock, dog_img,addFoodButton,feedButton,fedTime,lastFed,foodObj,dogName;
var milk, milk_img;
var readGameState,changeGameState;
var livingroom_img, washroom_img,garden_img, currentTime;
function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dog_img = loadImage("images/dogImg.png");
  milk_img=loadImage("images/Milk.png");
  livingroom_img=loadImage("images/Living Room.png");
  washroom_img=loadImage("images/Wash Room.png");
  garden_img=loadImage("images/Garden.png");
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250,250,20,20);
  dog.addImage(dog_img);

  
  database = firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  })

  food1 = new Food(150,250);

  feedButton = createButton("Feed the dog");
  feedButton.position(400,95);
  feedButton.mousePressed(feedDog);

  addFoodButton = createButton("Add more food");
  addFoodButton.position(700,95);
  addFoodButton.mousePressed(addFood);

  milk = createSprite(50,450,20,20);
  milk.addImage(milk_img);
  milk.scale = 0.1;
}


function draw() {  
  background(0,255,0);
  drawSprites();
  //add styles here
  fill("white");
  fill(0,0,0,150);
  rect(191.5,385,120,20);
  fill("white");
  text("Food remaining: "+foodS,200,400);

  currentTime=hour();
  if(currentTime==(lastFed+1)){
    update("Playing");
    food1.garden();
  }
  else if(currentTime==(lastFed+2)){
    update("Living");
    food1.livingroom();
  }
  else if(currentTime>(lastFed+2)&&currentTime<=(lastFed+4)){
    update("Bathing");
    food1.washroom();
  }
  else{
    update("Hungry");

    if(foodS>1){
      milk.visible = true;
    }
    else
    {
      milk.visible = false;
    }
    
    if(foodS!=0)
    {
      food1.display();
    }
  }
  if(gameState!="Hungry")
  {
    milk.visible = false;
    dog.visible = false;  
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(0,0,0,150);
  rect(345,385,90,20);
  fill(255,255,255);
  if(lastFed>=12){
    text("Last Fed: "+lastFed%12+" PM",350,400);
  }
  else if(lastFed==0){
    text("Last Fed: 12 AM",350,350);
  }
  else{
    text("Last Fed: "+lastFed%12+" AM",350,350);
  }
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog()
{
  if(foodS!=0)
  {
  dog.addImage(happyDog);
  writeStock(foodS);
  dog.addImage(happyDog);
  database.ref('/').update({
    FeedTime:hour()
  })
}
}

function addFood()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

