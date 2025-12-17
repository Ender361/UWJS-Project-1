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

// Async function to call api and update dom with windspeed and air temp
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
    let windSpeed = result.current.wind_speed;
    // let windSpeed = 19; (this is for testing with no API)
    console.log(windSpeed);
    let airTemp = `${result.current.temperature} degrees celsius`;
    // let airTemp = 10; (this is for testing with no API)
    console.log(airTemp);

    // Convert location value to display format
    let locationDisplay = inputsArray[0].split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    // Create textcontent based on the user input and then add to page
    apiResults.textContent = `The current windspeed at ${locationDisplay} is ${windSpeed}mph, the air temperature is ${airTemp}.`
    
    document.body.appendChild(apiResults);

    // Add a piece of advice to foil or not based on skill level and windspeed
    const foilRec = document.createElement('h1');
    if (windSpeed < 10 && inputsArray[1] === 'beginner') {
        foilRec.textContent = `Mild winds, always wear a life jacket and helmet, and have fun out there!`
    } else if (windSpeed < 10 && inputsArray[1] === 'intermediate'){
        foilRec.textContent = `Mild winds, go for a 6 meter or larger wing if you got one!`
    } else if (windSpeed < 10 && inputsArray[1] === 'advanced') {
        foilRec.textContent = `Low winds, make sure you got a big wing or even better, someone to tow you!`
    } else if (windSpeed >= 10 && inputsArray[1] === 'beginner') {
        foilRec.textContent = `High winds, unfortunately not the best day to learn.`
    } else if (windSpeed >= 10 && inputsArray[1] === 'intermediate') {
        foilRec.textContent = `High winds, go for a smaller (under 6 meter) wing if you got one!`
    } else if (windSpeed >= 10 && inputsArray[1] === 'advanced') {
        foilRec.textContent = `Oh man, go shred that!!`
    };

    document.body.appendChild(foilRec);

    // Add back the wing foiler
    document.body.appendChild(wingfoilImage);

    // Styling
    apiResults.classList.add('bodyEl');
    foilRec.classList.add('bodyEl');


    console.log(inputsArray);
}

// Add event listener to the form's submit event which runs 
if (inputForm) {
    inputForm.addEventListener('submit', submitFunction);
}

// Variables to use in animate function
let position = 0, direction = 1;

// Function to move the wingfoil image back and forth across the screen
const animateFoiler = () => {
    if (!wingfoilImage) return;

    // Increment of decrement the x position based on if direction is currently positive or negative
    position += direction * 2;
    // Reverse direction and flip image if hitting bounds (either 0 or max window width)
    if (position >= window.innerWidth - wingfoilImage.offsetWidth || position <= 0) {
        direction *= -1;
        wingfoilImage.classList.toggle('flipped');
    }
    // Style changes that make the image move
    wingfoilImage.style.position = 'absolute';
    wingfoilImage.style.left = position + 'px';
    requestAnimationFrame(animateFoiler);
}

if (wingfoilImage) animateFoiler();