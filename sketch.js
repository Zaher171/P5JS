/* FUENTE Y MODIFICACIÓN:
   Inspirado en el concepto clásico de "Perlin Noise Terrain" de Daniel Shiffman (The Coding Train) y ejemplos de OpenProcessing.
   
   MODIFICACIONES ("INTERÉS AÑADIDO"):
   1. Estética "Wireframe Neon": Eliminado el relleno sólido (fill) y usado solo líneas (stroke) cian.
   2. Interactividad Directa: 
      - mouseX controla la VELOCIDAD del vuelo sobre el terreno.
      - mouseY controla la ALTURA (amplitud) de los picos.
   3. Integración de transparencia para efecto "Trail" (estela) suave.
*/

let cols, rows;
let scl = 40; // Escala de la cuadrícula (zoom)
let w, h;
let flying = 0;
let terrain = [];

function setup() {
    // Canvas ocupa toda la ventana
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL); // Modo WEBGL para 3D
    canvas.parent('canvas-container');

    w = width + 200; // Un poco más ancho que la pantalla para que no se vean bordes
    h = height + 200;
    cols = w / scl;
    rows = h / scl;

    // Inicializar array 2D para el terreno
    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0;
        }
    }
}

function draw() {
    // INTERACTIVIDAD CON EL RATÓN
    // Mapeamos mouseX para controlar la velocidad (entre 0.01 y 0.2)
    let speed = map(mouseX, 0, width, 0.005, 0.15);
    // Mapeamos mouseY para controlar la altura de los picos (entre 50 y 250)
    let peakHeight = map(mouseY, 0, height, 50, 250);

    flying -= speed; // Mueve el "vuelo" hacia adelante

    // Generar el terreno usando Perlin Noise (Algoritmo de ruido)
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            // noise() devuelve un valor suave entre 0 y 1
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -peakHeight, peakHeight);
            xoff += 0.2; // Suavidad en eje X
        }
        yoff += 0.2; // Suavidad en eje Y
    }

    // DIBUJO
    background(5, 5, 10); // Fondo casi negro (deja ver las líneas neón)
    
    // Ajustar cámara para ver el terreno inclinado
    rotateX(PI / 3);
    translate(-w / 2, -h / 2 + 100); // Centrar la rejilla

    // Estilo Neon
    noFill();
    stroke(0, 255, 255); // Color Cyan puro
    strokeWeight(1.5);

    // Dibujar la malla (Triangle Strip)
    for (let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            // Vértice actual
            vertex(x * scl, y * scl, terrain[x][y]);
            // Vértice de la fila de abajo (para conectar la malla)
            vertex(x * scl, (y + 1) * scl, terrain[x][y + 1]);
            
            // EFECTO VISUAL EXTRA:
            // Si el pico es muy alto, cambia el color a blanco/magenta ligeramente
            if(terrain[x][y] > 100) {
                 stroke(200, 255, 255);
            } else {
                 stroke(0, 200, 255, 150); // Cyan con transparencia lejos
            }
        }
        endShape();
    }
}

// Redimensionar si cambia la ventana
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    w = width + 200;
    h = height + 200;
    cols = w / scl;
    rows = h / scl;
    
    // Reinicializar array
    terrain = [];
    for (let x = 0; x < cols; x++) {
        terrain[x] = [];
        for (let y = 0; y < rows; y++) {
            terrain[x][y] = 0;
        }
    }
}