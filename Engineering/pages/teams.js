let teamList = [];

const views = {
    activeTeams: `
    <div id="activeTeams">
        <h2>Active Teams</h2>
        <p>Active teams will be displayed here.</p>
        <div id="teamContainer">
        </div>
        <button id="createTeamButton">Create New Team</button>
    </div>`
}

export function init() {
    const viewContainer = document.getElementById('viewContainer');

    function loadView(viewName) {
        viewContainer.innerHTML = views[viewName] || `<p>View not found</p>`;
    }

    loadView('activeTeams');
    console.log("Loaded active teams view");
}