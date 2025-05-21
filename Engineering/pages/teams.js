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

    function loadView(viewName) {
        viewContainer.innerHTML = views[viewName] || `<p>View not found</p>`;
        if (viewName === 'activeTeams') {
            loadActiveTeams();
        }
    }

    function addTeam(team) {
        teamList.push(team);
        loadView('activeTeams');
    }

    loadView('activeTeams');
}