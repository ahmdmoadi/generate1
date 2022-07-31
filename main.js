const BASE_SCALE = 10;//i regret using this stupid varible
const c = document.querySelector("canvas");
const ctx = c.getContext("2d");

c.width = round(.9*innerWidth,BASE_SCALE);
c.height = round(.9*innerHeight,BASE_SCALE);

let point = {
    x: c.width/2,
    y: c.height/2
}

// i spend 3 hrs of my mortal life squeaking my brain to do this :/

// (it actually was far more than that :\)

let numOdots = Math.floor(Math.sqrt(c.width+c.height));


let tststr = "";
let positions = [];

// the grid turned to be a waste of time

// let imgData = ctx.getImageData(0,0,c.width,c.height);
//let {width,height}=c;
// for(let i=0;i<imgData.data.length/4;i++) {
//     //////////////////////////////////////
//         let total = i;//                || _getxy _getcoords
//         let rem = total % width;//      ||/////////////////////
//         let rem2 = width - rem;//       ||   Get working XY  //
//         let newTotal = total + rem2;//  ||/////////////////////
//         let y = newTotal / width;//     ||
//         let x = rem;//                  ||
//     //////////////////////////////////////
//     let r = imgData.data[i*4+0];
//     let g = imgData.data[i*4+1];
//     let b = imgData.data[i*4+2];
//     let a = imgData.data[i*4+3];
    
//     function set(r,g,b,a){
//         imgData.data[i*4+0] = r;
//         imgData.data[i*4+1] = g;
//         imgData.data[i*4+2] = b;
//         imgData.data[i*4+3] = a;
//     }                                   
//     // set rgba: set(r,g,b,a); get rgba: r,g,b,a; get xy: x,y;
//     if(x%10===0||y%10===0){
//         set(255,0,0,255);
//     }
// }
//end grid's for loop FLAGS: _grid
let exit = 0;
//function restoreCanvas(){ctx.putImageData(imgData,0,0);}restoreCanvas();
function init() {//restoreCanvas();
    loop()} init()
function clearCanvas() {ctx.fillStyle="rgb(68, 203, 230)";ctx.fillRect(0,0,c.width,c.height);}

function loop() {
    if(exit)return;
    clearCanvas();
    putPixels();
    putSpread();
    requestAnimationFrame(loop);
}

function putPixels() {
    positions.forEach(pos=>{
        putPixelInPosition(pos.x,pos.y,pos.t)
    })
}
function putSpread() {
    positions.forEach(pos=>{
        //put spread for each "baked" pixel
        if(tststr.indexOf(`[${pos.x+1},${pos.y}]`)===-1 && pos.t===0){
            appendPositions(pos.x+1,pos.y,1)//right
        }
        if(tststr.indexOf(`[${pos.x-1},${pos.y}]`)===-1 && pos.t===0){
            appendPositions(pos.x-1,pos.y,1)//left
        }
        if(tststr.indexOf(`[${pos.x},${pos.y+1}]`)===-1 && pos.t===0){
            appendPositions(pos.x,pos.y+1,1)//bottom
        }
        if(tststr.indexOf(`[${pos.x},${pos.y-1}]`)===-1 && pos.t===0){
            appendPositions(pos.x,pos.y-1,1)//top
        }
        ////////////////
        if(tststr.indexOf(`[${pos.x+1},${pos.y}]`)===-1 && pos.t===1){
            appendPositions(pos.x+1,pos.y,2)//right
        }
        if(tststr.indexOf(`[${pos.x-1},${pos.y}]`)===-1 && pos.t===1){
            appendPositions(pos.x-1,pos.y,2)//left
        }
        if(tststr.indexOf(`[${pos.x},${pos.y+1}]`)===-1 && pos.t===1){
            appendPositions(pos.x,pos.y+1,2)//bottom
        }
        if(tststr.indexOf(`[${pos.x},${pos.y-1}]`)===-1 && pos.t===1){
            appendPositions(pos.x,pos.y-1,2)//top
        }
        //////////////////////////
        if(tststr.indexOf(`[${pos.x+1},${pos.y}]`)===-1 && pos.t===2){
            appendPositions(pos.x+1,pos.y,3)//right
        }
        if(tststr.indexOf(`[${pos.x-1},${pos.y}]`)===-1 && pos.t===2){
            appendPositions(pos.x-1,pos.y,3)//left
        }
        if(tststr.indexOf(`[${pos.x},${pos.y+1}]`)===-1 && pos.t===2){
            appendPositions(pos.x,pos.y+1,3)//bottom
        }
        if(tststr.indexOf(`[${pos.x},${pos.y-1}]`)===-1 && pos.t===2){
            appendPositions(pos.x,pos.y-1,3)//top
        }
    })
}




