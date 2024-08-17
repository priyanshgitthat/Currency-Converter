async function convertCurrency() {
    // Clear previous results and errors
    document.getElementById('result').innerText = '';
    document.getElementById('error').innerText = '';
    
    // Get input values
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    // Validate input
    if (!amount || amount <= 0) {
        document.getElementById('error').innerText = 'Please enter a valid amount.';
        return;
    }

    // Show loading indicator
    document.getElementById('loading').style.display = 'block';

    try {
        // Fetch exchange rates from the API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        
        // Check if response is okay
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        // Check if the target currency is available
        if (!data.rates[toCurrency]) {
            throw new Error('Currency not available for conversion.');
        }

        // Calculate the conversion
        const rate = data.rates[toCurrency];
        const convertedAmount = amount * rate;

        // Display the result
        document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

    } catch (error) {
        // Display error message
        document.getElementById('error').innerText = `Error: ${error.message}`;
    } finally {
        // Hide loading indicator
        document.getElementById('loading').style.display = 'none';
    }
}
