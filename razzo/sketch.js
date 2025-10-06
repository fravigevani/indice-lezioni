let xMax = 400;
let yMax = 600;

let xRocket = xMax/2
let yRocket = yMax*0.6;


function setup() {
  createCanvas(400, 600);
  frameRate(5)
}

function draw() {
  background("#191970");
  // mostrare un testo bianco 
  // che dice le coordinate del mouse 
  // sul foglio da disegno 
  fill(255); // bianco 
  // stringa, x, y
  text("mouseX: "+ mouseX + ", mouseY: " + mouseY,20, 20);

  // disegnare le stelle 
  // 120 
  // tre tipi di stelle: a, b, c
  // fino a che abbiano 120 stelle

  //stelle ellipse
  push();
  // 3 cicli

  noStroke()
  // unico ciclo
  // creare una sequenza x fare a, b, c
  for(let i=0;i < 120; i++){
    let x = random(0, xMax)
    let y = random(0, yMax)
    let starX = (i*37) % width + (i%3) * 5;
    let starY = ((i*73) % height) + (i%7);
    // operatore modulo %
    // stella a quando i è pari
    if( i % 2 == 0 ){
      //stella tipo a
    fill(255,255,150);
    circle (x, y, 1); //1
    } else if (i % 3 == 0) {
      //stella b
      fill(200, 100, 25);
      circle (x, y, 1.5); //1.5
    } else {
      // stella c
      fill(255,255,100);
      circle (x, y, 2.8); //2.8
    }

    }

    // contesto di disegno (per isolare)
    push();

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

    // finire contesto di diesgno 
    pop()

    xRocket = (xRocket +1) % xMax;

  }

  

