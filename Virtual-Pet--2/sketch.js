var dogImage; 
var happyDog;
var database;
var foodS;
var foodStock;

var feed, addFood;
var fedTime, lastFed;
var foodObject;

function preload()
{
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);

  foodObject = new Food();

  dog = createSprite(800,220,150,150);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  feed = createButton("Feed the Dog!");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food!");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
   lastFed = data.val();
})

fill(255);
textSize(20);

if(lastFed >= 12){
  text("Last Feed : " + lastFed % 12 + "PM", 350, 30);
} else if(lastFed == 0){
  text("Last Feed : 12 AM", 350, 30);
} else{
  text("Last Feed : " + lastFed + " AM", 350, 30);
}

foodObject.display();
drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObject.updateFoodStock(foodObject.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObject.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS ++;
  database.ref('/').update({
    Food: foodS
  })
}