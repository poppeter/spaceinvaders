const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const WIDTH = canvas.width;
const HEIGHT = canvas.height;

// Player settings
const player = {
  x: WIDTH / 2,
  y: HEIGHT - 40,
  width: 40,
  height: 20,
  speed: 5,
  color: 'lime'
};

const keys = {};
const bullets = [];
const aliens = [];
const explosions = [];

// Create aliens grid
const rows = 4;
const cols = 8;
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    aliens.push({
      x: 80 + c * 80,
      y: 60 + r * 60,
      width: 40,
      height: 30,
      dx: 1,
      dy: 0,
      color: 'white',
    });
  }
}

function shoot() {
  bullets.push({
    x: player.x + player.width / 2,
    y: player.y,
    dy: -8,
    width: 4,
    height: 10,
  });
}

function createExplosion(x, y) {
  const particles = [];
  for (let i = 0; i < 20; i++) {
    particles.push({
      x,
      y,
      dx: (Math.random() - 0.5) * 6,
      dy: (Math.random() - 0.5) * 6,
      life: 30,
      color: 'orange'
    });
  }
  explosions.push(particles);
}

function update() {
  // Move player
  if (keys['ArrowLeft']) player.x -= player.speed;
  if (keys['ArrowRight']) player.x += player.speed;
  player.x = Math.max(0, Math.min(WIDTH - player.width, player.x));

  // Update bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.y += b.dy;
    if (b.y < 0) bullets.splice(i, 1);
  }

  // Update aliens
  let shiftDown = false;
  for (const alien of aliens) {
    alien.x += alien.dx;
    if (alien.x <= 0 || alien.x + alien.width >= WIDTH) {
      shiftDown = true;
    }
  }
  if (shiftDown) {
    for (const alien of aliens) {
      alien.dx *= -1;
      alien.y += 20;
    }
  }

  // Bullet collision with aliens
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    for (let j = aliens.length - 1; j >= 0; j--) {
      const a = aliens[j];
      if (b.x < a.x + a.width && b.x + b.width > a.x && b.y < a.y + a.height && b.y + b.height > a.y) {
        bullets.splice(i, 1);
        aliens.splice(j, 1);
        createExplosion(a.x + a.width / 2, a.y + a.height / 2);
        break;
      }
    }
  }

  // Update explosions
  for (let p = explosions.length - 1; p >= 0; p--) {
    const particles = explosions[p];
    for (let i = particles.length - 1; i >= 0; i--) {
      const part = particles[i];
      part.x += part.dx;
      part.y += part.dy;
      part.life--;
      if (part.life <= 0) particles.splice(i, 1);
    }
    if (particles.length === 0) explosions.splice(p, 1);
  }
}

function draw() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // Draw player
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  // Draw bullets
  ctx.fillStyle = 'red';
  for (const b of bullets) {
    ctx.fillRect(b.x, b.y, b.width, b.height);
  }

  // Draw aliens
  ctx.fillStyle = 'white';
  for (const a of aliens) {
    ctx.fillRect(a.x, a.y, a.width, a.height);
  }

  // Draw explosions
  for (const particles of explosions) {
    for (const part of particles) {
      ctx.fillStyle = part.color;
      ctx.fillRect(part.x, part.y, 4, 4);
    }
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  if (e.key === ' ') {
    shoot();
  }
});

window.addEventListener('keyup', e => {
  keys[e.key] = false;
});

requestAnimationFrame(gameLoop);
