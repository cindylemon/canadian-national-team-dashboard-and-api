let playerData = [];

fetch("http://localhost:3000/players")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        playerData = data;
        display(playerData);
    })

function display(players) {
    var tableBody = document.querySelector("#playerTable tbody");
            tableBody.innerHTML = "";
            players.forEach(function(player) {
                var row = document.createElement("tr");
                var nameCell = document.createElement("td");
                nameCell.textContent = player.name;
                var teamCell = document.createElement("td");
                teamCell.textContent = player.team;
                var provCell = document.createElement("td");
                provCell.textContent = player.province;
                provCell.title = "Club: " + (player.club || "Unknown");
                var eventsCell = document.createElement("td");
                var eventTypes = [];
                for (var i = 0; i < player.events.length; i++) {
                    eventTypes.push(player.events[i].type);
                }
                eventsCell.textContent = eventTypes.join(", ");
                var eventRanking = []
                for (var i = 0; i<player.events.length;i++) {
                    eventRanking.push(player.events[i].rank)
                }
                eventsCell.title = eventRanking.join(", ");
                row.appendChild(nameCell);
                row.appendChild(teamCell);
                row.appendChild(provCell);
                row.appendChild(eventsCell);
                tableBody.appendChild(row);
            });
}


var selectInput = document.getElementById("select");
selectInput.addEventListener("change", function() {
    var selected = selectInput.value;
    var filtered;
    if (selected) {
        filtered = playerData.filter(function(p) { 
                return p.province === selected; 
            })
    } else {
        filtered = playerData;
    }
    display(filtered);
})

// refactor so that all the filtering is done in one spot
// make it so that you can search by name in specific provinces
// then put the province selector to the left of the search bar

var searchInput = document.getElementById("search");
searchInput.addEventListener("input", function() {
    var typed = searchInput.value.toLowerCase();
    var filtered = playerData.filter(function(p) {
        return p.name.toLowerCase().includes(typed);
    });
    display(filtered);
})
