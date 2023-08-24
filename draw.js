class DrawElement{
    constructor(position, scale = [1, 1], rotation = 0, alpha = 1, ...rest){
        this.position = position
        this.scale = scale
        this.rotation = rotation
        this.alpha = alpha
        this.rest = rest
    }

    draw = (context) => {
        
    }
}

class Head extends DrawElement{
    draw = (context) => {
        context.save();

        context.scale(this.scale[0], this.scale[1])
        context.rotate(this.rotation);
        context.globalAlpha = this.alpha

        context.beginPath();
        context.arc(this.position[0], this.position[1], 200, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();

        context.restore();
    }
}

class Mouth extends DrawElement{

    draw = (context) => {
        context.save();

        context.scale(this.scale[0], this.scale[1])
        context.rotate(this.rotation);
        context.globalAlpha = this.alpha

        context.beginPath();
        context.ellipse(this.position[0], this.position[1], this.rest[0], this.rest[1], 0, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();  

        context.restore();
    }
}

class Eye extends DrawElement{
    draw = (context) => {
        context.save();

        context.scale(this.scale[0], this.scale[1])
        context.rotate(this.rotation);
        context.globalAlpha = this.alpha

        context.strokeStyle = "cyan";
        context.beginPath();
        context.ellipse(this.position[0], this.position[1], this.rest[0], this.rest[1], 0, 0, 2 * Math.PI);
        //context.arc(this.position[0], this.position[1], 30, 0, Math.PI * 2, false);
        context.closePath();
        context.stroke();

        context.restore();
    }
}
 
var canvas = document.getElementById('Canvas');
var context;

var x = 100;

let startTime = performance.now();
    
start();

setInterval(draw, 50);

function start(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = '${window.innerWidth}px';
    canvas.style.height = '${window.innerHeight}px';

    context = canvas.getContext("2d")
    context.scale(1,1)
    context.strokeStyle = "white"
    context.fillStyle =  "white"
}

const head = new Head([300, 300], [1, 1], 0 * Math.PI / 180, 1);
const mouth = new Mouth([300, 375], [1, 1], 0 * Math.PI / 180, 1);
const eyeLeft = new Eye([220, 250], [1, 1], 0 * Math.PI / 180, 1);
const eyeRight = new Eye([380, 250], [1, 1], 0 * Math.PI / 180, 1);

var frame = 0;
var frameCount = 37;

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height, false)
    
    context.strokeStyle = "black";
    context.lineJoin = "round";
    context.lineWidth = 15;

    head.draw(context);
    mouth.draw(context);
    eyeLeft.draw(context);
    eyeRight.draw(context);

    frame++;
    
    if(frame >= frameCount){
        frame = 0;
    }

    //head
    animateWithX({
        timing: back,
        draw: function(progress) {
            head.position = [ 300 - progress * 30, 300 - progress * 30]
        },
        startFrame: 0,
        endFrame: 18,
        x: 5
    });
    
    animate({
        timing: linear,
        draw: function(progress) {
            head.position = [ 270 + progress * 30, 270 + progress * 30]
        },
        startFrame: 19,
        endFrame: 32
    });
    
    //mouth
    animateWithX({
        timing: back,
        draw: function(progress) {
            mouth.position = [ 300 - progress * 100, mouth.position[1]]
        },
        startFrame: 0,
        endFrame: 18,
        x: 8
    });

    animateWithX({
        timing: back,
        draw: function(progress) {
            mouth.position = [ mouth.position[0], 375 - progress * 50]
        },
        startFrame: 0,
        endFrame: 18,
        x: 8
    });

    animate({
        timing: linear,
        draw: function(progress) {
            mouth.position = [ 200 + progress * 100, mouth.position[1]]
        },
        startFrame: 19,
        endFrame: 32
    });

    animate({
        timing: linear,
        draw: function(progress) {
            mouth.position = [ mouth.position[0], 325 + progress * 50]
        },
        startFrame: 19,
        endFrame: 32
    });

    animate({
        timing: linear,
        draw: function(progress) {
            mouth.rest = [ 50, 50 - progress * 40]
            mouth.position = [mouth.position[0], mouth.position[1] / mouth.scale[1]]
        },
        startFrame: 0,
        endFrame: 9
    });

    animate({
        timing: quad,
        draw: function(progress) {
            mouth.rest = [ 50, 10 + progress * 70]
            mouth.position = [mouth.position[0], mouth.position[1] / mouth.scale[1]]
        },
        startFrame: 10,
        endFrame: 18
    });