c.addEventListener("click", e=>{
    let {offsetX:x,offsetY:y} = e;
    let strX = x.toString();
    let subX = strX.substring(strX.length-1);
    let numX = +subX;
    let strY = y.toString();
    let subY = strY.substring(strY.length-1);
    let numY = +subY;
    // numX/Y
    if(numX<5 && numY<5){//top left
        ctx.fillRect(round(x,BASE_SCALE),round(y,BASE_SCALE),BASE_SCALE,BASE_SCALE)
        appendPositions((round(x,BASE_SCALE)+BASE_SCALE)/BASE_SCALE,(round(y,BASE_SCALE)+BASE_SCALE)/BASE_SCALE,0,1)
    } else if(numX>4 && numY>4) {//bottom right
        ctx.fillRect(round(x,BASE_SCALE)-BASE_SCALE,round(y,BASE_SCALE)-BASE_SCALE,BASE_SCALE,BASE_SCALE)
        appendPositions(round(x,BASE_SCALE)/BASE_SCALE,round(y,BASE_SCALE)/BASE_SCALE,0,1)
    } else if(numX>4 && numY<5){//top right
        ctx.fillRect(round(x,BASE_SCALE)-BASE_SCALE,round(y,BASE_SCALE),BASE_SCALE,BASE_SCALE)
        appendPositions(round(x,BASE_SCALE)/BASE_SCALE,(round(y,BASE_SCALE)+BASE_SCALE)/BASE_SCALE,0,1)
    } else if(numX<5 && numY>4){//bottom left
        ctx.fillRect(round(x,BASE_SCALE),round(y,BASE_SCALE)-BASE_SCALE,BASE_SCALE,BASE_SCALE)
        appendPositions((round(x,BASE_SCALE)+BASE_SCALE)/BASE_SCALE,round(y,BASE_SCALE)/BASE_SCALE,0,1)
    }
});
function appendPositions(x,y,t=0,a) {//append baked positions
    if(a){x--;y--;}
    //if(positions.length>1000)return;
    positions.push({x,y,t});
    tststr=""
    positions.forEach(pos=>{
        tststr+=`[${pos.x},${pos.y}]`
    });
}
function putPixelInPosition(x,y,t) {//display baked position
    if(t===0){
        ctx.fillStyle="rgba(0,75,0)";
    }else if(t===1){
        ctx.fillStyle="rgba(0,80,0)"
    }else if(t===2){
        ctx.fillStyle="rgba(50,50,0)"
    }else if(t===3){
        ctx.fillStyle="rgb(80, 55, 10)"
    }
    ctx.fillRect(x*10,y*10,10,10);
    
    //appendPositions(x,y)
}
function getRnd() {//generate random position (baked)
    let maxX = c.width/BASE_SCALE;
    let maxY = c.height/BASE_SCALE;
    return [Math.floor(Math.random()*maxX),Math.floor(Math.random()*maxY)];
}
for(let i=0;i<numOdots;i++) {
    let pos = getRnd();
    while(positions.includes(pos)) {//prevent duplicate
        pos = getRnd();
    }
    appendPositions.apply(null,getRnd())
}

// c.addEventListener("")

// let total = i;
// let rem = total % width;
// let rem2 = width - rem;
// let newTotal = total + rem2;
// let y = newTotal / width;
// let x = rem;
// let {offsetX:ox,offsetY:oy} = e;

// let midx = c.width/2;
// let midy = c.height/2;
// let n = 20;
// // let exp = (x>midx-n && x<midx+n && y>midy-n && y<midy+n);
// function thedistance(mx,my,x,y){
//     return (mx>x && my>y)?Pol(mx-x,my-y):(mx===x && my>y)?my-y:(mx<x && my>y)?Pol(x-mx,my-y):(mx>x && my===y)?mx-x:(mx===x && my===y)?0:(mx<x && my===y)?x-mx:(mx>x && my<y)?Pol(mx-x,y-my):(mx===x && my<y)?y-my:(mx<x && my<y)?Pol(x-mx,y-my):undefined;
// }


// var x = (i / 4) % this.el.width;
// var y = Math.floor((i / 4) / this.el.width);
