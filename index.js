// Define global variables
const inputForm = document.getElementById('input-form');
const wingfoilImage = document.getElementById('wingfoil-img');
const apiUrlNoQuery = 'https://api.weatherstack.com/current?access_key=(API KEY HERE)&query=';
const options = {
    method: "GET",
};

// Function that grabs user input and returns an array of selections
const getInputs = () => {
    let inputsArray = [];
    inputsArray.push(document.getElementById('select-where').value)
    inputsArray.push(document.getElementById('select-exp').value)
    if (inputsArray[0] === 'green-lake') {
        inputsArray.push('47.6797,-122.3256')
    } else if (inputsArray[0] === 'lake-washington') {
        inputsArray.push('47.6556,-122.2767')
    } else if (inputsArray[0] === 'puget-sound') {
        inputsArray.push('47.7175,-122.3966')
    }
    return inputsArray;
}

// Function to do something when the form is submitted
const submitFunction = async (e) => {
    let inputsArray = getInputs();
    e.preventDefault();

    // API Call
    let result;
    try {
        const response = await fetch(apiUrlNoQuery + `${inputsArray[2]}`, options)
        result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

    // Remove the form and img
    inputForm.remove();
    wingfoilImage.remove();

    // Create new dom screen to show API results
    const apiResults = document.createElement('h1')
    // let windSpeed = result.current.wind_speed;
    let windSpeed = 5;
    console.log(windSpeed);
    // let airTemp = `${result.current.temperature} degrees celsius`;
    let airTemp = 10;
    console.log(airTemp);

    // Create textcontent based on the user input and then add to page
    apiResults.textContent = `The windspeed at ${inputsArray[0]} is ${windSpeed}mph, the airtemp is ${airTemp}.`
    
    document.body.appendChild(apiResults);

    // Add a piece of advice to foil or not based on skill level and windspeed
    const foilRec = document.createElement('h1');
    if (windSpeed < 10) {
        foilRec.textContent = `Mild winds, have fun and bring a big wing!`
    } else {
        foilRec.textContent = `High winds, make sure you know what you're doing!`
    }

    document.body.appendChild(foilRec);

    // Add back the wing foiler
    document.body.appendChild(wingfoilImage);

    // Styling
    apiResults.classList.add('bodyEl');
    foilRec.classList.add('bodyEl');


    console.log(inputsArray);
}

// Add event listener to the form's submit event which runs 
inputForm.addEventListener('submit', submitFunction);

// Variables to use in animate function
let position = 0, direction = 1;

// Function to move the wingfoil image back and forth across the screen
const animateFoiler = () => {
    if (!wingfoilImage) return;

    // Uses the 1 value of direction to indicate a direction change
    position += direction;
    // Reverse direction if hitting bounds (either 0 or max window width)
    if (position >= window.innerWidth - wingfoilImage.offsetWidth || position <= 0) {
        direction *= -1;
    }
    // Style changes that make the image move
    wingfoilImage.style.position = 'absolute';
    wingfoilImage.style.left = position + 'px';
    requestAnimationFrame(animateFoiler);
}

if (wingfoilImage) animateFoiler();