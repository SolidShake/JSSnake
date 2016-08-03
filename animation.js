window.onload = function() {
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  var score;
  //var food
  var dir;
  var size = 10;

  var snakeArray;

  function init(){
    dir = "right";
    createSnake();
    createFood();
    score = 0;

    setInterval(paint, 60);
  }
  init();

  function createSnake(){
    var length = 5;
    snakeArray = []
    for(var i = length - 1; i>=0; i--) {
      snakeArray.push({x: i, y:0}); //переделать в object
    }
  }

  function createFood(){

  }

  function paint(){
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    var nx = snakeArray[0].x;
    var ny = snakeArray[0].y;

    if(dir == "right") nx++;

    //
    var tail = snakeArray.pop();
    tail.x = nx; tail.y = ny;
    //
    snakeArray.unshift(tail);

    for(var i = 0; i < snakeArray.length; i++) {
      var c = snakeArray[i];
      paintCell(c.x, c.y);
    }
  }

  function paintCell(x,y){
    ctx.fillStyle = "blue";
    ctx.fillRect(x * size, y * size, size, size);
    ctx.strokeStyle = "white";
    ctx.strokeRect(x * size, y * size, size, size)
  }

  function checkCollapse(){

  }

  function control(){

  }
}
