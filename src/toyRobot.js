'use strict'

var robot = {
  ready: false,
  x: null,
  y: null,
  f: ''
}

var faces = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
var input = [];


document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    document.getElementById("console").innerHTML = "Robot Ready...";
  }
};

var clear_robot = function () {
  document.getElementById("console").innerHTML = "Robot Ready...";
  document.getElementById("input").value = '';
  robot.ready = false;
}

var run_robot = function () {

  let commandLine = 0;
  input = document.getElementById("input").value.toUpperCase();
  input = input.split(/\n/);
  input.forEach(instruction => {
    commandLine++;
    switch (instruction) {
      case 'LEFT':
        if (robot.ready) {
          left();
        }
        console.log('robot: ', robot);
        break;
      case 'RIGHT':
        if (robot.ready) { right(); }
        break;
      case 'REPORT':
        if (robot.ready) { report(); }
        break;
      case 'MOVE':
        if (robot.ready) { move(); }
        break;
      default:
        if (instruction.match(/PLACE [01234],[01234],[NORTH|SOUTH|EAST|WEST]/)) {
          robot.ready = true;
          let input = instruction.split(/,/);
          console.log('switch: ', input);
          set('x', input[0].substr(6, 6));
          set('y', input[1]);
          set('f', input[2]);
        } else {
          printConsole(`Incorrect command. Line: ${commandLine}`);
        }
        break;


    }

  });


}

var move = function () {
  switch (robot.f) {
    case 'NORTH':
      if (robot.y < 5) { robot.y++; }
      break;
    case 'EAST':
      if (robot.x < 5) { robot.x++; }
      break;
    case 'SOUTH':
      if (robot.y > 0) { robot.y--; }
      break;
    case 'WEST':
      if (robot.x > 0) { robot.x--; }
      break;
    default:
      console.log('switch: ', robot.f);
  }
}

var right = function () {
  let index = 0;
  index = faces.indexOf(robot.f);
  index++
  if (index > 3) {
    index = 0;
  }
  robot.f = faces[index];

}

var left = function () {
  let index = 0;
  index = faces.indexOf(robot.f);
  index--
  if (index < 0) {
    index = 3;
  }
  robot.f = faces[index];
}

var report = function () {
  document.getElementById("console").innerHTML = `${robot.x}, ${robot.y}, ${robot.f}`;
}

var place = function (x, y, f) {
  if (x && y && f) {
    set('x', x);
    set('y', y);
    set('f', f);
  } else {
    console.log('position invalid');
  }

}

var set = function (coordinate, number) {
  robot[coordinate] = number;
}

var printConsole = function (msg) {
  document.getElementById("console").innerHTML = msg;
}

