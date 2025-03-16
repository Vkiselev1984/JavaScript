
async function loadSchedule() {
    try {
        const response = await fetch('schedule.json');
        if (!response.ok) {
            throw new Error('Error loading data: ' + response.statusText);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}


function displaySchedule(scheduleData) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';

    scheduleData.forEach((session, index) => {
        const sessionDiv = document.createElement('div');
        sessionDiv.className = 'card mb-3';
        sessionDiv.innerHTML = `
     <div class="card-body">
     <h5 class="card-title">${session.title}</h5>
     <p class="card-text">Time: ${session.time}</p>
     <p class="card-text">Maximum participants: ${session.maxParticipants}</p>
     <p class="card-text">Recorded participants: ${session.currentParticipants}</p>
     <button id="register-${index}" class="btn btn-primary" onclick="register(${index})" ${session.currentParticipants >= session.maxParticipants ? 'disabled' : ''}>
    Sign up
    </button>
    <button id="cancel-${index}" class="btn btn-danger" onclick="cancel(${index})" ${session.currentParticipants === 0 ? 'disabled' : ''}>
    Cancel sign up
    </button>
    </div>
    `;
        scheduleContainer.appendChild(sessionDiv);
    });
}


function register(index) {
    const session = scheduleData[index];
    if (session.currentParticipants < session.maxParticipants) {
        session.currentParticipants++;
        displaySchedule(scheduleData);
    }
}

function cancel(index) {
    const session = scheduleData[index];
    if (session.currentParticipants > 0) {
        session.currentParticipants--;
        displaySchedule(scheduleData);
    }
}


let scheduleData = [];
loadSchedule().then(data => {
    scheduleData = data;
    displaySchedule(scheduleData);
});