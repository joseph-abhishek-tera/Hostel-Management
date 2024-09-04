function updateAttendance() {
    const checkboxes = document.querySelectorAll('.attendance-checkbox');
    const attendanceData = [];
    const selectedDate = document.getElementById('attendance-date').value;

    checkboxes.forEach(checkbox => {
        const studentId = checkbox.getAttribute('data-student-id');
        const isPresent = checkbox.checked;

        attendanceData.push({
            studentId,
            attendanceDate: selectedDate,
            isPresent
        });
    });

    // Send the attendanceData to the server using AJAX or fetch API
    // You would need a server-side script to handle this data and update the database

    console.log('Attendance Data:', attendanceData);
}
