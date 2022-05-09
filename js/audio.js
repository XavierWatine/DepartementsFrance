let autioPath = "mp3/"

// let successSounds = [
// 	new Audio(autioPath + 'success/1.mp3'),
// 	new Audio(autioPath + 'success/2.mp3'),
// 	new Audio(autioPath + 'success/3.mp3'),
// 	new Audio(autioPath + 'success/gg a tous.mp3'),
// ];

// let loseSounds = [
// 	new Audio(autioPath + 'lose/goat.mp3'),
// 	new Audio(autioPath + 'lose/concentres toi.mp3')
// ];

let successSounds;
let loseSounds;
let allSounds;

function sound(state) {
	

	if(successSounds != null && loseSounds != null) {
		allSounds = [...successSounds, ...loseSounds];
	}

	if (allSounds != null) {
		for (let i=0; i<allSounds.length; i++) {
			if (!allSounds[i].paused) {
				allSounds[i].pause();
			}
			
		}
	}
	
	successSounds = [
		new Audio(autioPath + 'success/1.mp3'),
		new Audio(autioPath + 'success/2.mp3'),
		new Audio(autioPath + 'success/3.mp3'),
		new Audio(autioPath + 'success/gg a tous.mp3'),
	];

	loseSounds = [
		new Audio(autioPath + 'lose/goat.mp3'),
		new Audio(autioPath + 'lose/concentres toi.mp3'),
		new Audio(autioPath + 'lose/ADCDTFP.mp3')
	];


	if (state=="success") {

		if (badStreak < 11) {
			let i = Math.min(streak, 2);
			successSounds[i].play();
		} else {
			successSounds[3].play();
		}

		
		streak++;
		badStreak = 0;

	} else if(state=="lose") {
		let happening = [10, 15];
		if (!happening.includes(badStreak)) {
			loseSounds[0].play();
		} else if (badStreak == happening[0]) {
			loseSounds[1].play();
		} else if (badStreak == happening[1]) {
			loseSounds[2].play();
		}

		badStreak++;
		streak = 0;
	}
}