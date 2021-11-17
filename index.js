dateInput = document.querySelector("#date-input");
checkBtn = document.querySelector(".check-btn");
output = document.querySelector(".output");

dateInput.defaultValue = "";

dateInput.oninput = (event) => {
    if (event.target.value != "") {
        checkBtn.disabled = false;
        output.style.display = "none"
    } else {
        checkBtn.disabled = true;
        output.style.display = "none"
    }
}

function dateInputToDateObject(dateInput) {
    var dateComponentsList = dateInput.split("-");
    var yyyy = dateComponentsList[0];
    var mm = dateComponentsList[1];
    var dd = dateComponentsList[2];

    var date = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy),
    };
    return date;
}

function reverseString(string) {
    var stringCharList = string.split("");
    var reversedStringCharList = stringCharList.reverse();
    var reversedString = reversedStringCharList.join("");
    return reversedString;
}

function isPalindrome(string) {
    return (string === reverseString(string));
}

function numObjectToStrObject(dateObject) {
    var dateStrObject = {
        day: "",
        month: "",
        year: ""
    };

    if (dateObject.day < 10) {
        dateStrObject.day = "0" + dateObject.day;
    } else {
        dateStrObject.day = dateObject.day.toString();
    }

    if (dateObject.month < 10) {
        dateStrObject.month = "0" + dateObject.month;
    } else {
        dateStrObject.month = dateObject.month.toString();
    }

    dateStrObject.year = dateObject.year.toString();
    return dateStrObject;
}

// DD-MM-YYYY
// MM-DD-YYYY
// YYYY-MM-DD
// DD-MM-YY
// MM-DD-YY
// YY-MM-DD

function getAllStrFormats(dateStrObject) {
    var ddmmyyyy = dateStrObject.day + dateStrObject.month + dateStrObject.year;
    var mmddyyyy = dateStrObject.month + dateStrObject.day + dateStrObject.year;
    var yyyymmdd = dateStrObject.year + dateStrObject.month + dateStrObject.day;
    var ddmmyy = dateStrObject.day + dateStrObject.month + dateStrObject.year.slice(-2);
    var mmddyy = dateStrObject.month + dateStrObject.day + dateStrObject.year.slice(-2);
    var yyddmm = dateStrObject.year.slice(-2) + dateStrObject.day + dateStrObject.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeAllFormats(allFormatsList) {
    var resultList = [];
    allFormatsList.forEach((format) => {
        result = isPalindrome(format);
        resultList.push(result);
    })
    if (resultList.includes(true)) {
        return true;
    }
    return false;

}

// new Date()
// new Date(year, month(0-11), day, hours, minutes, seconds, milliseconds)
// new Date(milliseconds)
// new Date(date string)

function findNearestPalindrome(userDate) {
    var nextPalindromeDate = nearestPalindromeDateFinder(userDate, "next");
    var previousPalindromeDate = nearestPalindromeDateFinder(userDate, "previous");
    if (nextPalindromeDate.counter < previousPalindromeDate.counter) {
        return nextPalindromeDate;
    } else {
        return previousPalindromeDate;
    }
}

function nearestPalindromeDateFinder(userDate, direction) {
    var date = new Date(userDate);
    var counter = 0
    while (true) {
        if (direction === "next") {
            date.setDate(date.getDate() + 1);
        } else if (direction === "previous") {
            date.setDate(date.getDate() - 1);
        } else {
            console.log("invalid direction argument");
        }

        counter++;
        var dateObject = {
            day: date.getDate(),
            month: (date.getMonth() + 1),
            year: date.getFullYear()
        }
        var dateStrObject = numObjectToStrObject(dateObject);
        var dateStrObject = numObjectToStrObject(dateObject);
        var allFormatsList = getAllStrFormats(dateStrObject);
        var isDatePalindrome = checkPalindromeAllFormats(allFormatsList);
        if (isDatePalindrome) {
            palindromeDateStr = dateStrObject.day + "-" + dateStrObject.month + "-" + dateStrObject.year
            return {
                counter: counter,
                date: palindromeDateStr
            };

        }
    }
}




function clickHandler() {
    var userDate = dateInput.value;
    var dateObject = dateInputToDateObject(userDate);
    var dateStrObject = numObjectToStrObject(dateObject);
    var allFormatsList = getAllStrFormats(dateStrObject);
    var isDatePalindrome = checkPalindromeAllFormats(allFormatsList);
    if (isDatePalindrome) {
        output.style.display = "block"
        output.innerText = "Processing"
        setTimeout(() => {
            output.innerText = "Processing.";
        }, 500);
        setTimeout(() => {
            output.innerText = "Processing..";
        }, 1000);setTimeout(() => {
            output.innerText = "Processing...";
        }, 1500);
        setTimeout(() => {
            output.innerText = "Yay! Your Birthday is a Palindrome!🎉🎊🎁";
        }, 2000);


    } else {
        var nearestPalindromeDate = findNearestPalindrome(userDate);
        var dayDisplay = (nearestPalindromeDate.counter != 1 ? "days" : "day");

        output.style.display = "block";
        output.innerText = "Processing"
        setTimeout(() => {
            output.innerText = "Processing.";
        }, 500);
        setTimeout(() => {
            output.innerText = "Processing..";
        }, 1000);setTimeout(() => {
            output.innerText = "Processing...";
        }, 1500);
        setTimeout(() => {
            output.innerText = `The nearest palindrome date is ${nearestPalindromeDate.date}, you missed by ${nearestPalindromeDate.counter} ${dayDisplay}.`;
        }, 2000);

    }
}

checkBtn.addEventListener("click", clickHandler)