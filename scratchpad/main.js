var flip = true;

document.addEventListener('keydown', (event) => {
	var txtbox = document.getElementById('textbox');
	if (event.key == 'Control') {
		let content = txtbox.value;
		var lines = content.split("\n");

		for (var i = 0; i < lines.length; i++) {
			// Dice
			var dice_seqs = lines[i].match(/\d+d\d+/gm);
			if (dice_seqs != null) {
				for (var j = 0; j < dice_seqs.length; j++) {
					var dice = dice_seqs[j].split("d");
					var total = 0;
					for (var k = 0; k < parseInt(dice[0]); k++) {
						total += Math.floor(Math.random() * parseInt(dice[1])) + 1;
					}
					var match = lines[i].indexOf(dice_seqs[j]);
					lines[i] = lines[i].replace(dice_seqs, total);
				}
			}

			// Calculations
			var calcs = lines[i].match(/(?![\s])[0-9+\-*\/. %()]+/gm);
			if (calcs == null) continue;
			for (var j = 0; j < calcs.length; j++) {
				if (calcs[j].length >= 3) {
					try {var evaluated = eval(calcs[j]);} catch (error) {continue;}

					var match = lines[i].indexOf(calcs[j]);
					lines[i] = lines[i].replace(calcs[j], evaluated);
				}
			}
		}

		var cursor = txtbox.selectionEnd;
		txtbox.value = lines.join("\n");
		txtbox.selectionEnd = cursor;
	}
	if (event.key == 'Tab') {
		var dayTrack = document.getElementById('dayTrack');

		if (flip) {
			txtbox.style.display = 'none';
			dayTrack.style.display = 'block';
		} else {
			txtbox.style.display = 'block';
			dayTrack.style.display = 'none';
		}

		flip = !flip;
	}
});
