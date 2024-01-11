var c = document.getElementById("c");
var ctx = c.getContext("2d");

var bc = document.createElement("canvas");
var bCtx = bc.getContext("2d");

var cw = c.width = bc.width = window.innerWidth,
  cx = cw / 2;
var ch = c.height = bc.height = window.innerHeight + 100,
  cy = ch;

var frames = 0;
var requestId = null;
var rad = (Math.PI / 180);
var kappa = 0.5522847498;

var x, y;
bCtx.strokeStyle = "#abcdef";
bCtx.lineWidth = 1;

var balloons = [];

function Balloon() {
  this.r = randomIntFromInterval(20, 70);
  this.R = 1.4 * this.r;
  this.x = randomIntFromInterval(this.r, cw - this.r);
  this.y = ch + 2 * this.r;
  this.a = this.r * 4.5;
  this.pm = Math.random() < 0.5 ? -1 : 1;
  this.speed = randomIntFromInterval(1.5, 4);
  this.k = this.speed / 5;
  this.hue = this.pm > 0 ? "210" : "10";
}

function Draw() {

  updateBallons(bCtx);

  ctx.clearRect(0, 0, cw, ch);
  var img = bc;
  ctx.drawImage(img, 0, 0);

  requestId = window.requestAnimationFrame(Draw);
}
//requestId = window.requestAnimationFrame(Draw);

function Init() {
  if (requestId) {
    window.cancelAnimationFrame(requestId);
    requestId = null;
  }
  cw = c.width = bc.width = window.innerWidth, cx = cw / 2;
  ch = c.height = bc.height = window.innerHeight + 100, cy = ch;
  bCtx.strokeStyle = "#abcdef";
  bCtx.lineWidth = 1;
  Draw();
}

setTimeout(function() {
  Init();
  window.addEventListener('resize', Init, false);
}, 15);

function updateBallons(ctx) {
  frames += 1;
  if (frames % 37 == 0 && balloons.length < 37) {
    var balloon = new Balloon();
    balloons.push(balloon);
  }
  ctx.clearRect(0, 0, cw, ch);

  for (var i = 0; i < balloons.length; i++) {
    var b = balloons[i];
    if (b.y > -b.a) {
      b.y -= b.speed
    } else {
      b.y = parseInt(ch + b.r + b.R);
    }

    var p = thread(b, ctx);
    b.cx = p.x;
    b.cy = p.y - b.R;
    
function drawBalloon(b, ctx) {

  var or = b.r * kappa; // offset

  var p1 = {
    x: b.cx - b.r,
    y: b.cy
  }
  var pc11 = {
    x: p1.x,
    y: p1.y + or
  }
  var pc12 = {
    x: p1.x,
    y: p1.y - or
  }

  var p2 = {
    x: b.cx,
    y: b.cy - b.r
  }
  var pc21 = {
    x: b.cx - or,
    y: p2.y
  }
  var pc22 = {
    x: b.cx + or,
    y: p2.y
  }

  var p3 = {
    x: b.cx + b.r,
    y: b.cy
  }
  var pc31 = {
    x: p3.x,
    y: p3.y - or
  }
  var pc32 = {
    x: p3.x,
    y: p3.y + or
  }

  var p4 = {
    x: b.cx,
    y: b.cy + b.R
  };
  var pc41 = {
    x: p4.x + or,
    y: p4.y
  }
  var pc42 = {
    x: p4.x - or,
    y: p4.y
  }

  var t1 = {
    x: p4.x + .2 * b.r * Math.cos(70 * rad),
    y: p4.y + .2 * b.r * Math.sin(70 * rad)
  }
  var t2 = {
    x: p4.x + .2 * b.r * Math.cos(110 * rad),
    y: p4.y + .2 * b.r * Math.sin(110 * rad)
  }

    ctx.fillStyle = Grd(p.x, p.y, b.r, b.hue)
    drawBalloon(b, ctx);
  }
}
 //balloon
  ctx.beginPath();
  ctx.moveTo(p4.x, p4.y);
  ctx.bezierCurveTo(pc42.x, pc42.y, pc11.x, pc11.y, p1.x, p1.y);
  ctx.bezierCurveTo(pc12.x, pc12.y, pc21.x, pc21.y, p2.x, p2.y);
  ctx.bezierCurveTo(pc22.x, pc22.y, pc31.x, pc31.y, p3.x, p3.y);
  ctx.bezierCurveTo(pc32.x, pc32.y, pc41.x, pc41.y, p4.x, p4.y);
  //knot
  ctx.lineTo(t1.x, t1.y);
  ctx.lineTo(t2.x, t2.y);
  ctx.closePath();
  ctx.fill();
}

function thread(b, ctx) {
  ctx.beginPath();

  for (var i = b.a; i > 0; i -= 1) {
    var t = i * rad;
    x = b.x + b.pm * 50 * Math.cos(b.k * t - frames * rad)
    y = b.y + b.pm * 25 * Math.sin(b.k * t - frames * rad) + 50 * t
    ctx.lineTo(x, y)
  }
ctx.stroke();
  return p = {
    x: x,
    y: y
  }
}

function Grd(x, y, r, hue) {
  grd = ctx.createRadialGradient(x - .5 * r, y - 1.7 * r, 0, x - .5 * r, y - 1.7 * r, r);
  grd.addColorStop(0, 'hsla(' + hue + ',100%,65%,.95)');
  grd.addColorStop(0.4, 'hsla(' + hue + ',100%,45%,.85)');
  grd.addColorStop(1, 'hsla(' + hue + ',100%,25%,.80)');
  return grd;
}

function randomIntFromInterval(mn, mx) {
  return ~~(Math.random() * (mx - mn + 1) + mn);
}

const quotes = [
  "Happy Birthday, Betty! 🎂 Wishing you a day filled with joy, a year filled with love, and a lifetime filled with laughter. Cheers to celebrating you!",
  "To the one and only Betty on her special day! 🎉 May your birthday be as bright and beautiful as your spirit. Here's to making wonderful memories and enjoying every moment!",
  "Happy Birthday, Betty! 🎈 On this day, may you be surrounded by love, bathed in happiness, and gifted with all the things that bring you joy. Cheers to another fabulous year ahead!",
  "Sending you the biggest birthday hugs, Betty! 🤗 May your day be filled with love, laughter, and all the things that make your heart smile. Here's to you, the star of the day!",
  "Cheers to the extraordinary Betty! 🥳 On your birthday, may you be blessed with all the happiness you've shared with others. Wishing you a day that's as wonderful as you are!",
  "Happy Birthday, Betty! 🎂 May this year be a canvas of beautiful moments, and may each day be a new brushstroke of joy and success. Here's to painting a vibrant and fulfilling life!",
  "Warmest birthday wishes to the amazing Betty! 🎉 May this day bring you endless smiles, heartwarming surprises, and the realization of dreams you've yet to dream. Celebrate yourself to the fullest!",
  "Happy Birthday, Betty! 🎈 Today is all about you—your wishes, your dreams, and the incredible person you are. May this year be the chapter where every page radiates happiness!",
  "To my dearest Betty on her special day! 🥳 May your birthday be sprinkled with love, wrapped in joy, and filled with the warmth of cherished moments. Here's to creating more beautiful memories together!",
  "Happy Birthday, Betty! 🎂 On your special day, may you be surrounded by friends who adore you, family who loves you, and moments that make you smile. Here's to the spectacular person you are!",

  // Add more quotes as needed
];

// Function to get a random quote from the array
function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}
