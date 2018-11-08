var symbol;
var symbolSize = 60;

function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    background(0);
    symbol = new Symbol(
        width / 2,
        0,
        random(1,5) 
    );

    symbol.setToRandomSymbol();
    textSize(symbolSize);
}

function draw() {
    symbol.setToRandomSymbol();
    background(0)
    symbol.render();
}

function Symbol(x,y,speed){
    this.x = x;
    this.y = y;
    this.value;
    this.speed = speed;
    this.switchInterval = round(random(1,10));

    //todo: get nepali/newari char instead
    this.setToRandomSymbol = function(){
        if(frameCount % this.switchInterval == 0){
            this.value = String.fromCharCode(
                0x30A0 + round(random(0,96))
            );
        }
    }

    this.render = function(){
        fill(0,255,70)
        text(this.value,this.x,this.y)
        this.rain();
    } 

    this.rain = function(){
        this.y = (this.y >= height) ? 0: this.y += this.speed;
     
    }
}