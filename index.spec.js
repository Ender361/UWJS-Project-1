// Jasmine unit tests for index.js
describe('getInputs', function() {
		let testDom;
    
		beforeEach(function() {
			// Create a testDom container so the tests can run without wiping out jasmine html
			testDom = document.createElement('div');
			testDom.id = 'testDom';
			document.body.appendChild(testDom);
        
			// Create dom elements to test the 3 locations and 2 of the skill levels
			testDom.innerHTML = `
				<select id="select-where">
					<option value="green-lake">Green Lake</option>
					<option value="lake-washington">Lake Washington</option>
					<option value="puget-sound">Puget Sound</option>
				</select>
				<select id="select-exp">
					<option value="beginner">Beginner</option>
					<option value="intermediate">Intermediate</option>
				</select>
			`;
		});
    
		afterEach(function() {
			// Clean up the testDom
			document.body.removeChild(testDom);
		});

	it('returns correct array for green-lake', function() {
		document.getElementById('select-where').value = 'green-lake';
		document.getElementById('select-exp').value = 'beginner';
		const result = getInputs();
		expect(result).toEqual(['green-lake', 'beginner', '47.6797,-122.3256']);
	});

	it('returns correct array for lake-washington', function() {
		document.getElementById('select-where').value = 'lake-washington';
		document.getElementById('select-exp').value = 'intermediate';
		const result = getInputs();
		expect(result).toEqual(['lake-washington', 'intermediate', '47.6556,-122.2767']);
	});

	it('returns correct array for puget-sound', function() {
		document.getElementById('select-where').value = 'puget-sound';
		document.getElementById('select-exp').value = 'beginner';
		const result = getInputs();
		expect(result).toEqual(['puget-sound', 'beginner', '47.7175,-122.3966']);
	});
});

describe('animateFoiler', function() {
	let testDom;
    
	beforeEach(function() {
		// Create a testDom container
		testDom = document.createElement('div');
		testDom.id = 'testDom';
		document.body.appendChild(testDom);
        
		// Create dom element for the wingfoilImage
		testDom.innerHTML = `
			<img src="foilerStickFigure2.jpg" alt="stick figure wing foiler" id="wingfoil-img"></img>
		`
	})
    
	afterEach(function() {
		// Clean up the testDom
		if (testDom && testDom.parentNode) {
			document.body.removeChild(testDom);
		}
	})
    
    it('does nothing if the image does not exist', function() {
        // Removing the image
        document.getElementById('wingfoil-img').remove();
        // Expect function to not throw an error
        expect(function() { animateFoiler(); }).not.toThrow();
    })
});
