let teamList = [
];

let systems = [
    "Turbolift",
    "Replicator",
    "Warp Drive",
    "Impulse Drive",
    "Phaser Array",
    "Shield Generators",
    "Transporter",
    "Life Support",
    "Environmental Controls",
    "Sensors",
    "Communications",
    "Computer Core",
    "Tractor Beam"
]

let completeOfficerList = [
    "Officer 1",
    "Officer 2",
    "Officer 3",
    "Officer 4",
    "Officer 5",
    "Officer 6",
    "Officer 7",
    "Officer 8",
    "Officer 9",
    "Officer 10",
    "Officer 11",
    "Officer 12",
    "Officer 13",
    "Officer 14",
    "Officer 15"
]

let unassignedOfficers = [
    "Officer 1",
    "Officer 2",
    "Officer 3",
    "Officer 4",
    "Officer 5",
    "Officer 6",
    "Officer 7",
    "Officer 8",
    "Officer 9",
    "Officer 10",
    "Officer 11",
    "Officer 12",
    "Officer 13",
    "Officer 14",
    "Officer 15"
]

let assignedOfficers = []

const views = {
    activeTeams: `
    <div id="activeTeams">
        <h2>Active Teams</h2>
        <p>Active teams will be displayed here.</p>
        <div id="teamContainer">
        </div>
        <button id="createTeamButton">Create New Team</button>
    </div>`,
    teamView: `
    <div id="teamView">
        <div id="activeTeamContainer">
        </div>
        <div id="backButtonContainer">
            <button id="backButton" type="button">Back to Active Teams</button>
        </div>
    </div>`,
    createTeamView:`
    <div id="createTeamView">
        <h2>Create New Team</h2>
        <form id="createTeamForm">
            <div id="firstSection">
                <label for="teamName">Team Name:</label>
                <input type="text" id="teamName" required>
            </div>
            <div id="secondSection">
                <div id="ordersContainer">
                    <label for="teamOrders">Orders:</label>
                    <textarea type="text" id="teamOrders" required></textarea>
                </div>
                <div id="systemPriority">
                    <label for="assignSystem">Assigned System:</label>
                    <select id="assignSystem">
                        <option value="" selected disabled>Select System</option>
                        ${systems.map(system => `<option value="${system}">${system}</option>`).join('')}
                    </select>
                    <label for="teamPriority">Priority:</label>
                    <select id="teamPriority">
                        <option value="" selected disabled>Select Priority</option>
                        <option value="Emergency">Emergency</option>
                        <option value="Critical">Critical</option>
                        <option value="Normal">Normal</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div id="availableOfficersContainer">
                    <label for="availableOfficers">Available Officers</label>
                    <select id="availableOfficers">
                    </select>
                    <button type="button" id="addOfficerButton">Add Officer</button>
                </div>
                <div id="selectedOfficersContainer">
                    <label for="selectedOfficers">Assigned Officers</label>
                    <select id="selectedOfficers" multiple>
                    </select>
                    <button type="button" id="removeOfficerButton">Remove Officer</button>
                </div>
            </div>
            <div id="createTeamButtonContainer">
                <button id="createTeamButton">Create Team</button>
                <button id="cancelButton">Cancel</button>
            </div>
        </form>
    </div>`
}

