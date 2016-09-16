window.onload = function() {
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  var score;
  var dir;
  var size = 10;
  var snakeArray;

  function init(){
    dir = "right";
    createSnake();
    createFood();
    score = 0;

    if(typeof game_loop != "undefined") clearInterval(game_loop);
    game_loop = setInterval(paint, 1000/16);
  }
  init();

  function createSnake(){
    var length = 10;
    snakeArray = [];
    for(var i = length - 1; i>=0; i--) {
      snakeArray.push({x: i, y:0});
    }
  }

  function createFood(){
    food = [];
    var fx = Math.floor(Math.random() * w / size);
    var fy = Math.floor(Math.random() * h / size);
    food.push({x: fx, y: fy});
  }

  function paint(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    ctx.fillStyle = "blue";
    ctx.font = "italic 15pt Arial";
    ctx.fillText("Score: " + score, 10, h - 10);

    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    if(dir == "right") nx++;
    if(dir == "left")  nx--;
    if(dir == "down")  ny++;
    if(dir == "up")    ny--;

    if(food[0].x == nx && food[0].y == ny) {
      score = score + 1;
      snakeArray.unshift({x: nx, y: ny});
      createFood();
    } else {
      var tail = snakeArray.pop();
      tail.x = nx; tail.y = ny;
      snakeArray.unshift(tail);
    }

    for(var i = 0; i < snakeArray.length; i++) {
      var c = snakeArray[i];
      paintCell(c.x, c.y);
    }

    paintCell(food[0].x, food[0].y);

    if(nx * size > w - size || nx < 0 || ny * size > h - size || ny < 0 || checkCollapse(nx, ny, snakeArray) ) {
      clearInterval(game_loop);

      ctx.fillText("GAME OVER", w/2 - 75, h/2 - 20);
      ctx.fillText("Press 'Enter' to restart", w/2 - 100, h/2);

      var handler = function (event) {
        if(event.keyCode == 13) {
          document.removeEventListener("keydown", handler);
          init();
        }  
      };
      document.addEventListener("keydown", handler);
    }
  }

  function checkCollapse(x, y, array) {
     for(var i = 1; i < array.length; i++) {
        if(array[i].x == x && array[i].y == y) {
          return true;
        }
     }
     return false;
  }

  function paintCell(x,y){
    ctx.fillStyle = "blue";
    ctx.fillRect(x * size, y * size, size, size);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * size, y * size, size, size);
  }

  document.addEventListener("keydown", function (event) {
    if      (event.keyCode == 38 && dir !== "down")  dir = "up";
    else if (event.keyCode == 40 && dir !== "up")    dir = "down";
    else if (event.keyCode == 37 && dir !== "right") dir = "left";
    else if (event.keyCode == 39 && dir !== "left")  dir = "right";
  });
}
