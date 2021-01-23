class Food{

constructor(x,y)
{
    this.image = loadImage("images/Milk.png");
    this.foodStock=database.ref('Food');
    this.foodStock.on("value",readStock);
}

preload()
{
}
setup()
{
 this.livingroom.addImage("living",livingroom_img);
 this.washroom.addImage("wash",washroom_img);
 this.garden.addImage("garden",garden_img);
}

display()
{
imageMode(CENTER);
image(this.image,150,250,70,70);
}

livingroom()
{
    background(this.livingroom,550,500);
}

garden()
{
    background(this.garden,550,500);
}

washroom()
{
    background(this.washroom,550,500);
}

}