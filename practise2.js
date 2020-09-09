const canvas = document.querySelector('canvas');
canvas.width = width = window.innerWidth - 4;
canvas.height = height = window.innerHeight - 4;
console.log(width)
let c = canvas.getContext('2d');
let mouse = {
    x: undefined,
    y: undefined,
}
window.addEventListener('mousemove', function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize', function(){
    canvas.width = width = window.innerWidth - 4;
    canvas.height = height = window.innerHeight - 4;
    create();

})
function Circle(x, y,radius,  vx, vy, color){
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.minRadius = radius;
}
Circle.prototype.draw = function(){
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.stroke();
    c.fill();
}
Circle.prototype.update = function(){
    if(this.x > width - this.radius || this.x < 0){
        this.vx= -this.vx;
    }
    if(this.y > height - this.radius || this.y < 0){
        this.vy= -this.vy;
    }
    this.x += this.vx;
    this.y += this.vy;

    if(mouse.x < this.x + 50 && mouse.x > this.x - 50 && this.radius < 50
        && mouse.y > this.y - 50 && mouse.y < this.y + 50){
        this.radius += 1;
    }else{
        this.radius = this.minRadius;
    }
    this.draw();
}

let circles = [];
function create(){
    circles= [];
    let colors = ['#025159', '#03A696', '#F28705', '#F25D27', '#F20505'];
    for(let i = 0; i < width / 2; i++){
        let radius = Math.random() * (1) + 2;
        let x = Math.random() * (width - radius * 2);
        let y = Math.random() * (height - radius * 2);
        let vx = (Math.random() - 0.5) * 4;
        let vy = (Math.random() - 0.5) * 4;
        let color = colors[Math.floor(Math.random() * colors.length)];
        let circle = new Circle(x, y, radius, vx, vy, color);
        circles.push(circle);
    }
}

function animation(){
    c.clearRect(0, 0, width, height);
    requestAnimationFrame(animation); 
    circles.map(c => c.update()); 
}
create();
animation();
