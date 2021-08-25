var flip = true;

document.addEventListener('keydown', (event) => {
	var txtbox = document.getElementById('textbox');
	if (event.key == 'Control') {
		let content = txtbox.value;
		var lines = content.split("\n");

		for (var i = 0; i < lines.length; i++) {
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
