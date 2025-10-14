let xMax = 400;
let yMax = 600;

let xRocket = xMax/2
let yRocket = yMax*0.6;

let table;
let star_img;

// viene eseguita all'inizio di tutto
// specifica di P5
// punto dove si caricano tutti i dati
function preload(){
  table = loadTable("stars.csv", "csv", "header");
  star_img = loadImage("star.png");
  rocket_img = loadImage("rocket.png");
}

function setup() {
  createCanvas(400, 600);
  frameRate(5)
}

function drawSingleStarFromFile(index, posX, posY) {
  let starSize = table.getNum(index, "starSize");
  image(star_img, posX, posY, starSize, starSize);
}

function drawStarsfromFile() {
  for(let k = 0; k < table.getRowCount(); k++){
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);

    drawSingleStarFromFile(k, starX, starY);
  }

}

function drawSingleStar (i, starX, starY, random_transparency, random_size) {
  if( i % 2 == 0 ){
    //stella tipo a
  fill(255,255,150, random_transparency);
  ellipse (starX,starY,random_size) //1
  } else if (i % 3 == 0) {
    //stella b
  fill(200,100,150, random_transparency);
  ellipse (starX,starY,random_size)
  } else {
    // stella c
  fill(255,255,150, random_transparency);
  ellipse (starX,starY,random_size) //2.8
  }
}

function drawStars (num_stars=120) {
  for (let i=0; i<num_stars; i++) {
    let starX = (i*37) % width + (i%3) * 5;
    let starY = (i*73) % height + (i%7);

    let random_transparency = random(150, 255);
    let random_size = random(6.8,15);
    
    drawSingleStar(i, starX, starY, random_transparency, random_size);

  }
}

function drawRocketFromFile (xRocket, yRocket) {
  image(rocket_img, xRocket, yRocket, 50, 50);
}

function drawRocket (xRocket, yRocket) {
      // rettangolo
    fill(220);
    stroke(40);
    // alternativa
    rectMode(CENTER);
    rect(xRocket,yRocket+30,80,180,20); // ultimo parametro determinana l'arrotondamento

    // triangolo
    fill(200,40,40);
    triangle(xRocket-40,yRocket-60,xRocket+40,
      yRocket-60, xRocket,yRocket-120);

    // cerchio
    fill(40,150,220);
    stroke(255);
    strokeWeight(3);
    ellipse(xRocket,yRocket+30,48,48);
}

function moveRocket (xRocket, yRocket, step) {
  yRocket = yRocket - step;
  let soglia = - (yMax * 0.6);
  if (yRocket < soglia){
    yRocket = yMax;
  }
  return yRocket;
}

function draw() {
  background("#191970");

  // mostrare un testo bianco 
  // che dice le coordinate del mouse 
  // sul foglio da disegno 
  push();
  fill(255); // bianco 
  // stringa, x, y
  text("mouseX: "+ mouseX + ", mouseY: " + mouseY,20, 20);
  pop();
 
  // disegnare le stelle 
  // 120 
  // tre tipi di stelle: a, b, c
  // fino a che abbiano 120 stelle
  push();
  noStroke ();
  //drawStars (120);
  drawStarsfromFile();
  pop ();

    // contesto di disegno (per isolare)
  push();
  //drawRocket(xRocket, yRocket);
  drawRocketFromFile(xRocket, yRocket)
  // finire contesto di diesgno 
  pop();

  yRocket = moveRocket(xRocket, yRocket, 3)

  }

  

