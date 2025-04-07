console.log("connected");

const socket = new WebSocket("ws://localhost:3000"); // WebSocket connection

socket.onopen = () => {
console.log("✅ WebSocket Connected");
};
let lastData;
socket.onmessage = (event) => {
    console.log("📦 Data Received:", event.data);

    try {
        const data = JSON.parse(event.data);

        // DHT11 Data
        document.querySelector(".temperature").textContent = `${data.dht11.temperature_c}°C`;
        document.querySelector(".humidity").textContent = `${data.dht11.humidity}%`;

        // LM75 Body Temperature
        document.querySelector(".bodytemp").textContent = `${data.lm75.temperature_c}°C`;

        // ECG Status
        document.querySelector(".ecg-status").textContent = data.ecg.status;

        // Accelerometer
        document.querySelector(".accel-x").textContent = data.accelerometer.x;
        document.querySelector(".accel-y").textContent = data.accelerometer.y;
        document.querySelector(".accel-z").textContent = data.accelerometer.z;
        storePreviousData(data);
    } catch (error) {
        console.error("❌ Error parsing sensor data:", error);
    }
};
function storePreviousData(data) {
    let previousData = JSON.parse(localStorage.getItem("previousHealthData")) || [];
    previousData.push({ timestamp: new Date().toLocaleString(), ...data });
    localStorage.setItem("previousHealthData", JSON.stringify(previousData));
}

function showPreviousData() {
    const container = document.getElementById("previous-data-list");
    const previousData = JSON.parse(localStorage.getItem("previousHealthData")) || [];

    container.innerHTML = "";

    if (previousData.length === 0) {
        container.innerHTML = "<p>No previous data available.</p>";
        return;
    }

    previousData.reverse().forEach(entry => {
        const div = document.createElement("div");
        div.classList.add("data-entry");
        div.innerHTML = `
            <strong>${entry.timestamp}</strong><br>
            🌡️ Room Temp: ${entry.dht11.temperature_c}°C<br>
            💧 Humidity: ${entry.dht11.humidity}%<br>
            ❤️ ECG: ${entry.ecg.status}<br>
            🧠 Body Temp: ${entry.lm75.temperature_c}°C<br>
            📉 Accel (X,Y,Z): ${entry.accelerometer.x}, ${entry.accelerometer.y}, ${entry.accelerometer.z}<br><hr>
        `;
        container.appendChild(div);
    });
}

function clearPreviousData() {
    localStorage.removeItem("previousHealthData");
    showPreviousData();
}

document.querySelector('li[onclick="showSection(\'previous-data\')"]').addEventListener('click', showPreviousData);




socket.onerror = (error) => {
console.error("❌ WebSocket Error:", error);
};

socket.onclose = () => {
console.log("⚠️ WebSocket Disconnected");
};
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}


if (localStorage.getItem("isLoggedIn") !== "true") {
window.location.href = "login.html"; // Redirect if not logged in
} else {
// document.getElementById("user-name").textContent = localStorage.getItem("username");
const name = localStorage.getItem("userName");
if (name) {
document.getElementById("username").textContent = name;
}
}

// Logout functionality
// document.getElementById("logout").addEventListener("click", function() {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userName");      // ✅ correct key
//     localStorage.removeItem("userEmail");     // optional cleanup
//     localStorage.removeItem("userPassword");  // optional cleanup
//     window.location.href = "login.html";
// });
document.getElementById("logout").addEventListener("click", function () {
localStorage.setItem("isLoggedIn", "false"); // instead of removing user info
window.location.href = "login.html";
});
