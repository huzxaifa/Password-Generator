// Add an event listener to the document
document.addEventListener('input', function(event) {
    // Check if the target element is an input field
    if (event.target.tagName === 'INPUT') {
        // Copy the input field's value
        const inputValue = event.target.value;
        
        // Print the input value in the console log
        console.log(inputValue);
        
    }
});
console.log('Content script loaded');