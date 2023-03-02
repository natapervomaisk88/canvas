const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let coords = []; //массив координат

const radius = 5;

let isMouseDown = false;

context.lineWidth = radius * 2;

canvas.addEventListener("mousedown", () => {
  isMouseDown = true;
});

canvas.addEventListener("mouseup", () => {
  context.beginPath();
  coords.push("mouseup");
  isMouseDown = false;
});

canvas.addEventListener("mousemove", (event) => {
  if (isMouseDown) {
    coords.push([event.clientX, event.clientY]);
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    context.beginPath();
    context.arc(event.clientX, event.clientY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.keyCode === 46) {
    //очистка холста (delete)
    clear();
  }
  if (event.keyCode === 83) {
    //сохранение рисунка (s)
    localStorage.setItem("coords", JSON.stringify(coords));
  }
  if (event.keyCode === 13) {
    //перерисовка (Enter)
    clear();
    coords = JSON.parse(localStorage.getItem("coords"));
    draw();
  }
});

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  let timer = setInterval(() => {
    if (coords.length === 0) {
      clearInterval(timer);
      context.beginPath();
      return;
    }
    let coord = coords.shift();
    let event = { clientX: coord[0], clientY: coord[1] };
    context.lineTo(event.clientX, event.clientY);
    context.stroke();
    context.beginPath();
    context.arc(event.clientX, event.clientY, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.beginPath();
    context.moveTo(event.clientX, event.clientY);
  }, 20);
}