    animate({
        timing: linear,
        draw: function(progress) {
            mouth.rest = [ 50, 80 - progress * 30]
            mouth.position = [mouth.position[0], mouth.position[1] / mouth.scale[1]]
        },
        startFrame: 19,
        endFrame: 32
    });

    //eyeLeft
    animateWithX({
        timing: back,
        draw: function(progress) {
            eyeLeft.position = [ 220 - progress * 50, eyeLeft.position[1]]
        },
        startFrame: 0,
        endFrame: 18,
        x: 10
    });

    animateWithX({
        timing: back,
        draw: function(progress) {
            eyeLeft.position = [ eyeLeft.position[0], 250 - progress * 60]
        },
        startFrame: 0,
        endFrame: 18,
        x: 10
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeLeft.position = [ 170 + progress * 50, eyeLeft.position[1]]
        },
        startFrame: 19,
        endFrame: 32
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeLeft.position = [ eyeLeft.position[0], 190 + progress * 60]
        },
        startFrame: 19,
        endFrame: 32
    });

    //eyeRight
    animateWithX({
        timing: back,
        draw: function(progress) {
            eyeRight.position = [ 380 - progress * 50, eyeRight.position[1]]
        },
        startFrame: 0,
        endFrame: 18,
        x: 10
    });

    animateWithX({
        timing: back,
        draw: function(progress) {
            eyeRight.position = [ eyeRight.position[0], 250 - progress * 40]
        },
        startFrame: 0,
        endFrame: 18,
        x: 10
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeRight.position = [ 330 + progress * 50, eyeRight.position[1]]
        },
        startFrame: 19,
        endFrame: 32
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeRight.position = [ eyeRight.position[0], 210 + progress * 40]
        },
        startFrame: 19,
        endFrame: 32
    });

    //eyesScale
    animate({
        timing: linear,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 30 - progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 30 - progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
        },
        startFrame: 0,
        endFrame: 4
    });

    animate({
        timing: quad,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 10 + progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 10 + progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
        },
        startFrame: 5,
        endFrame: 9
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 30 - progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 30 - progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
        },
        startFrame: 10,
        endFrame: 14
    });

    animate({
        timing: quad,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 10 + progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 10 + progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
            //console.log(eyeRight.position[1]);
        },
        startFrame: 15,
        endFrame: 19
    });

    animate({
        timing: linear,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 30 - progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 30 - progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
        },
        startFrame: 20,
        endFrame: 24
    });

    animate({
        timing: quad,
        draw: function(progress) {
            eyeLeft.rest = [ 30, 10 + progress * 20]
            //eyeLeft.position = [eyeLeft.position[0], eyeLeft.position[1] / eyeLeft.scale[1]]
            eyeRight.rest = [ 30, 10 + progress * 20]
            //eyeRight.position = [eyeRight.position[0], eyeRight.position[1] / eyeRight.scale[1]]
            
            console.log(eyeRight.position[1]);
        },
        startFrame: 25,
        endFrame: 29
    });
}

function animate({timing, draw, startFrame, endFrame}) {
    let localFrame = frame - startFrame; 
    let deltaFrames = endFrame - startFrame;
  
    let timeFraction = localFrame / deltaFrames;

    if (timeFraction > 1) return;
    if (timeFraction < 0) return;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);
  
    draw(progress); // отрисовать её
}

function animateWithX({timing, draw, startFrame, endFrame, x}){
    let localFrame = frame - startFrame; 
    let deltaFrames = endFrame - startFrame;
  
    let timeFraction = localFrame / deltaFrames;
    
    if (timeFraction > 1) return;
    if (timeFraction < 0) return;

    // вычисление текущего состояния анимации
    let progress = timing(x, timeFraction);
  
    draw(progress); // отрисовать её
}

function makeEaseOut(timing) {
    return function(timeFraction) {
      return 1 - timing(1 - timeFraction);
    }
}

function makeEaseInOut(timing) {
    return function(timeFraction) {
      if (timeFraction < .5)
        return timing(5,2 * timeFraction) / 2;
      else
        return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}

function quad(timeFraction) {
  return Math.pow(timeFraction, 2)
}

function back(x, timeFraction) {
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x)
}

function bounce(timeFraction) {
    for (let a = 0, b = 1; 1; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
      }
    }
}

function elastic(x, timeFraction) {
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction)
}

function linear(timeFraction) {
    return timeFraction;
}