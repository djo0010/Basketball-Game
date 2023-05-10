const arrow = document.getElementById('arrow');
let rotationAngle = 0;
let shotsMade = 0;

function handleMouseMove(e) {
  e.preventDefault();
  const arrowRect = arrow.getBoundingClientRect();
  var arrowCenterX = arrowRect.left + arrowRect.width / 2;
  var arrowCenterY = arrowRect.top - arrowRect.height / 2;
  var pointerAngle = Math.PI - Math.atan2(e.clientX - arrowCenterX, e.clientY - arrowCenterY);
  rotationAngle = pointerAngle;
  arrow.style.transform = `rotate(${pointerAngle}rad)`;
}

function handleMouseUp() {
  document.removeEventListener('mousemove', handleMouseMove);
  console.log("mouseup");
}

arrow.addEventListener('mousedown', function () {
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
});

let intervalIds = [];
function startAnimation() {
  intervalIds.forEach(e => clearInterval(e));
  const ball = document.getElementById("ball");
  const container = document.getElementById("container");
  const angle = 90 - rotationAngle * 180 / Math.PI; // angle in degrees
  const initialVelocity = 10; // in pixels per frame
  const gravity = 0.1; // in pixels per frame^2
  let x = 0;
  let y = 0;
  let t = 0;
  let vX = initialVelocity * Math.cos(angle * Math.PI / 180);
  let vY = -initialVelocity * Math.sin(angle * Math.PI / 180);
  const animationId = setInterval(() => {
    vX = vX * .999;
    vY = vY * .999;
    x += vX;
    y += vY;
    vY += gravity;

    console.log(x);
    console.log(y);

    if (y >= container.clientHeight - ball.clientHeight || y > 56) {
      vX = vX * 0.8;
      vY = -vY;
    }
    if (x <= -33 || x >= container.clientWidth - 2 * ball.clientWidth) {
      vY = vY * 0.8;
      vX = -vX;
    }
    if (vX == 0 || vY == 0) clearInterval(animationId);
    ball.style.transform = `translate(${x}px, ${y}px)`;
    const divs = document.querySelectorAll('div');
    divs.forEach((div) => {
      var itemHit = checkCollisions(ball, div.id);
      console.log(itemHit);
      switch (itemHit) {
        case "rim":
          vX = -vX;
          vy = -vY;
          break;
        case "trueGoal":
            clearInterval(animationId);
            //make it pop message that says level completed. 
            //make it mark the level completed in main area.
        case "backboard":
          vX = -vX;
          break;
        case "pole":
          vX = -vX;
          break;
        case "connector":
          vX = -vX;
          break;
        case "player":
          console.log("ouch")
          break;  
        case "obstacle1":
            vX = -vX;
            break;
        case "obstacle2":
            vX = -vX;
            break;
        case "obstacle3":
            vY = -vY;
            break;
        case "obstacle4":
            vY = -vY;
            break;
        case "obstacle5":
            vY = -vY;
            break;
      }
    });
    t++;

  }, 16); // 60 frames per second
  intervalIds.push(animationId); // 60 frames per second
}

function checkCollisions(ball, divIdentifier) {
  const ballRect = ball.getBoundingClientRect();
  const div = document.getElementById(divIdentifier);
  const divRect = div.getBoundingClientRect();

  // check for horizontal overlap
  const xOverlap = ballRect.left < divRect.right && ballRect.right > divRect.left;

  // check for vertical overlap
  const yOverlap = ballRect.top < divRect.bottom && ballRect.bottom > divRect.top;

  // if there is overlap, the ball has hit the div
  if (xOverlap && yOverlap && divIdentifier != "container") {
    return divIdentifier;
  }
  return null;
}

function goToMenu() {
  window.location.href = "menu.html";
}
