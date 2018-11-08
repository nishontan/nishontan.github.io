var symbolSize = 60;
var stream;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);
    stream = new Stream();
    stream.generateSymbols();
    textSize(symbolSize);
}

function draw() {
    background(0)
    stream.render();
}

function Symbol(x, y, speed) {
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(1, 150));

    //todo: get nepali/newari char instead
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
    this.totalSymbols = round(random(1, 15));
    this.speed = random(5, 20);

    console.log(this.totalSymbols)

    this.generateSymbols = function () {
        var y = 0;
        var x = width / 2;

        for (var i = 0; i <= this.totalSymbols; i++) {
            symbol = new Symbol(x,y,this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
        }
    }

    this.render = function(){
        this.symbols.forEach(function(symbol){
            fill(0, 255, 70)
            text(symbol.value, symbol.x, symbol.y)
            symbol.rain();
            symbol.setToRandomSymbol();
        })
    }
}