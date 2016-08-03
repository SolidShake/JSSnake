function mainFunction(){
  var ctx = canvas.getContext("2d");
  var w = canvas.width;
  var h = canvas.height;

  //var score
  //var food
  var dir;

  var snakeArray;

  function init(){
    dir = "right";
    createSnake();
    createFood();
    score = 0;

    setInterval(paint, 60);
  }

  function createSnake(){

  }

  function createFood(){

  }

  function paint(){

  }

  function paintFood(){

  }

  function checkCollapse(){

  }

  function control(){

  }
}
