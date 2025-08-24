document.addEventListener('DOMContentLoaded', function () {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';

    // Function to handle button clicks and keyboard input
    function handleInput(value) {
        if (value === '=') {
            // Calculate the result if the expression is valid
            try {
                // Replace display symbols with evaluatable operators
                let expression = currentInput.replace(/×/g, '*').replace(/÷/g, '/');
                // Use Function constructor for safer evaluation than eval()
                let result = new Function('return ' + expression)();
                currentInput = String(result);
                screen.value = currentInput;
            } catch (error) {
                screen.value = 'Error';
                currentInput = '';
            }
        } else if (value === 'AC') {
            // Clear the screen
            currentInput = '';
            screen.value = '';
        } else if (value === 'DEL') {
            // Delete the last character
            currentInput = currentInput.slice(0, -1);
            screen.value = currentInput;
        } else {
            // Append the value to the current input
            currentInput += value;
            screen.value = currentInput;
        }
    }

    // Add click event listeners to all buttons
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.dataset.value || e.target.innerText;
            handleInput(value);
        });
    });

    // Bonus: Add keyboard support
    document.addEventListener('keydown', (e) => {
        const key = e.key;
        
        if (/[0-9]/.test(key)) {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleInput(key === '*' ? '×' : key === '/' ? '÷' : key);
        } else if (key === '.') {
            handleInput('.');
        } else if (key === 'Enter' || key === '=') {
            e.preventDefault(); // Prevent form submission
            handleInput('=');
        } else if (key === 'Backspace') {
            handleInput('DEL');
        } else if (key === 'Escape' || key.toLowerCase() === 'c') {
            handleInput('AC');
        }
    });
});