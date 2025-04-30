function fetchGradeData() {
    console.log("Fetching grade data...");
    
    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }

            const results = JSON.parse(xhr.responseText);
            populateGradebook(results);
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);

    let tableBody = document.querySelector("#gradebook tbody");

    // Clear previous rows
    tableBody.innerHTML = "";

    data.forEach(function(assignment) {
        let row = document.createElement("tr");

        let nameCell = document.createElement("td");
        nameCell.textContent = `${assignment.last_name}, ${assignment.first_name}`;

        let gradeCell = document.createElement("td");
        gradeCell.textContent = assignment.total_grade;

        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        tableBody.appendChild(row);
    });
}
window.onload = fetchGradeData;