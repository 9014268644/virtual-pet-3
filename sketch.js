//Create variables here
var dog,happyDog,database,foodS,foodStock

function preload()
{
	//load images here
}

function setup() {
	createCanvas(800, 700);
  
}


function draw() {  
  background(46,139,87)

  bedroom(){
    background(bedroom,550,500);
  }

  garden(){
    background(garden,550,500);
  }

  washroom(){
    background(washroom,550,500);
  }


  drawSprites();
  //add styles here

}

if(keyWentDown(UP_ARROW)){
  writeStock(foods);
  dog.addImage(dogHappy);
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
    Food:x
  })
}

fedTime = database.ref('FeedTime');
fedTime.on("value",function(data){
  lastFed = data.val();
})


fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed :"+lastFed%12 + "PM",350,30);
}else if(lastFed==0){
  text("Last Feed :12 AM",350,30);
}else{
  text("Last Feed : "+ lastFed+"AM",350,30)
}

feed=createButton("Feed the dog");
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("ADD FOOD");
addFood.position(800,95);
addFood.mousePressed(addFoods);

//function to update food stock and last fed time 
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updataFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//read game state from database
readState = database.ref('gameState');
readState.on("value",function(data){
  gameState = data.val();
})

if(gameState = "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}else{
  feed.show();
  addFood.show();
  dog.addImage(sadDog);
}

//function to update gamestate in database
function update(state){
  database.ref('/').update({
    gameState:state
  })
}

currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  foodObj.garden();
}else if(currentTime ==(lastFed+2)){
  update("Sleeping");
  foodObj.bedroom();
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("bathing");
  foodObj.washroom();
}else{
  update("Hungry")
  foodObj.display();
}