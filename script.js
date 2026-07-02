let quoteDisplay = document.getElementById("quoteDisplay");
let quoteInput = document.getElementById("quoteInput");
let result = document.getElementById("result");

let startBtn = document.getElementById("startBtn");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let historyBtn = document.getElementById("historyBtn");

let timer = document.getElementById("timer");
let spinner = document.getElementById("spinner");
let spinnerContainer = document.getElementById("spinnerContainer");
let historySection = document.getElementById("historySection");
let historyList = document.getElementById("historyList");

spinnerContainer.querySelector("p").textContent = "Preparing typing challenge...";

const url = "https://dummyjson.com/quotes/random";

let counter = 0;
let intervalId = null;
let attempts = [];
let testStarted = false;
let historyVisible = false;

function stopTimer() {
    clearInterval(intervalId);
    intervalId = null;
}

function loadQuote() {

    spinnerContainer.classList.remove("d-none");
    spinner.classList.remove("d-none");

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            quoteDisplay.textContent = data.quote;

            spinnerContainer.classList.add("d-none");
            spinner.classList.add("d-none");

            stopTimer();

            counter = 0;
            timer.textContent = counter;
            quoteInput.value = "";
            quoteInput.focus();

            intervalId = setInterval(function() {
                counter++;
                timer.textContent = counter;
            }, 1000);

        })
        .catch(function() {

            spinnerContainer.classList.add("d-none");

            quoteDisplay.textContent = "Failed to load quote.";
        });
}

startBtn.addEventListener("click", function() {

    if (!testStarted) {
        testStarted = true;
        result.textContent = "";
        loadQuote();
    }

});

submitBtn.addEventListener("click", function() {

    if (quoteDisplay.textContent === "") {
        result.textContent = "Please click the Start button first.";
        return;
    }

    if (quoteInput.value.trim() === quoteDisplay.textContent.trim()) {

        stopTimer();

        result.textContent = `🎉 Great Job! You completed the challenge in ${counter} seconds.`;

        attempts.push(
            "Completed in " +
            counter +
            " seconds on " +
            new Date().toLocaleString()
        );

    } else {

        result.textContent = "You typed an incorrect sentence. Please try again.";

    }

});

resetBtn.addEventListener("click", function() {

    stopTimer();

    testStarted = false;
    counter = 0;

    timer.textContent = "0";
    quoteDisplay.textContent = "";
    quoteInput.value = "";
    result.textContent = "";

});

historyBtn.addEventListener("click", function() {

    if (!historyVisible) {

        historySection.style.display = "block";

        historyBtn.innerHTML = `
            <i class="fa-solid fa-eye-slash"></i>
            Hide History
        `;

        historyList.innerHTML = "";

        if (attempts.length === 0) {

            let card = document.createElement("div");
            card.classList.add("card", "p-3", "mb-3");
            card.textContent = "No previous attempts found.";

            historyList.appendChild(card);

        } else {

            attempts.forEach(function(attempt, index) {

                let card = document.createElement("div");

                card.classList.add(
                    "card",
                    "shadow-sm",
                    "p-3",
                    "mb-3"
                );

                card.innerHTML = `
                    <h5>Attempt ${index + 1}</h5>
                    <p>${attempt}</p>
                `;

                historyList.appendChild(card);

            });

        }

        historyVisible = true;

    } else {

        historySection.style.display = "none";

        historyBtn.innerHTML = `
            <i class="fa-solid fa-clock-rotate-left"></i>
            Previous Attempts
        `;

        historyVisible = false;

    }

});