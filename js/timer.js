let ms = 0;
let sec = 0;
let min = 0;
let t;

let timerElement = $("#timer")[0];

let startTime;

function tick(){

    let endTime = new Date($.now());
    
    let diffMs = endTime - startTime;

    ms += diffMs;
    if (ms>=1000) {
        ms = ms-1000;
        sec++;
        if (sec >= 60) {
            sec = sec-60;
            min++;
        }
    }
    
}
function add() {
    if(run) {
        tick();
        let smallMs = parseInt(ms/10);
        timerElement.textContent = (min > 9 ? min : "0" + min) 
            	 + ":" + (sec > 9 ? sec : "0" + sec)
           		 + ":" + (smallMs > 9 ? smallMs : "0" + smallMs);
        timer();
    }
}
function timer() {
    startTime = new Date($.now())
    t = setTimeout(add, 10);
}

// timer();

// stop.onclick = function() {
//     clearTimeout(t);
// }
// reset.onclick = function() {
//     timerElement.textContent = "00:00:00";
//     seconds = 0; minutes = 0; hours = 0;
// }