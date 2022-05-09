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
	console.log(e.which);
    if(e.which == 116) {   
    	blink(depToFind, "blue");
    	mistakes += 5;
    	$("#mistakes").text("Erreurs : " + mistakes);
    }
});

function getClickedCode(e, code) {
	timer();
	for (let i=0; i<data.length; i++) {
		if(data[i]["N°"] == code) {


			if(code == depToFind) {
				blink(code, 'green');
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
					$("#depToFind").text("C'est gagné bravo chef !");
					run = false;
				}
				
				setTimeout(function(){
					$('#map').remove();
					$('body').append('<div id="map"></div>');  
					updateMap();
				}, 150);
			} else {

				blink(code, 'red');
				mistakes++;
				$("#mistakes").text("Erreurs : " + mistakes);
			}
			break;
		}
	}
}

function noHover(e, el, code) {
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
		el.html("<center><b>" + code.split('-')[1] + " - " + el.html() + "</b> <br/>" + data[index]["Chef-lieu/préfecture"] + "</center>");
	}
	
	// if
}




function updateMap() {

	$('#map').vectorMap({
		map: 'fr_merc',
		backgroundColor: '#4AC8E8',
		onRegionClick: getClickedCode,
		onRegionTipShow: noHover,
		labels: {
			regions: {
		        render: function(code) {
		        	
					console.log(depLeft.length);
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



	let allPath = $("path");
	for (let i=0; i<allPath.length; i++) {
		if (['FR-GP', 'FR-MQ', 'FR-GF', 'FR-YT', 'FR-RE'].includes(allPath[i].dataset.code)) {
			allPath[i].remove();
		}
	}
}


