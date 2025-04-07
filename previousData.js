function updateData() {
    let healthDataDiv = document.getElementById('health-data');
    let previousDataList = document.getElementById('previous-data');

    let newData = "Heart Rate: " + Math.floor(60 + Math.random() * 40) + " BPM";

    // Move old data to "Previous Health Data"
    if (healthDataDiv.innerText !== "No data available") {
        let listItem = document.createElement("li");
        listItem.innerText = healthDataDiv.innerText;
        previousDataList.prepend(listItem);

        // Store in localStorage
        let storedData = JSON.parse(localStorage.getItem("previous-data")) || [];
        storedData.unshift(healthDataDiv.innerText); // Add new entry
        localStorage.setItem("previous-data", JSON.stringify(storedData));
    }

    // Update "Health Data"
    healthDataDiv.innerText = newData;
}

// Load previous data on page refresh
window.onload = function () {
    let previousDataList = document.getElementById('previous-data');
    let storedData = JSON.parse(localStorage.getItem("previous-data")) || [];
    storedData.forEach(data => {
        let listItem = document.createElement("li");
        listItem.innerText = data;
        previousDataList.appendChild(listItem);
    });
};

function updateData() {
    let currentDataDiv = document.getElementById('currentData');
    let previousDataList = document.getElementById('previousData');

    let newData = "Heart Rate: " + Math.floor(60 + Math.random() * 40) + " BPM";

    // Move old data to "Previous Data"
    if (currentDataDiv.innerText !== "No data available") {
        let listItem = document.createElement("li");
        listItem.innerText = currentDataDiv.innerText;
        previousDataList.prepend(listItem);

        // Store in localStorage
        let storedData = JSON.parse(localStorage.getItem("previousData")) || [];
        storedData.unshift(currentDataDiv.innerText); // Add new entry
        localStorage.setItem("previousData", JSON.stringify(storedData));
    }

    // Update "Current Data"
    currentDataDiv.innerText = newData;
}

// Load previous data on page refresh
window.onload = function () {
    let previousDataList = document.getElementById('previousData');
    let storedData = JSON.parse(localStorage.getItem("previousData")) || [];
    storedData.forEach(data => {
        let listItem = document.createElement("li");
        listItem.innerText = data;
        previousDataList.appendChild(listItem);
    });
};
