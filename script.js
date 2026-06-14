let speedTypingTest = document.getElementById("speedTypingTest");
let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let result = document.getElementById("result");
let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let historyBtn = document.getElementById("historyBtn");
let historySection = document.getElementById("historySection");
let historyList = document.getElementById("historyList");
let attempts = [];
let testStarted = false;
let historyVisible = false;

let url = "https://apis.ccbp.in/random-quote";
let body = document.body;

let timer = document.getElementById("timer");

let counter = 0;
let intervalId = null;

function startTimer() {
    intervalId = setInterval(function () {
        counter++;
        timer.textContent = counter;
    }, 1000);
}

function stopTimer() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

let spinner = document.getElementById("spinner");

function loadQuote() {
    spinner.classList.remove("d-none");

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            quoteDisplay.textContent = data.content;
            spinner.classList.add("d-none");
            counter = 0;
            timer.textContent = counter;
            quoteInput.value = "";
            stopTimer();

            intervalId = setInterval(function() {
                counter++;
                timer.textContent = counter;
            }, 1000);

        })
        .catch(function() {
            spinner.classList.add("d-none");
            quoteDisplay.textContent = "Failed to load quote.";
        });
}

startBtn.addEventListener("click", function () {
    if (!testStarted) {
        testStarted = true;
        result.textContent = "";
        loadQuote();
    }
});



submitBtn.addEventListener("click", function () {

    if (quoteDisplay.textContent === "") {
        result.textContent = "Please click the Start button first.";
        return;
    }

    if (quoteInput.value.trim() === quoteDisplay.textContent.trim()) {
    stopTimer();

    result.textContent = "You typed in " + counter + " seconds.";
    attempts.push(
        "Completed in " +
        counter +
        " seconds on " +
        new Date().toLocaleString()
    );
}
    else {
        result.textContent = "You typed incorrect sentence. Please try again.";
    }
});


resetBtn.addEventListener("click", function () {
    stopTimer();
    testStarted = false;
    counter = 0;
    timer.textContent = 0;
    quoteInput.value = "";
    quoteDisplay.textContent = "";
    result.textContent = "";
});


historyBtn.addEventListener("click", function () {

    if (!historyVisible) {
        historySection.style.display = "block";
        historyBtn.textContent = "Hide History";
        historyList.innerHTML = "";

        if (attempts.length === 0) {
            let card = document.createElement("div");
            card.classList.add("card", "p-3", "mb-3");
            card.textContent = "No previous attempts found.";
            historyList.appendChild(card);

        } else {

            for (let i = 0; i < attempts.length; i++) {
                let card = document.createElement("div");
                card.classList.add(
                    "card",
                    "shadow-sm",
                    "p-3",
                    "mb-3"
                );
                card.innerHTML = `
                    <h5>Attempt ${i + 1}</h5>
                    <p>${attempts[i]}</p>
                `;
                historyList.appendChild(card);
            }
        }
        historyVisible = true;
    } else {
        historySection.style.display = "none";
        historyBtn.textContent = "Previous Attempts";
        historyVisible = false;
    }

});