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

    if(typeof game_loop != "undefined") clearImmediate(game_loop);
    game_loop = setInterval(paint, 60);
   
  }
  init();

  function createSnake(){
    var length = 5;
    snakeArray = [];
    for(var i = length - 1; i>=0; i--) {
      snakeArray.push({x: i, y:0}); //переделать в object
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
      init();
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

  addEventListener("keydown", function (event) {
    if      (event.keyCode == 38 && dir !== "down")  dir = "up";
    else if (event.keyCode == 40 && dir !== "up")    dir = "down";
    else if (event.keyCode == 37 && dir !== "right") dir = "left";
    else if (event.keyCode == 39 && dir !== "left")  dir = "right";
  });
}
