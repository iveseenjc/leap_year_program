/*
	DETAILS ABOUT THE PROGRAM:
	1. Improvements in functionality over Version 1 or Version 2
		- Rather than using a simple "if" statement, we made the leap check into a function that returns a boolean,
		  to promote reusability and add more checks to prevent mishaps while coding.
		- The code is now designed for it to become a functioning web page, rather than prompts and a blank page, which
		  provides us more interactivity from the user and an organized output for their end.

	2. Instructions on how to use the Leap Year Program and its advantages compared to Version 1 or Version 2.
		a. Provide years between the years 1650 and 4909 as inputs into the given fields.
		b. Once inputs are provided, just click the "Calculate" button.
		c. A new window element will now appear, listing all the leap years in between the 2 provided years

		Advantages: Rather than using prompts - compared to V1 and V2 - we turned it into a fully functioning web page, 
		providing more interactivity and visual elements that further improves of the leap year check.
*/


// Query all major elements for caching
const startingYearInput = document.querySelector('input#starting-year');
const endingYearInput = document.querySelector('input#ending-year');
const calculateButton = document.querySelector('button.calculate-button');
const resultWindow = document.querySelector('.results-window');

// Hide the "Result Window" when the website first starts
resultWindow.style.visibility = 'hidden';

/* 
	LEAP YEAR CHECK: Determines if the given year is a leap year or not. 
	Any value that is not of type "Number" will result in an error.

 	Parameters: Number: yearInput
	Returns: boolean
*/
const isLeapYear = (yearInput) => {
	// Checks if the year inputed is type of Number
	if (isNaN(yearInput)) {
		// Attempts to parse into an integer if valid, otherwise Nan
		yearInput = parseInt(yearInput);

		// Checks again if input is Nan, which will proceed to raise an error!
		if (isNaN(yearInput)) {
			throw new Error(`The year inputed (${yearInput}) is not a valid number!`);
		}
	}

	// If all checks are passed, the function will return a boolean value, whether the year is a leap year or not.
	return (yearInput % 4 === 0 && yearInput % 100 !== 0) || yearInput % 400 === 0;
};

/* 
	Returns an array of type "Number", representing years that are leap years.
	
 	Parameters: None
	Returns: Number[] (Array)
*/
const getLeapYears = () => {
	// Gets the user's input on both input fileds, and parses them into integers.
	const startingYear = parseInt(startingYearInput.value);
	const endingYear = parseInt(endingYearInput.value);

	// Initializes the array to be ready for appending / pushing values.
	const leapYears = [];

	// Runs a loop starting from the user's starting year (incluzive) and ending once the loop reaches the ending year (inclusive).
	for (let year = startingYear; year <= endingYear; year++) {

		// Checks if the current year of the itteration is a leap year
		if (isLeapYear(year)) {
			// If the condition is true, append / push the current year into the array, otherwise continue the loop.
			leapYears.push(year);
		}
	}

	// Returns the now populated array into a Number[].
	return leapYears;
};

/*
	Updates the list of contents displayed at the website
	Parameters: None
	Return: void
*/
const updateResultsContents = () => {
	// Checks if the inputs are empty. If so, the "Result window" will be hidden and the function will no longer continue.
	if (startingYearInput.value === "" || endingYearInput.value === "") {
		resultWindow.style.visibility = 'hidden';
		return;
	}
	
	// Unhides the entire "Result Window" in the case that is hidden.
	resultWindow.style.visibility = 'visible';

	// Query the "results-content" element inside the "Result Window".
	const resultsContents = resultWindow.querySelector('.results-contents');
	// Removes any current children inside the element.
	resultsContents.replaceChildren();

	// Runs the function, which returns an array of numbers to be then iterated, where the current iteration is initialized as "year".
	getLeapYears().forEach(year => {
		// Creates the HTML data for an empty li element
		const li = document.createElement('li');
		// Sets the text content of the li element into the current year of the iteration.
		li.textContent = year;
		// Finally, put the li element as the child of the "results-content" for displaying
		resultsContents.append(li);
	});
};

/*
	Validates the input of the user, making sure the user only types within the specified ranges.
	Parameters: None
	Return: void
*/
const validateInput = function () {
	// Gets the value of the input element refered as "this"
	const inputValue = parseInt(this.value);
	// Gets the attribute "min" from the input element and parses it into an integer
    const min = parseInt(this.min);
	// Gets the attribute "max" from the input element and parses it into an integer
    const max = parseInt(this.max);

	// Checks whether the value exceeds the ranges of min and max and sets them respectively. Otherwise, don't change anything
    if (inputValue < min) {
        this.value = min;
    } else if (inputValue > max) {
        this.value = max;
    }
};

/*
	Validates the input of the user, making sure the minimum value doesn't exceed the maximum value, and vice versa.
	Parameters: None
	Return: void
*/
const updateMinMax = function() {
	// Gets the values of both input elements and parses them into an integer
    const value1 = parseInt(startingYearInput.value);
    const value2 = parseInt(endingYearInput.value);

	// If ending year input is not empty (or any falsey value) it sets the max attribute, respective to the value of the end year input.
	// Otherwise, 4909 will be used as the value.
    startingYearInput.max = value2 || 4909; 
	// Same goes for the end year input, but it sets the min attribute and is respective to the start year input.
    endingYearInput.min = value1 || 1650; 
}

// Adds a listener to run the "updateMinMax" function whenever the user types in either input fields
startingYearInput.addEventListener('input', updateMinMax);
endingYearInput.addEventListener('input', updateMinMax);

// Adds a listener to run the "validate" function whenever the user finishes typing in either input fields
startingYearInput.addEventListener('focusout', validateInput);
endingYearInput.addEventListener('focusout', validateInput);

// Adds a listener to run the "updateResultsContents" function whenever the user clicks on the "Calculate" button
calculateButton.addEventListener('click', updateResultsContents);
