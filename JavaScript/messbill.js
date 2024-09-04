function calculateMessBill() {
    const extraFees = parseFloat(document.getElementById('extra-fees').value) || 0;

    // Replace this with actual data retrieval logic from the previous page or database
    const studentsData = getStudentsData();

    // Calculate mess bill for each student
    const billDetails = calculateBillForAll(studentsData, extraFees);

    // Display the bill details
    displayBillDetails(billDetails);
}

function getStudentsData() {
    // Replace this with actual data retrieval logic from the previous page or database
    // For demonstration purposes, using sample data
    return [
        { name: 'John Doe', numberOfDays: 20 },
        { name: 'Jane Smith', numberOfDays: 22 },
        // Add more student data as needed
    ];
}

function calculateBillForAll(studentsData, extraFees) {
    // Calculate mess bill for each student
    return studentsData.map(student => {
        const costPerDay = 5.00; // Adjust this based on your pricing
        const totalCost = student.numberOfDays * costPerDay;
        const totalAmount = totalCost + extraFees;

        return {
            name: student.name,
            numberOfDays: student.numberOfDays,
            amount: totalAmount.toFixed(2),
            extraFees: extraFees.toFixed(2),
            status: totalAmount > 0 ? 'Pending' : 'Paid',
        };
    });
}

function displayBillDetails(billDetails) {
    const tableBody = document.getElementById('bill-details-body');
    tableBody.innerHTML = ''; // Clear previous data

    // Create rows for each student's bill details
    billDetails.forEach(details => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = details.name;
        row.insertCell(1).textContent = details.numberOfDays;
        row.insertCell(2).textContent = `$${details.amount}`;
        row.insertCell(3).textContent = `$${details.extraFees}`;
        row.insertCell(4).textContent = details.status;
    });
}