export function init() {
    const viewContainer = document.getElementById('viewContainer');

    function loadActiveTeams() {
        const teamContainer = document.getElementById('teamContainer');
        teamContainer.innerHTML = '';

        teamList.forEach(team => {
            const teamDiv = document.createElement('div');
            teamDiv.className = 'team';
            teamDiv.innerHTML = `
                <h4>${team.name}</h4>
                <div id="teamAttributes">
                    <div id="orders">
                        <p>Orders: ${team.orders}</p>
                    </div>
                    <div id="assignedSystem">
                        <p>Assigned System: ${team.assignedSystem}</p>
                    </div>
                    <div id="status">
                        <p>Status: ${team.Status}</p>
                    </div>
                    <div id="teamOptionsContainer">
                        <button type="button" class="viewTeamButton">View Team</button>
                        <button type="button" class="removeTeamButton">Remove Team</button>
                    </div>
                </div>
            `;

            const viewBtn = teamDiv.querySelector('.viewTeamButton');
            const removeBtn = teamDiv.querySelector('.removeTeamButton');
    
            viewBtn.addEventListener('click', () => loadTeamView(team));
            removeBtn.addEventListener('click', () => removeTeam(team));
    
            teamContainer.appendChild(teamDiv);
        });

        const createTeamButton = document.getElementById('createTeamButton');
        createTeamButton.onclick = () => {
            loadView('createTeamView');
        }
    }

    function removeTeam(team) {
        console.log(`Removing team: ${team.name}`);
        teamList.splice(teamList.indexOf(team), 1);
        for (let i = 0; i < team.teamMembers.length; i++) {
            unassignedOfficers.push(team.teamMembers[i]);
            assignedOfficers.splice(assignedOfficers.indexOf(team.teamMembers[i]), 1);
        }
        loadView('activeTeams');
    }

    function loadTeamView(team) {
        loadView('teamView');
        const activeTeamContainer = document.getElementById('activeTeamContainer');
        activeTeamContainer.innerHTML = `
            <h2>${team.name}</h2>
            <p>Orders: ${team.orders}</p>
            <p>Assigned System: ${team.assignedSystem}</p>
            <p>Priority: ${team.priority}</p>
            <p>Status: ${team.Status}</p>
            <p>Team Members: ${team.teamMembers.join(', ')}</p>
        `;
        const backButton = document.getElementById('backButton');
        backButton.onclick = () => {
            loadView('activeTeams');
        };
    }

    function loadCreateTeamView() {
        const addOfficerButton = document.getElementById('addOfficerButton');
        const removeOfficerButton = document.getElementById('removeOfficerButton');
        const selectedOfficers = document.getElementById('selectedOfficers');
        const availableOfficers = document.getElementById('availableOfficers');
        const createTeamButton = document.getElementById('createTeamButton');
        const cancelButton = document.getElementById('cancelButton');
        let countAssigned = 0;

        availableOfficers.innerHTML = `<option value="" selected disabled>Select Officers</option>
            ${unassignedOfficers.map(officer => `<option value="${officer}">${officer}</option>`).join('')}`;

        removeOfficerButton.disabled = true;

        if (availableOfficers.options[availableOfficers.selectedIndex].value === "") {
            addOfficerButton.disabled = true;
        }

        availableOfficers.addEventListener('change', () => {
            addOfficerButton.disabled = false;
        });

        addOfficerButton.onclick = () => {
            const selectedOfficer = availableOfficers.options[availableOfficers.selectedIndex].value;
            if (unassignedOfficers.includes(selectedOfficer)) {
                assignedOfficers.push(selectedOfficer);
                availableOfficers.remove(availableOfficers.selectedIndex);
                unassignedOfficers.splice(unassignedOfficers.indexOf(selectedOfficer), 1);
                const option = document.createElement('option');
                option.value = selectedOfficer;
                option.text = selectedOfficer;
                selectedOfficers.appendChild(option);
                countAssigned++;

                if (countAssigned > 0) {
                    removeOfficerButton.disabled = false;
                }
                if (countAssigned === completeOfficerList.length) {
                    addOfficerButton.disabled = true;
                }
            }
        }

        removeOfficerButton.onclick = () => {
            const selectedOfficer = selectedOfficers.options[selectedOfficers.selectedIndex].value;
            if (assignedOfficers.includes(selectedOfficer)) {
                unassignedOfficers.push(selectedOfficer);
                selectedOfficers.remove(selectedOfficers.selectedIndex);
                assignedOfficers.splice(assignedOfficers.indexOf(selectedOfficer), 1);
                const option = document.createElement('option');
                option.value = selectedOfficer;
                option.text = selectedOfficer;
                availableOfficers.appendChild(option);
                countAssigned--;

                if (countAssigned === 0) {
                    removeOfficerButton.disabled = true;
                }
                if (countAssigned < completeOfficerList.length) {
                    addOfficerButton.disabled = false;
                }
            }
        }

        createTeamButton.onclick = (event) => {
            event.preventDefault();
            const teamName = document.getElementById('teamName').value;
            const teamOrders = document.getElementById('teamOrders').value;
            const assignedSystem = document.getElementById('assignedSystem').value;
            const teamPriority = document.getElementById('teamPriority').value;

            if (teamName && teamOrders && assignedSystem && teamPriority && countAssigned > 0) {
                const newTeam = {
                    name: teamName,
                    orders: teamOrders,
                    assignedSystem: assignedSystem,
                    priority: teamPriority,
                    Status: "In Progress",
                    teamMembers: assignedOfficers
                };  
                addTeam(newTeam);
            } else {
                alert("Please fill in all fields.");
            }
        }

        cancelButton.onclick = (event) => {
            event.preventDefault();
            for (let i = 0; i < selectedOfficers.options.length; i++) {
                unassignedOfficers.push(selectedOfficers.options[i].value);
            }
            loadView('activeTeams');
        }
    }

    function loadView(viewName) {
        viewContainer.innerHTML = views[viewName] || `<p>View not found</p>`;
        if (viewName === 'activeTeams') {
            loadActiveTeams();
        }
        else if (viewName === 'createTeamView') {
            loadCreateTeamView();
        }
    }

    function addTeam(team) {
        teamList.push(team);
        loadView('activeTeams');
    }

    loadView('activeTeams');
}