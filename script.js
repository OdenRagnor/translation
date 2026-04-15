// Wait for the page to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // Get the elements from the HTML file
    const translateButton = document.getElementById('translateButton');
    const inputText = document.getElementById('inputText');
    const resultDiv = document.getElementById('result');

    // Add a click event listener to the button
    translateButton.addEventListener('click', () => {
        const textToTranslate = inputText.value;
        resultDiv.innerText = "Translating...";

        // This is the core of the communication.
        // We use the 'fetch' API to send a request to the server.
        // This assumes your LibreTranslate server is running on http://localhost:5000
        fetch('http://localhost:5000/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: textToTranslate,
                source: 'en', // Translate from English
                target: 'es', // Translate to Spanish
                format: 'text'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Convert the response to JSON
        })
        .then(data => {
            // Display the translated text from the response
            resultDiv.innerText = data.translatedText;
        })
        .catch(error => {
            // If something goes wrong, display an error message
            console.error('Error:', error);
            resultDiv.innerText = `Error: Could not connect to the translation server. Is it running? Details: ${error.message}`;
        });
    });
});
