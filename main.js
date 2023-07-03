const windowHeight = window.innerHeight;
  
function rate(item){
    return item.getBoundingClientRect().top / windowHeight;
}
// page2
var page2 = document.querySelector('.page2');
window.addEventListener('scroll',()=>{
    if(rate(page2)<=0.7){
      let content2 = page2.querySelector('.content');
      let tempImgs = page2.querySelectorAll('img');
      for(let i=1; i<tempImgs.length; i++){
          tempImgs[i].classList.remove('a-img2');
      }
      setTimeout(() => {
        content2.style.opacity = '1';
      }, 300);
    }
})

// page3
var circles = document.querySelectorAll('.page3 .circles .circle');
window.addEventListener('scroll',()=>{
    let page3 = document.querySelector('.page3');
    if(rate(page3) <=0.7){
        circles[0].classList.remove('a-cir1');
        circles[1].classList.remove('a-cir2');
        page3.querySelector('.content img').classList.remove('a-img3');
        page3.querySelector('.text').classList.remove('a-text3');
    }
})

// pg4
var current = 0;
var img4s = document.querySelectorAll('.start');
var next = document.querySelector('.forward >i');
var colors = document.querySelectorAll('.choose-btn .circle');
var contents = document.querySelectorAll('.page4 .item-content');

window.addEventListener('load',()=>{
  img4s[current].classList.add('a-goin');
  colors[current].classList.add('a-color');
  contents[current].classList.add('a-content');
})
// add - remove
function toggleFunction(){
    img4s[current].classList.toggle('a-goin');
    colors[current].classList.toggle('a-color');
    contents[current].classList.toggle('a-content');
}
next.addEventListener('click',()=>{
    toggleFunction();
    current++;
    if(current>=img4s.length) current=0;
    toggleFunction();
})
for(let i=0; i<colors.length; i++){
  colors[i].addEventListener('click',()=>{
    toggleFunction();
    current=i;
    toggleFunction();
  })
}
// -------------------------------------------------------//





// -------------------------- Background --//

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');  

var width = canvas.width = window.innerWidth + 100;
var height = canvas.height = window.innerHeight + 100;

new ResizeObserver(() => {
    width = canvas.width = window.innerWidth + 100;
    height = canvas.height = window.innerHeight+ 100;
}).observe(document.body)

const bubbles = {
		angle:0,
		count:10,
		particles:[],    
    init:()=>{
		  for(let n=0; n<bubbles.count; n++)
			{
				bubbles.particles.push(
					{
						x: Math.random()*width,
						y: Math.random()*height,
						r: Math.random()*100+1,
						d: Math.random()*bubbles.count,
            a: 0.1 + (Math.random() * 0.5)
					}
				)
			}
		},
		draw:()=>{
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
			ctx.beginPath();
      ctx.fillRect(0, 0, canvas.width, canvas.height);            
			for(let n=0; n<bubbles.count; n++)
			{
				let p = bubbles.particles[n];
        ctx.beginPath();
				ctx.moveTo(p.x, p.y);
				ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);

        var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(255, 166, 0, ${p.a})`);
        gradient.addColorStop(1, "violet");
        ctx.fillStyle = gradient;
        ctx.fill();	
			}	
			ctx.fill();	
			ctx.closePath();	
		},
		update: ()=>{
			bubbles.angle += 0.01;
			for(let n=0; n<bubbles.count; n++)
			{
				let p = bubbles.particles[n];
				p.y -= Math.cos(bubbles.angle+p.d) + 1 + 10/p.r;
				p.x += (Math.sin(bubbles.angle/2) * 2) + (Math.random()/2);

				if(p.y < -5){p.y = height;}
				if(p.x < -5){p.x = width;}
				if(p.x > width+5){p.x = 0;}
			}			
		}    
}  
bubbles.init();
(function loop(){
	bubbles.draw();
  bubbles.update();
	requestAnimationFrame(loop);
})();		  