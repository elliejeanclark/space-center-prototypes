let teamList = [
    {
        name: "Filler Team",
        orders: "Fix the turbolift",
        teamMembers: ['Officer 1', 'Officer 2', 'Officer 3'],
        priority: "Emergency",
        assignedSystem: "Turbolift",
        Status: "In Progress"
    },
    {
        name: "Filler Team 2",
        orders: "Fix the replicator",
        teamMembers: ['Officer 4', 'Officer 5'],
        priority: "High",
        assignedSystem: "Replicator",
        Status: "In Progress"
    }
];

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
            <label for="teamName">Team Name:</label>
            <input type="text" id="teamName" required>
            <label for="teamOrders">Orders:</label>
            <input type="text" id="teamOrders" required>
            <label for="assignedSystem">Assigned System:</label>
            <input type="text" id="assignedSystem" required>
            <label for="teamPriority">Priority:</label>
            <input type="text" id="teamPriority" required>
            <label for="teamStatus">Status:</label>
            <input type="text" id="teamStatus" required>
            <label for="availableOfficers">Available Officers</label>
            <select id="availableOfficers" multiple>
                ${unassignedOfficers.map(officer => `<option value="${officer}">${officer}</option>`).join('')}
            </select>
            <button type="button" id="addOfficerButton">Add Officer</button>
            <div id="selectedOfficersContainer">
                <select id="selectedOfficers" multiple>
                </select>
            </div>
            <button id="createTeamButton">Create Team</button>
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
                    <p>Orders: ${team.orders}</p>
                    <p>Assigned System: ${team.assignedSystem}</p>
                    <p>Status: ${team.Status}</p>
                </div>
            `;

            teamDiv.onclick = () => {
                loadTeamView(team);
            }

            teamContainer.appendChild(teamDiv);
        });
        const createTeamButton = document.getElementById('createTeamButton');
        createTeamButton.onclick = () => {
            loadView('createTeamView');
        }
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
        const createTeamForm = document.getElementById('createTeamForm');
        const addOfficerButton = document.getElementById('addOfficerButton');
        const selectedOfficers = document.getElementById('selectedOfficers');
        const availableOfficers = document.getElementById('availableOfficers');

        addOfficerButton.onclick = () => {
            const seletedOfficer = availableOfficers.options[availableOfficers.selectedIndex].value;
            console.log(seletedOfficer);
            if (unassignedOfficers.includes(seletedOfficer)) {
                assignedOfficers.push(seletedOfficer);
                availableOfficers.remove(availableOfficers.selectedIndex);
                unassignedOfficers.splice(unassignedOfficers.indexOf(seletedOfficer), 1);
                const option = document.createElement('option');
                option.value = seletedOfficer;
                option.text = seletedOfficer;
                selectedOfficers.appendChild(option);
            }
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