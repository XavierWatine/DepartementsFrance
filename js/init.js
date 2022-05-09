let bgCol;
let clickedCode;
let data;
let depFound = [];
let depLeft = [];

let depToFind;
let r;

let mistakes = 0;

let run = false;

let winingSentence = [
	"C'est gagné bravo chef !",
	"Un gros gg à toi !",
	"Quelle masterclass !",
	"Gros baiseur va !"
	]

$(document).ready(function(){
    
    winingSentence = winingSentence[Math.floor(Math.random()*winingSentence.length)]
    bgCol = "#4AC8E8";
	data = readData();

	updateMap();

	// timer();
});

$(document).on('click', function() {
	if(!run) {
		for (let i=0; i<data.length; i++) {
			depLeft.push(data[i]["N°"]);
		}
		r = Math.floor(Math.random()*depLeft.length);
		// console.log(r);
		// r = 54;
		depToFind = depLeft[r];
		$("#depToFind").text(data[r]["N°"].split('-')[1] + " - " + data[r]["Département"]);
		run = true;
		timer();
		updateMap();
		$("#help").remove();
	}
})


function readData() {
	let input;
	$.ajaxSetup({async: false}); // To make sure that we wait til we got the data
	$.get('data/departementsFr.csv', function(text) {
		input = text;
	},'text');
	
	let data = input.split('\n');
	let header;


	for (let i=0; i<data.length; i++) {
		if (i==0) {
			header = data[i].split(';');
		} else {
			data[i-1] = data[i].split(';');
		}
	}

	let dataDict = [];
	for (let i=0; i<data.length-1; i++) {
		dataDict.push({});
		for (let j=0; j<header.length-1; j++) {
			dataDict[i][header[j]] = data[i][j];
			if (j==0) {
				dataDict[i][header[j]] = 'FR-' + dataDict[i][header[j]];
			}
		}
	}
	return dataDict;
}

