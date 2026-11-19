module.exports = async function (request, response) {
    // Read the coordinates sent by index.js.
    const foilLocation = request.query.foilLocation;

    // Only allow the locations supported by the form.
    const allowedLocations = [
        '47.6797,-122.3256',
        '47.6556,-122.2767',
        '47.7175,-122.3966'
    ];

    if (!allowedLocations.includes(foilLocation)) {
        return response.status(400).json({ error: 'Invalid location' });
    }

    const apiKey = process.env.WEATHERSTACK_API_KEY;
    if (!apiKey) {
        console.error('Weatherstack API key is not configured');
        return response.status(500).json({ error: 'Weather service is not configured' });
    }

    // URL handles encoding the key and coordinates for us.
    const url = new URL('https://api.weatherstack.com/current');
    url.searchParams.set('access_key', apiKey);
    url.searchParams.set('query', foilLocation);
    url.searchParams.set('units', 'm');

    try {
        const weatherResponse = await fetch(url);
        const weatherData = await weatherResponse.json();

        // Weatherstack can report an error in the JSON itself.
        if (!weatherResponse.ok || weatherData.error || !weatherData.current) {
            console.error('Weatherstack returned an unsuccessful response');
            return response.status(502).json({ error: 'Weather service failed' });
        }

        return response.status(200).json({
            current: {
                wind_speed: weatherData.current.wind_speed,
                temperature: weatherData.current.temperature
            }
        });
    } catch (error) {
        // Don't log the URL: it contains the API key.
        console.error('Weatherstack request failed');
        return response.status(502).json({ error: 'Weather service unavailable' });
    }
};