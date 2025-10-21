let xMax = 400;
let yMax = 600;

let table;
let star_img;
let stars_valid = [];

function isStarSizeValid(value){
  //se il dato di ingresso è corretto o no
  //restituire un booleano
  return value > 0
}

function preload() {
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
}

function setup() {
  createCanvas(xMax, yMax);
  frameRate(5);
  //filtrare i dati 
  //tramite isStarsSizeValid

  for(let i=0; i < table.getRowCount(); i++){
    let star_valid = table.getNum(i, "starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    };
  };
}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

function draw() {
  background("#44759dff");


  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);

  //drawStarsFromFile();
  //diseganre la stella più piccola e quella più grossa 

  image(star_img, 50, 50, min(stars_valid), min(stars_valid));
  image(star_img, 100, 100, max(stars_valid), max(stars_valid));


}
