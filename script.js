const canvas = document.getElementById('pingPongCanvas');
const ctx = canvas.getContext('2d');

const paddleWidth = 10;
const paddleHeight = 60;
const ballSize = 10;

let paddleLeftY = canvas.height / 2 - paddleHeight / 2;
let paddleRightY = canvas.height / 2 - paddleHeight / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 2;

let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

let playerLeftScore = 0;
let playerRightScore = 0;

function draw() {
  // Clear the canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = 'white';
  ctx.fillRect(0, paddleLeftY, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth, paddleRightY, paddleWidth, paddleHeight);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.closePath();

  // Draw scores
  ctx.fillText('Player Left: ' + playerLeftScore, 100, 50);
  ctx.fillText('Player Right: ' + playerRightScore, canvas.width - 200, 50);
}

function move() {
  // Move paddles
  paddleLeftY += leftPaddleSpeed;
  paddleRightY += rightPaddleSpeed;

  // Ensure paddles stay within the canvas
  paddleLeftY = Math.max(0, Math.min(canvas.height - paddleHeight, paddleLeftY));
  paddleRightY = Math.max(0, Math.min(canvas.height - paddleHeight, paddleRightY));

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce the ball off the top and bottom walls
  if (ballY - ballSize < 0 || ballY + ballSize > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Bounce the ball off the paddles
  if (
    (ballX - ballSize < paddleWidth && ballY > paddleLeftY && ballY < paddleLeftY + paddleHeight) ||
    (ballX + ballSize > canvas.width - paddleWidth && ballY > paddleRightY && ballY < paddleRightY + paddleHeight)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Score points
  if (ballX - ballSize < 0) {
    // Ball went past the left paddle
    playerRightScore++;
    resetBall();
  } else if (ballX + ballSize > canvas.width) {
    // Ball went past the right paddle
    playerLeftScore++;
    resetBall();
  }
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}

function update() {
  draw();
  move();
}

function gameLoop() {
  update();
  requestAnimationFrame(gameLoop);
}

// Event listeners for paddle movement
document.addEventListener('keydown', function (event) {
  switch (event.code) {
    case 'ArrowUp':
      rightPaddleSpeed = -5;
      break;
    case 'ArrowDown':
      rightPaddleSpeed = 5;
      break;
    case 'KeyW':
      leftPaddleSpeed = -5;
      break;
    case 'KeyS':
      leftPaddleSpeed = 5;
      break;
  }
});

document.addEventListener('keyup', function (event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'ArrowDown':
      rightPaddleSpeed = 0;
      break;
    case 'KeyW':
    case 'KeyS':
      leftPaddleSpeed = 0;
      break;
  }
});

// Start the game loop
gameLoop();

