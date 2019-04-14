document.body.backgroundColor = "#000000";
//1 2 4 5 10 20 25 50
var numPixW = 25;
var numPixH = 20;


var p1 = new Snake(0,0,[1,0]);
p1.die();

var p2 = new Snake(numPixW-1,numPixH-1,[-1,0]);
p2.die();

var candy = [Math.floor(Math.random() * numPixW), Math.floor(Math.random() * numPixH)];


//this is for visuals
//I made the buttons here
//btns is a matrix (20 x 20) that contains all of the buttons
//x is the first index, y is the second index of btns
for(var i = 0; i < numPixW; i ++){
    for(var j = 0; j < numPixH; j ++){
        var o = document.createElement("button");
        o.style.position = "fixed";
        o.style.left = (i * (100 / numPixW)) + "%";
        o.style.top = (j * (100 / numPixH)) + "%";
        o.style.width = (100 / numPixW) + "%";
        o.style.height = (100 / numPixH) + "%";
        o.style.backgroundColor = "#000000";
        o.style.outlineColor = "#000000";
        o.style.borderColor = "#000000";
        o.style.outlineWidth = "0px";
        o.style.borderWidth = "0px";
        o.id = i + "," + j;
        document.body.appendChild(o);
    }
}


function SnakeNode(){
    this.x = 0;
    this.y = 0;
    this.next = null;
    this.prev = null;
    this.equals = function(sn){
        return sn.x == this.x && sn.y == this.y;
    }
}



function Snake(x,y,dir){
    this.head = new SnakeNode();
    this.tail = this.head;
    this.points = 0;
    this.defaultDir = dir;
    this.dirVector = dir;
    this.head.x = x;
    this.head.y = y;
    this.defaultCoords = [x,y];
    this.addTail = function(){
        this.tail.next = new SnakeNode();
        this.tail.next.prev = this.tail;
        this.tail.next.x = this.tail.x;
        this.tail.next.y = this.tail.y;
        this.tail = this.tail.next;
        this.points++;
    }

    //reset points
    //reset this.head and this.tail
    //reset the coords of this.head
    //add tail twice to make it three long
    this.die = function(){
        this.points = 0;
        this.head = new SnakeNode();
        this.tail = this.head;
        this.head.x = this.defaultCoords[0];
        this.head.y = this.defaultCoords[1];
        this.dirVector = this.defaultDir;
        this.addTail();
        this.addTail();
    }
}




//displays the board
function display(){
    //set all pixels to be white
    for(var i = 0; i < numPixW; i ++){
        for(var j = 0; j < numPixH; j ++){
            document.getElementById(i + "," + j).style.backgroundColor = "#000000";
            document.getElementById(i + "," + j).style.borderColor = "#000000";
        }
    }
    //set the candy to be blue
    document.getElementById(candy[0] + "," + candy[1]).style.backgroundColor = "#0000FF";
    document.getElementById(candy[0] + "," + candy[1]).style.borderColor = "#0000FF";
    var t = p1.head;
    while(t != null){
        document.getElementById(t.x + "," + t.y).style.backgroundColor = "#DF0000";
        document.getElementById(t.x + "," + t.y).style.borderColor = "#FF0000";
        t = t.next;
    }
    var t = p2.head;
    while(t != null){
        document.getElementById(t.x + "," + t.y).style.backgroundColor = "#00DF00";
        document.getElementById(t.x + "," + t.y).style.borderColor = "#00FF00";
        t = t.next;
    }
}



