function addDetails() {
    // Create a form for entering new details
    const formHTML = `
        <form id="details-form">
            <label for="newStudentID">Student ID:</label>
            <input type="text" id="newStudentID" required>

            <label for="newName">Name:</label>
            <input type="text" id="newName" required>

            <label for="newGender">Gender:</label>
            <input type="text" id="newGender" required>

            <label for="newRoomNumber">Room Number:</label>
            <input type="text" id="newRoomNumber" required>

            <label for="newPhoneNumber">Phone Number:</label>
            <input type="text" id="newPhoneNumber" required>

            <button type="button" onclick="updateDetails()">Update Details</button>
        </form>
    `;

    // Display the form in the update section
    document.querySelector('.container').insertAdjacentHTML('beforeend', formHTML);
}

function updateDetails() {
    // Get the values from the form
    const newStudentID = document.getElementById('newStudentID').value;
    const newName = document.getElementById('newName').value;
    const newGender = document.getElementById('newGender').value;
    const newRoomNumber = document.getElementById('newRoomNumber').value;
    const newPhoneNumber = document.getElementById('newPhoneNumber').value;

    // Check if all fields are filled
    if (!newStudentID || !newName || !newGender || !newRoomNumber || !newPhoneNumber) {
        alert("Please fill in all details before updating.");
        return;
    }

    // Create a new row with the entered details
    const newRowHTML = `
        <tr>
            <td>${newStudentID}</td>
            <td>${newName}</td>
            <td>${newGender}</td>
            <td>${newRoomNumber}</td>
            <td>${newPhoneNumber}</td>
        </tr>
    `;

    // Append the new row to the existing student details
    document.querySelector('tbody').insertAdjacentHTML('beforeend', newRowHTML);

    // Clear the form
    document.getElementById('details-form').reset();
}

