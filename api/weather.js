const apiUrlNoQuery = 'https://api.weatherstack.com/current?access_key=(API KEY HERE)&query=';

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