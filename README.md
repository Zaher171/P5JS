# 🌐 Nexus Digital | Experiencia Web Generativa 3D

Este proyecto es una aplicación web inmersiva que integra una interfaz de usuario moderna (HTML5/CSS3) con un fondo interactivo tridimensional generado procedurally mediante **P5.js** y **WEBGL**.

El objetivo es demostrar la integración técnica entre elementos DOM convencionales y gráficos renderizados por GPU en el navegador, creando una estética "Cyberpunk" o futurista.

## 🚀 Características Principales

* **Renderizado 3D (WEBGL):** A diferencia de las animaciones 2D estándar, este proyecto utiliza el modo 3D de P5.js para generar una malla geométrica con profundidad.
* **Generación Procedural:** El terreno no es una imagen ni un vídeo; se genera matemáticamente en tiempo real utilizando el algoritmo de **Ruido Perlin** (Perlin Noise), logrando un movimiento orgánico y fluido.
* **Interactividad Total:**
    * **Eje X del Ratón:** Controla la velocidad de vuelo sobre el terreno.
    * **Eje Y del Ratón:** Controla la amplitud (altura) de las montañas digitales.
* **UI Glassmorphism:** La interfaz HTML utiliza efectos de desenfoque (`backdrop-filter: blur`) y transparencias para integrarse visualmente sobre el canvas 3D sin ocultarlo.

## 📂 Estructura del Proyecto

El proyecto sigue una arquitectura de separación de responsabilidades:

- `index.html`: Estructura semántica y contenedores.
- `style.css`: Estilos, Glassmorphism y z-index layering.
- `sketch.js`: Lógica de animación P5.js y algoritmos matemáticos.
- `README.md`: Documentación del proyecto.

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Semántica web.
* **CSS3:** Variables CSS, Flexbox, Grid Layout y Backdrop Filters.
* **JavaScript (ES6):** Lógica de control.
* **P5.js:** Librería de renderizado gráfico creativo.

## 🧠 Explicación Técnica del Código (P5.js)

El núcleo visual reside en `sketch.js`. Se utiliza un algoritmo de **Terrain Generation** basado en mallas de triángulos (`TRIANGLE_STRIP`).

### 1. Algoritmo de Ruido (Perlin Noise)
En lugar de usar `random()`, que produce caos, utilizamos `noise()`. Esto permite que cada vértice del terreno tenga una altura relacionada suavemente con sus vecinos, creando colinas en lugar de picos aleatorios.

### 2. Modificaciones Realizadas (Aporte Personal)
Basado en conceptos de *Daniel Shiffman (The Coding Train)* y *OpenProcessing*, se realizaron las siguientes adaptaciones para este proyecto:

* **Adaptación WEBGL:** Se migró el sistema de coordenadas para funcionar como fondo fijo (`position: fixed` en CSS) detrás del HTML.
* **Feedback Interactivo:** Se programó el mapeo (`map()`) de las coordenadas del ratón (`mouseX`, `mouseY`) para alterar las variables `flying` (velocidad) y `peakHeight` (geometría) en tiempo real.
* **Estética Wireframe:** Se eliminó el relleno de polígonos (`noFill()`) y se optimizó el uso de `stroke()` con colores neón para reducir la carga visual y resaltar el estilo "Grid" futurista.

---
*Proyecto realizado con fines educativos para la asignatura de Desarrollo Web.*
