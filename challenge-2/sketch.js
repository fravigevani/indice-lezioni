
// VARIABILI GLOBALI

// Coordinate dell'ape principale
let x = 0;
let y = 0;

// Array dei fiori nel prato
let flowers = [];

// Array delle api secondarie (che volano da sole)
let bees = [];

// SETUP — eseguito una volta all'inizio
function setup() {
  createCanvas(600, 600);
  noStroke();

  // Genera papaveri casuali nel prato
  let attempts = 0;
  while (flowers.length < 90 && attempts < 2500) {
    attempts++;
    let fy = random(height * 0.5, height - 10); // posizione verticale nel prato
    let depth = map(fy, height * 0.5, height, 0.6, 1.0); // "profondità" per dimensione
    let f = {
      x: random(width), // posizione orizzontale
      y: fy,
      size: random(25, 45) * depth, // dimensione proporzionata alla profondità
      color: random([
        color(255, 60, 60),
        color(255, 90, 90),
        color(255, 120, 80),
        color(255, 150, 150),
        color(240, 70, 100)
      ]),
      depth: depth,
      swayOffset: random(1000) // per movimento indipendente del fiore (brezza)
    };

    // Evita che i fiori siano troppo vicini tra loro
    let tooClose = false;
    for (let other of flowers) {
      let d = dist(f.x, f.y, other.x, other.y);
      if (d < (f.size + other.size) * 0.8) {
        tooClose = true;
        break;
      }
    }

    if (!tooClose) flowers.push(f);
  }

  // Ordina i fiori in base alla profondità (dietro → davanti)
  flowers.sort((a, b) => a.depth - b.depth);
}



// DRAW — eseguito in loop ogni frame
function draw() {
  background(135, 206, 235); // cielo azzurro

  // Prato verde
  fill(90, 200, 90);
  rect(0, height * 0.5, width, height * 0.5);

  // Disegna tutti i fiori (dal fondo verso il fronte)
  drawFlowers();

  // Aggiorna e disegna api secondarie
  if (frameCount % 180 === 0 && bees.length < 8) {
    bees.push(newFlyingBee());
  }

  for (let i = bees.length - 1; i >= 0; i--) {
    let b = bees[i];
    b.update();
    b.display();
    if (b.isOffscreen()) bees.splice(i, 1);
  }

  // APE PRINCIPALE — disegnata per ultima (sempre in primo piano)
  x = lerp(x, mouseX, 0.05); // movimento dolce verso il mouse
  y = lerp(y, mouseY, 0.05);
  drawBee(x, y, mouseX - x, mouseY - y);
}


// FUNZIONI PER I FIORI
function drawFlowers() {
  for (let f of flowers) {
    // Movimento oscillante (brezza)
    let sway = sin((frameCount + f.swayOffset) * 0.03) * f.size * 0.15;

    // Stelo
    stroke(40, 120, 40);
    strokeWeight(2.5 * f.depth);
    line(f.x, f.y, f.x + sway * 0.2, f.y - f.size * 2);

    // Fiore
    noStroke();
    drawPapavero(f, sway);
  }
}

// Disegna un papavero stilizzato
function drawPapavero(f, sway) {
  push();
  translate(f.x + sway * 0.2, f.y - f.size * 2);
  rotate(sway * 0.02);

  fill(f.color);
  let petalCount = 6;
  let r = f.size * 0.5;

  // Petali disposti attorno al centro
  for (let i = 0; i < petalCount; i++) {
    let a = TWO_PI / petalCount * i;
    let px = cos(a) * r;
    let py = sin(a) * r;
    ellipse(px, py, f.size * 0.9, f.size * 0.9);
  }

  // Centro scuro e sfumatura
  fill(30);
  ellipse(0, 0, f.size * 0.4);
  fill(255, 200, 50, 150);
  ellipse(0, 0, f.size * 0.6);
  pop();
}


// API SECONDARIE — movimento semplice e casuale
function newFlyingBee() {
  let fromLeft = random() < 0.5; // direzione d’ingresso casuale
  let x = fromLeft ? -50 : width + 50;
  let y = random(height * 0.5, height * 0.9);
  let vx = fromLeft ? random(1, 2) : random(-2, -1);
  let vy = random(-0.3, 0.3);
  let noiseOffset = random(1000);

  return {
    x,
    y,
    vx,
    vy,
    noiseOffset,

    // Aggiorna posizione (movimento casuale e dolce)
    update() {
      let sway = map(noise(this.noiseOffset + frameCount * 0.01), 0, 1, -0.5, 0.5);
      this.vy += sway * 0.05;
      this.x += this.vx;
      this.y += this.vy + sin(frameCount * 0.05 + this.noiseOffset) * 0.3;
    },

    // Disegna l’ape piccola
    display() {
      push();
      translate(this.x, this.y);
      let angle = atan2(this.vy, this.vx);
      rotate(angle);
      scale(0.7);

      // Corpo giallo con strisce
      fill(245, 200, 40);
      ellipse(0, 0, 40, 25);
      fill(0);
      rectMode(CENTER);
      rect(-5, 0, 5, 25);
      rect(5, 0, 5, 25);

      // Testa
      fill(0);
      ellipse(20, 0, 15, 15);

      // Pungiglione
      fill(0);
      triangle(-20, -3, -20, 3, -30, 0);

      // Ali sempre rivolte verso l’alto
      push();
      rotate(-angle);
      fill(255, 255, 255, 180);
      ellipse(-5, -15, 15, 25);
      ellipse(5, -15, 15, 25);
      pop();

      pop();
    },

    // Rimuove l’ape quando esce dallo schermo
    isOffscreen() {
      return this.x < -60 || this.x > width + 60;
    }
  };
}


// APE PRINCIPALE — segue il mouse, sempre in primo piano
function drawBee(x, y, dx, dy) {
  push();
  translate(x, y);
  let angle = atan2(dy, dx);
  rotate(angle);

  // Corpo grande
  fill(245, 200, 40);
  ellipse(0, 0, 70, 45);

  // Strisce nere
  fill(0);
  rectMode(CENTER);
  rect(-10, 0, 10, 45);
  rect(10, 0, 10, 45);

  // Testa
  fill(0);
  ellipse(35, 0, 25, 25);

  // Pungiglione
  fill(0);
  triangle(-35, -5, -35, 5, -50, 0);

  // Ali 
  fill(255, 255, 255, 180);
  ellipse(-10, -25, 25, 35);
  ellipse(10, -25, 25, 35);

  pop();
}
