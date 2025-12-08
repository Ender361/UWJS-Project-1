


// Function that grabs user input and returns an array of selections
const getInputs = () => {
    let inputsArray = [];
    inputsArray.push(document.getElementById('select-where').value)
    inputsArray.push(document.getElementById('select-exp').value)
    return inputsArray;
}

// Function to do something when clicked
const submitFunction = (e) => {
    e.preventDefault();
    let inputsArray = getInputs();
    console.log(inputsArray);
}

// This grabs the submit button, puts it in a variable and then adds a 'click' eventlistener
const submitButton = document.getElementById('submit-all');
submitButton.addEventListener('click', submitFunction);

