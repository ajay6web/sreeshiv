// Initialize an empty array for multiple alarms
let alarms = [];
let timeZone = "local";

// Update digital clock every second
function updateClock() {
    const clockElement = document.getElementById("digitalClock");
    let now = new Date();

    // Adjust for selected time zone
    if (timeZone !== "local") {
        now = new Date(now.toLocaleString("en-US", { timeZone: timeZone }));
    }

    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Check for active alarms
    alarms.forEach((alarm, index) => {
        if (alarm.time === `${hours}:${minutes}` && !alarm.triggered) {
            triggerAlarm(index);
        }
    });
}

// Function to set a new alarm
function setAlarm() {
    const alarmInput = document.getElementById("alarmTime").value;
    if (alarmInput) {
        alarms.push({ time: alarmInput, triggered: false });
        updateAlarmsList();
        alert(`Alarm set for ${alarmInput}`);
    } else {
        alert("Please enter a valid alarm time.");
    }
}

// Function to display alarms in the list
function updateAlarmsList() {
    const alarmsListElement = document.getElementById("alarmsList");
    alarmsListElement.innerHTML = "";
    alarms.forEach((alarm, index) => {
        alarmsListElement.innerHTML += `
            <li>
                ${alarm.time} 
                <button onclick="removeAlarm(${index})">❌ Remove</button>
            </li>
        `;
    });
}

// Remove an alarm from the list
function removeAlarm(index) {
    alarms.splice(index, 1);
    updateAlarmsList();
}

// Trigger an alarm and show stop button
function triggerAlarm(index) {
    alarms[index].triggered = true;
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.play();
    alert(`⏰ Alarm Ringing! Alarm Time: ${alarms[index].time}`);
    document.getElementById("stopAlarmButton").style.display = "block";
}

// Stop all active alarms
function stopAllAlarms() {
    const alarmSound = document.getElementById("alarmSound");
    alarmSound.pause();
    alarmSound.currentTime = 0;
    document.getElementById("stopAlarmButton").style.display = "none";
    alarms.forEach(alarm => alarm.triggered = false); // Reset alarms
}

// Change the time zone
function updateTimeZone() {
    timeZone = document.getElementById("timeZoneSelector").value;
}

// Run the clock update every second
setInterval(updateClock, 1000);
