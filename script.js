let firstStampTime;

// Funktion zum Anzeigen der aktuellen Zeit im HH:MM:SS Format
function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Funktion zum Stempeln
function stamp() {
    const currentTime = getCurrentTime();
    const logItem = document.createElement('div');
    logItem.classList.add('stamp');
    logItem.textContent = `Stempelzeit: ${currentTime}`;
    logItem.classList.add(this.classList.contains('in') ? 'in' : 'out');
    logsDiv.prepend(logItem);

    if (!firstStampTime && this.classList.contains('in')) {
        firstStampTime = currentTime;
    } else if (firstStampTime && !this.classList.contains('in')) {
        const duration = calculateTimeDifference(firstStampTime, currentTime);
        durationDiv.textContent = `Dauer zwischen Ein- und Ausstempeln: ${duration} Sekunden`;
        firstStampTime = null; // Reset firstStampTime after calculating duration
    }

    toggleClearButton();
    toggleButton();
}

// Funktion zum Berechnen der Differenz zwischen zwei Zeitstempeln in Sekunden
function calculateTimeDifference(startTime, endTime) {
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    return Math.abs(end - start) / 1000;
}

// Funktion zum Umschalten des Button-Textes und Stils
function toggleButton() {
    const clockButton = document.getElementById('clockButton');
    clockButton.classList.toggle('in');
    clockButton.classList.toggle('out');
    clockButton.textContent = clockButton.classList.contains('in') ? 'Einstempeln' : 'Ausstempeln';
    clockButton.style.backgroundColor = clockButton.classList.contains('in') ? '#28a745' : '#dc3545';
}

// Funktion zum Umschalten der Anzeige des Buttons zum Löschen der alten Einträge
function toggleClearButton() {
    const clearButton = document.getElementById('clearButton');
    clearButton.style.display = logsDiv.children.length > 0 ? 'block' : 'none';
}

// Funktion zum Löschen der alten Einträge
function clearLogs() {
    logsDiv.innerHTML = '';
    durationDiv.textContent = ''; // Zurücksetzen der Daueranzeige
    firstStampTime = null; // Reset firstStampTime
    toggleClearButton();
    resetButton();
}

// Funktion zum Zurücksetzen des Button-Textes auf "Einstempeln"
function resetButton() {
    const clockButton = document.getElementById('clockButton');
    clockButton.textContent = 'Einstempeln';
    clockButton.classList.remove('out');
    clockButton.classList.add('in');
    clockButton.style.backgroundColor = '#28a745'; // Grün für Einstempeln
}

const logsDiv = document.getElementById('logs');
const durationDiv = document.getElementById('duration');

// Eventlistener für den Stempel-Button
const clockButton = document.getElementById('clockButton');
clockButton.addEventListener('click', stamp);

// Eventlistener für den Button zum Löschen der alten Einträge
const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearLogs);