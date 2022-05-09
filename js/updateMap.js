function blink(code, col) {
	let allPath = $("path")
	let thePath = allPath[0];
	for (let i=0; i<allPath.length; i++) {
		if (allPath[i].dataset.code == code) {
			thePath = allPath[i];
			break;
		}
	}

	thePath.setAttribute('fill', col);
	setTimeout(function(){
		thePath.setAttribute('fill', 'white');
	}, 150);
}

$(document).on('keypress',function(e) {
    if(e.which == 116) { // t key
    	blink(depToFind, "blue");
    	mistakes += 5;
    	$("#mistakes").text("Erreurs : " + mistakes);
    } else if (e.which == 100) { // d key
    	bgCol = "#000";
    	$("body").css('background-color', bgCol);
    	$("#map")[0].children[0].attributes.style.value = "background-color: " + bgCol;
    }
});

function getClickedCode(e, code) {
	timer();

	if (!depFound.includes(code)) {
		for (let i=0; i<data.length; i++) {
		if(data[i]["N°"] == code) {
			if(code == depToFind) {
				blink(code, 'green');
				sound("success");
				depFound.push(depLeft.splice(r, 1)[0]);
				r = Math.floor(Math.random()*depLeft.length);
				depToFind = depLeft[r];
				let index;
				for(let k=0; k<data.length; k++) {
					if(data[k]['N°'] == depToFind) {
						index = k;
						break;
					}
				}
				if (index != null) {
					$("#depToFind").text(data[index]["N°"].split('-')[1] + " - " + data[index]["Département"]);
				} else {
					$("#depToFind").text(winingSentence);
					run = false;
				}
				
				setTimeout(function(){ 
					updateMap();
				}, 150);
			} else {

				blink(code, 'red');
				sound("lose");
				mistakes++;
				$("#mistakes").text("Erreurs : " + mistakes);


			}
			break;
		}
	}
	}

	
}

function hover(e, el, code) {
	if (!depFound.includes(code)) {
		el.html('?');
	} else {
		let index;
		for(let k=0; k<data.length; k++) {
			if(data[k]['N°'] == code) {
				index = k;
				break;
			}
		}
		let blason = new Image(25, 25);
		blason.src = "src/images/" + data[index]["N°"].split('-')[1] + ".png";
		el.html("<b>" + code.split('-')[1] + " - " + el.html() + "</b> <br/>" + data[index]["Chef-lieu/préfecture"] + "<br/>");

		el.append(blason);
		el.html("<center>" + el.html() + "</center>")
	}
	
	if (el[0].style.left=="" || el.html() == '?') {
		el[0].remove();
	} else {
		$("body").append(el);
	}
	
}




function updateMap() {
	$('#map').remove();
	$('#mapWrapper').append('<div id="map"></div>');
	$(".jvectormap-tip").remove();
	$('#map').vectorMap({
		map: 'fr_merc',
		backgroundColor: bgCol,
		onRegionClick: getClickedCode,
		onRegionTipShow: hover,
		labels: {
			regions: {
		        render: function(code) {
		        	
					let doNotShow = [...depLeft];
					doNotShow.push('FR-GP', 'FR-MQ', 'FR-GF', 'FR-YT', 'FR-RE');
					if (doNotShow.indexOf(code) === -1) {
						return code.split('-')[1];
					}
		        },offsets: function(code) {
					return {
						'54': [-10, 30],
						'33': [0, 20],
						'56': [5, -5],
						'29': [15, 0],
						'59': [20, 30],
						'13': [0, -5],
						'42': [-7, 10],
						'69': [-5, 10],
						'22': [0, 13],
						'30': [15, 0],
						'31': [12, -15],
						'41': [1, 13],
						'80': [0, 10],
						'62': [0, 11],
						'08': [-2, 13],
						'74': [2, 3],
						'73': [4, 5],
						'82': [-5, 7],
						'89': [0, 7],
						'92': [2, 5],
						'75': [0, 1],
						'93': [3, 0],
						'57': [-5, 10],
						'66': [3, 5],
						'07': [0, 15],
						'65': [0, 15],
						'40': [-7, 8],
						'38': [0, 5],
						'26': [-2, 11],
						'04': [0, 13],
						'84': [0, 8],
						'48': [0, 7],
						'27': [-2, 8],
						'35': [3, 7],
						'85': [14, 7],
						'91': [0, 3],
						'02': [0, -15],
						'63': [0, 10],
						'21': [0, 12],
						'87': [-3, 15]
						}[code.split('-')[1]];
					} 
		    }
		},
		regionStyle: {

		}

	});


	
	$(".jvectormap-container>div").remove();

	let allPath = $("path");
	for (let i=0; i<allPath.length; i++) {
		if (['FR-GP', 'FR-MQ', 'FR-GF', 'FR-YT', 'FR-RE'].includes(allPath[i].dataset.code)) {
			allPath[i].remove();
		}
	}
}


