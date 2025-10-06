function setup() {
  createCanvas(400, 600);
}

function draw() {
  background(100);
  // mostrare un testo bianco 
  // che dice le coordinate del mouse 
  // sul foglio da disegno 
  fill(255); // bianco 
  // stringa, x, y
  text("mouseX: "+ mouseX + ", mouseY: " + mouseY,20, 20);

  // contesto di disegno (per isolare)
  push();
  fill(220);
  stroke(40);
  // alternativa
  rectMode(CENTER);
  rect(100,130,80,180);

  // traiangolo
  fill(200,40,40);
  triangle(140,40,140,215, 235,120);

  // cerchio
  fill(40,150,220);
  stroke(255);
  strokeWeight(3);
  ellipse(100,130,48,48);

  // finire contesto di diesgno 
  pop()

}
