//variabili globali
let xMax = 400;
let yMax = 600;

let xRocket = xMax/2;
let yRocket = yMax*0.6;

let table;
let star_img;
let stars_valid = [];

function isStarSizeValid(value){
  //se il dato ingresso è corretto o meno
  //restituire un booleano
  return value > 0;
}

//caricare asset prima che la pagina web venga caricata
function preload() {
  table = loadTable("../assets/datasets/stars.csv", "csv", "header");
  star_img = loadImage("../assets/img/star.png");
}


function setup() {
  createCanvas(xMax, yMax);
  frameRate(30);
  //filtrare i dati
  //tramite isStarSizeValid
  //applichiamo la funzione di filtro
  
  //scorriamo i valori con un ciclo
  //e filtriamo
  for(let i=0; i < table.getRowCount(); i++){
    let star_value = table.getNum(i,"starSize");
    if(isStarSizeValid(star_value)){
      stars_valid.push(star_value);
    }
  }

}

function drawStarsFromFile() {
  for(let k = 0; k < table.getRowCount(); k++) {
    let starX = (k*37) % width + (k%3) * 5;
    let starY = (k*73) % height + (k%7);
    let starSize = table.getNum(k, "starSize")
    image(star_img, starX, starY, starSize, starSize);
  }
}

// funzione per trovare la media 
function meanOfAnArray( arrayInput ){
  //corpo della funzione 
  let mediaArray = 0;
  for(let i=0; i < arrayInput.length; i++){
    mediaArray += arrayInput[i];
    // mediaArray = mediaArray + arrayInput[i]
  }
  // si possono fare operazoni matematiche direttamente dentro return 
  return mediaArray/arrayInput.length;
}

//funzione per disegnare le stelle 
function drawStarSizePlot(arrayDiStelle){
  //assi x e asse y
  //assegnare le etichette 
  // dobbiamo disegnare qualcosa 
  push();
  let xMin = 40;
  let yMaxChart = height/2;
  let xMaxChart = width-20;
  let yMin = 40
  //asse x
  // p5 ci restituisce width e heigth come variabili
  line(xMin, yMaxChart, xMaxChart, yMaxChart);
  //asse y
  line(xMin, yMaxChart, xMin, yMin);
  // assegnare etichetta all'asse y
  push();
  translate(xMin, yMin);
  rotate(-PI/2);
  translate(-xMin*2, -yMin);
  text("Size", xMin, yMin);
  pop();
  //rappresentare le dimensioni delle stelle 
  for(let i=0; i < arrayDiStelle.length; i++) {
    // definire le cordinate x e y delle stelle
    // map --> valore lo rimappiamo in un intervallo 
    let x = map(arrayDiStelle[i], min(arrayDiStelle), max(arrayDiStelle), xMin+5, xMaxChart-5);
    let y = map(arrayDiStelle[i], min(arrayDiStelle), max(arrayDiStelle), yMaxChart-5, yMin-5);

    image(star_img, x, y, arrayDiStelle[i], arrayDiStelle[i]);
  }
  pop();
}

function draw() {
  background("#C0E1FC");

  fill(0); //bianco
  textSize(20);
  text("mouseX: " + mouseX + ",\
     mouseY: " + mouseY,20,20);
  
     //disegnare la stella più piccola
     // e la stella più grossa
     //stars_valid
    //image(star_img, 50, 50, min(stars_valid), min(stars_valid));
    //image(star_img, 100, 100, max(stars_valid), max(stars_valid));
    // drawStarsFromFile();

    // 1. rappresentare le statistiche
    // 1.a quante stelle valide ci sono 
    // star_valid.length --> quanto è l'ungo l'array
    text("stelle valide " + stars_valid.length, 20, height/2+100);
    // 1.b il valor medio della dimensione delle stelle
    // sommare tutte le dimensioni e dividiere per la lunghezza 
    let mediaDimensioni = 0;
    // ciclo for per scorrere array
    // poi divido 
    mediaDimensioni = meanOfAnArray(stars_valid);
    text("media delle dimensioni " + mediaDimensioni.toFixed(2), 20, height/2 + 120)
    // 1.c la deviazione standard, quanto variano le dimensioni 

    // 2. rappresentare il grafico 
    // disegnare gli assi 
    // dare le etichette agli assi 
    // rappresentare i dati 
    drawStarSizePlot(stars_valid);

}
