function createObj(xa, ya, areaa, typea) {
  return {
    area: areaa,
    x: xa,
    y: ya,
    type: typea
  }
}

function createEnemy(xa, ya, areaa, typea) {
  return {
    area: areaa,
    x: xa,
    y: ya,
    type: typea,
    element: {}
  }
}

function main() {
  // Example: Update game logic every frame (e.g., 60 times per second)
  const frameRate = 1000 / 30; // 60 frames per second
  var frames = 0;
  var generatorframes = 0;

  let maxMovement = 2;
  let hostileMovement =  1.2;

  var pause = false;

  const hostilesLogic = [];
  const weapons = [];

  const randomgeneration = [];
  randomgeneration.push(100);

  const charac = document.getElementById("prota")
  const button = document.getElementById("a");
  const enemylist = document.getElementById("enemies");

  const characLogic = createObj(0, 0, 50, "player");
  let aimx = 0;
  let aimy = 0;

  button.addEventListener('click', function (event) {
    pause = !pause;
  });

  document.addEventListener('mousemove', function (event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    setPosProta(mouseX, mouseY);
  });


  const gameLoop = setInterval(function () {
    update();
  }, frameRate);



  function update() {

    if (!pause) {
      frames++;
      generatorframes++;
      moveCharacter();
      moveHostiles();

      if (randomgeneration[0] < generatorframes) {
        randomgeneration.pop();
        randomgeneration.push(Math.floor(Math.random() * (800 - 300) + 300));
        
        generatorframes = 0;

        generateRandomHostile();
      }
    }
  }

  function moveHostiles(){
    for (let i = 0; i < hostilesLogic.length; i++){
      moveObj(hostilesLogic[i]);
    }
  }

  function generateRandomHostile(){
    hostilesLogic.push(createEnemy(Math.random()*500, Math.random()*500, 18, "enemy"));
    hostilesLogic[hostilesLogic.length-1].element = document.createElement("div");
    hostilesLogic[hostilesLogic.length-1].element.className = "hostile";
    enemylist.appendChild(hostilesLogic[hostilesLogic.length-1].element);
  }

  function translateSolver(a,b) {
    return ( a>b? 1 : -1);
  }

  function moveCharacter() {

    // calculate where to move
    let deg = calcDegrees(aimx, aimy);
    characLogic.x = characLogic.x + ((Math.cos(deg) * maxMovement) * translateSolver(aimx , characLogic.x));
    characLogic.y = characLogic.y + ((Math.sin(deg) * maxMovement) * translateSolver(aimx , characLogic.x));
    // render obj
    renderProta();
  }

  function moveObj(obj) {
    // calculate where to move
    let deg = calcDegreesObj(characLogic.x, characLogic.y, obj);
    obj.x = obj.x + ((Math.cos(deg) * hostileMovement) * translateSolver(characLogic.x, obj.x));
    obj.y = obj.y + ((Math.sin(deg) * hostileMovement) * translateSolver(characLogic.x, obj.x));
    // render obj
    render(obj);
  }

  function moveObjHoming(obj) {

    // this function must predict where it will intercept the character
    
    // calculate where to move
    let deg = calcDegreesObj(characLogic.x, characLogic.y, obj);
    obj.x = obj.x + ((Math.cos(deg) * hostileMovement) * translateSolver(characLogic.x, obj.x));
    obj.y = obj.y + ((Math.sin(deg) * hostileMovement) * translateSolver(characLogic.x, obj.x));
    // render obj
    render(obj);
  }

  function setPosProta(x, y) {
    aimx = x;
    aimy = y;
  }

  function renderProta() {
    charac.style.top = characLogic.y - characLogic.area / 2 + "px";
    charac.style.left = characLogic.x - characLogic.area / 2   + "px";
  }

  function render(logicobj) {
    logicobj.element.style.top = logicobj.y - logicobj.area / 2 + "px";
    logicobj.element.style.left = logicobj.x - logicobj.area / 2 + "px";
  }

  function calcDegrees(x, y) {

    var temp1 = y - characLogic.y;
    var temp2 = x - characLogic.x;

    if (temp1 != 0 && temp2 != 0) {
      return Math.atan(temp1 / temp2);
    }
    return 1;

  }

  function calcDegreesObj(x, y, obj) {

    var temp1 = y - obj.y;
    var temp2 = x - obj.x;

    if (temp1 != 0 && temp2 != 0) {
      return Math.atan(temp1 / temp2);
    }
    return 1;

  }
}

window.onload = main;