document.onkeydown = function (e) {
    e = e || window.event;
    console.log(e.keyCode);// use e.keyCode
    switch(e.keyCode){
        case 38:
            p2.dirVector = [0,-1];
            break;
        case 37:
            p2.dirVector = [-1,0];
            break;
        case 40:
            p2.dirVector = [0,1];
            break;
        case 39:
            p2.dirVector = [1,0];
            break;
        default:
            break;
    }
};
document.onkeypress = function (e) {
    e = e || window.event;
    console.log(e.keyCode);// use e.keyCode
    switch(e.keyCode){
        case 119:
            //w was pressed
            p1.dirVector = [0,-1];
            break;
        case 97:
            //a was pressed
            p1.dirVector = [-1,0];
            break;
        case 115:
            //s was pressed
            p1.dirVector = [0,1];
            break;
        case 100:
            //d was pressed
            p1.dirVector = [1,0];
            break;
        default:
            break;
    }
};
var interval2;
var interval = setInterval(function(){
    //move the snake by the dirVector

    
    //move the head by the dirVector
    if(p1.head.equals(p2.head)){
        if(Math.random() > 0.5){
            p1.die();
        } else {
            p2.die();
        }
    }
    var z = new SnakeNode();
    var zz = z;
    var t = p1.head;
    while(t != null){
        zz.x = t.x;
        zz.y = t.y;
        
        if(t.next != null){
            zz.next = new SnakeNode();
            zz.next.prev = zz;
            zz = zz.next;
        }
        if(t.equals(p2.head)){
            p2.die();
        }
        t = t.next;
    }
    //move each part in the direction of the thing before it
    z = z.next;
    t = p1.head.next;
    while(t != null){//t.x != head.x && t.y != head.y){
        //move t to be in the direction that t.prev is relative to t
        t.x=z.prev.x;
        t.y=z.prev.y;
        if(t.x == (p1.head.x + p1.dirVector[0]) && t.y == (p1.head.y + p1.dirVector[1])){
            p1.die();
        }
        t = t.next;
        z = z.next;
    }

    z = new SnakeNode();
    zz = z;
    t = p2.head;
    while(t != null){
        zz.x = t.x;
        zz.y = t.y;
        
        if(t.next != null){
            zz.next = new SnakeNode();
            zz.next.prev = zz;
            zz = zz.next;
        }
        if(t.equals(p1.head)){
            p1.die();
        }
        t = t.next;
    }
    //move each part in the direction of the thing before it
    z = z.next;
    t = p2.head.next;
    while(t != null){//t.x != head.x && t.y != head.y){
        //move t to be in the direction that t.prev is relative to t
        t.x=z.prev.x;
        t.y=z.prev.y;
        if(t.x == (p2.head.x + p2.dirVector[0]) && t.y == (p2.head.y + p2.dirVector[1])){
            p2.die();
        }
        t = t.next;
        z = z.next;
    }


    var audio = new Audio("mario soundtracks (serious) (copryrighted)/pacman_chomp.wav");
    audio.play();
    p1.head.x += p1.dirVector[0];
    p1.head.y += p1.dirVector[1];

    p2.head.x += p2.dirVector[0];
    p2.head.y += p2.dirVector[1];

    if(p1.head.x == candy[0] && p1.head.y == candy[1]){
        p1.addTail();
        candy = [Math.floor(Math.random() * numPixW), Math.floor(Math.random() * numPixH)];
        var audio = new Audio("mario soundtracks (serious) (copryrighted)/Air Horn-SoundBible.com-964603082.mp3");
        audio.play();
    }
    
    if(p2.head.x == candy[0] && p2.head.y == candy[1]){
        p2.addTail();
        candy = [Math.floor(Math.random() * numPixW), Math.floor(Math.random() * numPixH)];
        var audio = new Audio("mario soundtracks (serious) (copryrighted)/Air Horn-SoundBible.com-964603082.mp3");
        audio.play();
    }

    //so if node1 is to the left of node2 then node2 should move left
    if(p1.head.x < 0){
        p1.head.x = numPixW - 1;
    }
    if(p2.head.x < 0){
        p2.head.x = numPixW - 1;
    }
    if(p1.head.y < 0){
        p1.head.y = numPixH - 1;
    }
    if(p2.head.y < 0){
        p2.head.y = numPixH - 1;
    }
    if(p1.head.x == numPixW){
        p1.head.x = 0;
    }
    if(p2.head.x == numPixW){
        p2.head.x = 0;
    }
    if(p1.head.y == numPixH){
        p1.head.y = 0;
    }
    if(p2.head.y == numPixH){
        p2.head.y = 0;
    }
    // if(p1.head.x < 0 || p1.head.y >= numPixH || p1.head.x >= numPixW || p1.head.y < 0){
    //     p1.die();
    // }
    // if(p2.head.x < 0 || p2.head.y >= numPixH || p2.head.x >= numPixW || p2.head.y < 0){
    //     p2.die();
    // }
    //display the board
    display();
},100);


