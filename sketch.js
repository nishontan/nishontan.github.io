var symbolSize = 24;
var streams = [];

window.onload = showViewport;
window.onresize = showViewport;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);

    var x = 0;
    var y = random(-1000,0);

    for (var i = 0; i < width / symbolSize; i++) {
        var stream = new Stream();
        stream.generateSymbols(x,y);
        streams.push(stream);
        x += symbolSize
    }
    textSize(symbolSize);
}

function draw() {
    background(0,200)
    
    streams.forEach(function(stream){
        stream.render();
    });
}


function showViewport() {
    var output=document.getElementById("output");
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var height= Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    output.innerHTML = "Viewport size is " + width + "x" + height;
  }

function Symbol(x, y, speed,position) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.position = position;
    this.switchInterval = round(random(1, 150));

    //todo: get nepali/newari char instead
    //todo: add start button
    //todo: fix overflow height and width of canvas
    this.setToRandomSymbol = function () {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                0x30A0 + round(random(0, 96))
            );
        }
    }

    this.render = function () {
        // fill(0, 255, 70)
        // text(this.value, this.x, this.y)
        // this.rain();
    }

    this.rain = function () {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;

    }
}

function Stream() {
    this.symbols = [];
    this.totalSymbols = round(random(1, 30));
    this.speed = random(5, 30);
    this.generateSymbols = function (x,y) {
        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x, y, this.speed,i);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    }

    this.render = function () {
        this.symbols.forEach(function (symbol) {
            if(symbol.position === 0){
                fill(180,255,180);
            }else{
                fill(0, 255, 10)
            }
            text(symbol.value, symbol.x, symbol.y)
            symbol.rain();
            symbol.setToRandomSymbol();
        })
    }
}