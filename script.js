const BASE_URL = "http://localhost:8080/entry/id/";

function fetchChallenge() {
    const id = document.getElementById("challengeId").value.trim();

    if (!id) {
        alert("Please enter a challenge ID");
        return;
    }

    hide("inputCard");
    show("loadingCard");

    fetch(BASE_URL + id)
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(text);
                });
            }
            return response.text();
        })
        .then(text => {
            hide("loadingCard");
            show("challengeCard");

            typeWriter(text);
            handleDifficulty(text);
        })
        .catch(err => {
            hide("loadingCard");
            show("inputCard");
            alert(err.message);
        });
}

function typeWriter(text) {
    const target = document.getElementById("challengeText");
    target.innerText = "";
    let i = 0;

    const interval = setInterval(() => {
        target.innerText += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, 20);
}

function handleDifficulty(text) {
    const bar = document.getElementById("difficultyBar");
    const special = document.getElementById("specialMessage");
    const card = document.getElementById("challengeCard");

    bar.style.width = "0%";
    bar.classList.remove("pulse");
    card.classList.remove("death");

    special.classList.add("hidden");
    special.innerText = "";

    const match = text.match(/difficulty level:\s*(\d+)/i);
    if (!match) return;

    const level = parseInt(match[1], 10);

    if (level === 999) {
        special.innerText =
            "This challenge is beyond human limits. You have met an impossible fate.";
        special.classList.remove("hidden");
        card.classList.add("death");
        return;
    }

    const percentage = Math.min(level * 10, 100);
    bar.style.width = percentage + "%";

    if (level >= 7) {
        bar.classList.add("pulse");
    }

    if (level === 0) {
        special.innerText =
            "This is a beginner-friendly challenge. Take your time and enjoy learning.";
        special.classList.remove("hidden");
    }
}

function reset() {
    hide("challengeCard");
    show("inputCard");

    document.getElementById("challengeId").value = "";
    document.getElementById("challengeText").innerText = "";
    document.getElementById("difficultyBar").style.width = "0%";
    document.getElementById("difficultyBar").classList.remove("pulse");
    document.getElementById("specialMessage").classList.add("hidden");
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        fetchChallenge();
    }
});

function show(id) {
    document.getElementById(id).classList.remove("hidden");
}

function hide(id) {
    document.getElementById(id).classList.add("hidden");
}