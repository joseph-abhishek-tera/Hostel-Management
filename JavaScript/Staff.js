function addDetails() {
    // Create a form for entering new details
    const formHTML = `
        <form id="details-form">
            <label for="newName">Name:</label>
            <input type="text" id="newName" required>

            <label for="newGender">Gender:</label>
            <input type="text" id="newGender" required>

            <label for="newDateOfJoin">Date of Join:</label>
            <input type="text" id="newDateOfJoin" required>

            <label for="newSalary">Salary:</label>
            <input type="text" id="newSalary" required>

            <button type="button" onclick="updateDetails()">Update Details</button>
        </form>
    `;

    // Display the form in the update section
    document.querySelector('.update').innerHTML = formHTML;
}

function updateDetails() {
    // Get the values from the form
    const newName = document.getElementById('newName').value;
    const newGender = document.getElementById('newGender').value;
    const newDateOfJoin = document.getElementById('newDateOfJoin').value;
    const newSalary = document.getElementById('newSalary').value;

    // Create a new row with the entered details
    const newRowHTML = `
        <div class="staff-info">
            <h2>Name: ${newName}</h2>
            <p>Gender: ${newGender}</p>
            <p>Date of Join: ${newDateOfJoin}</p>
            <p>Salary: ${newSalary}</p>
        </div>
    `;

    // Append the new row to the existing staff information
    document.querySelector('.staff-info').insertAdjacentHTML('beforeend', newRowHTML);

    // Clear the update section
    document.querySelector('.update').innerHTML = '';
}
