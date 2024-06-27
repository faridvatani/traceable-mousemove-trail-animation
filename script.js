/* initial Lenis Scroll
 * https://github.com/darkroomengineering/lenis
 */
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Setup canvas and context for drawing
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

// Function to resize canvas to fill window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.documentElement.scrollHeight;
}

// Initial canvas setup
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse and scroll tracking
let mousePosition = { x: 0, y: 0 };
let lastScrollPosition = { left: window.scrollX, top: window.scrollY };
let lastDrawPosition = { x: null, y: null };

// Drawing settings
ctx.lineWidth = 24;
ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
ctx.lineCap = 'round';
ctx.filter = 'blur(12px)';

// Draw line function
function drawLine(toX, toY) {
  if (lastDrawPosition.x !== null && lastDrawPosition.y !== null) {
    ctx.beginPath();
    ctx.moveTo(lastDrawPosition.x, lastDrawPosition.y);
    ctx.lineTo(toX, toY);
    ctx.stroke();
  }

  lastDrawPosition = { x: toX, y: toY };
}

// Mouse move event listener
document.addEventListener('mousemove', (e) => {
  mousePosition = { x: e.pageX, y: e.pageY };
  drawLine(mousePosition.x, mousePosition.y);
});

// Scroll event listener to adjust drawing position
window.addEventListener('scroll', () => {
  const scrolledX = window.scrollX - lastScrollPosition.left;
  const scrolledY = window.scrollY - lastScrollPosition.top;

  mousePosition.x += scrolledX;
  mousePosition.y += scrolledY;
  drawLine(mousePosition.x, mousePosition.y);

  lastScrollPosition = { left: window.scrollX, top: window.scrollY };
});
