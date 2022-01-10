var song;
var fft;
var particles = []



function preload() {
    song = loadSound("spring.mp3")
}

function setup() {
    createCanvas(800, 700);
    angleMode(DEGREES); // Unifies lines, delete to have multiple waves
    fft = new p5.FFT();
}

function draw() {
    background(0);
    stroke(225)
    noFill()

    translate(width / 2, height / 2)

    var wave = fft.waveform()

    for (var t = -1; t <= 1; t += 2) {
        beginShape()
        for (var i = 0; i <= 180; i++) {
            var index = floor(map(i, 0, 180, 0, wave.length - 1))

            var r = map(wave[index], -1, 1, 150, 350)

            var x = r * sin(i)
            var y = r * cos(i)
                //point(x, y)
                //ellipse(x, y/3, 2)
            vertex(x, y)

        }
        endShape();

        beginShape();
        for (var i = 0; i <= 180; i++) {
            var index = floor(map(i, 0, 180, 0, wave.length - 1))

            var r = map(wave[index], -1, 1, 150, 350)

            var x = r * -sin(i)
            var y = r * cos(i)
                //point(x, y)
                //ellipse(x, y/3, 2)
            vertex(x, y)

        }
        endShape()

    }

    var p = new Particle()
    particles.push(p)

    for (var i = 0; i < particles.length; i++) {
        particles[i].update()
        particles[i].show()
    }

}

function mouseClicked() {
    if (song.isPlaying()) {
        song.pause();
        noLoop();
    } else {
        song.play();
        loop();
    }
}



class Particle {
    constructor() {
        this.vel = createVector(0, 0)
        this.pos = p5.Vector.random2D().mult(20)
        this.acc = this.pos.copy().mult(random(0.00001, 0.00001))
        this.w = random(3, 5)
    }
    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
    }
    show() {
        noStroke();
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.w)
    }
}