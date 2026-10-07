function analyzePerformance() {

    // Get student information
    const studentName = document.getElementById("studentName").value.trim();
    const rollNumber = document.getElementById("rollNumber").value.trim();

    // Get marks
    const dataStructures = getMarks("dataStructures");
    const digitalEconomy = getMarks("digitalEconomy");
    const probability = getMarks("probability");
    const openElective = getMarks("openElective");
    const computerArchitecture = getMarks("computerArchitecture");
    const professionalCommunication =
        getMarks("professionalCommunication");

    // Check student information
    if (studentName === "" || rollNumber === "") {
        alert("Please enter student name and roll number.");
        return;
    }

    // Check marks
    const marks = [
        dataStructures,
        digitalEconomy,
        probability,
        openElective,
        computerArchitecture,
        professionalCommunication
    ];

    if (marks.includes(null)) {
        alert("Please enter valid marks between 0 and 100 for all subjects.");
        return;
    }

    // Calculate total and percentage
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const percentage = (totalMarks / 600) * 100;

    // Calculate grade
    const grade = calculateGrade(percentage);

    // Check pass/fail
    const isPassed = marks.every(mark => mark >= 40);
    const status = isPassed ? "PASS" : "FAIL";

    // Display student information
    document.getElementById("resultName").textContent = studentName;
    document.getElementById("resultRoll").textContent = rollNumber;

    // Display results
    document.getElementById("totalMarks").textContent = totalMarks;
    document.getElementById("percentage").textContent =
        percentage.toFixed(2);
    document.getElementById("grade").textContent = grade;
    document.getElementById("status").textContent = status;

    // Create subject table
    displaySubjectResults([
        ["Data Structures", dataStructures],
        ["Digital Economy and Management", digitalEconomy],
        ["Probability Theory and Statistics", probability],
        ["Open Elective", openElective],
        ["Computer Architecture", computerArchitecture],
        ["Professional Communication", professionalCommunication]
    ]);

    // Display performance message
    displayPerformanceMessage(percentage, isPassed);

    // Scroll to result section
    document.getElementById("resultSection").scrollIntoView({
        behavior: "smooth"
    });
}

function getMarks(id) {

    const value = document.getElementById(id).value.trim();

    if (value === "") {
        return null;
    }

    const marks = Number(value);

    if (isNaN(marks) || marks < 0 || marks > 100) {
        return null;
    }

    return marks;
}

function calculateGrade(percentage) {

    if (percentage >= 90) {
        return "A+";
    }
    else if (percentage >= 80) {
        return "A";
    }
    else if (percentage >= 70) {
        return "B";
    }
    else if (percentage >= 60) {
        return "C";
    }
    else if (percentage >= 40) {
        return "D";
    }
    else {
        return "F";
    }
}

function displaySubjectResults(subjects) {

    const tableBody = document.getElementById("subjectTable");

    tableBody.innerHTML = "";

    subjects.forEach(function(subject) {

        const name = subject[0];
        const marks = subject[1];

        const status = marks >= 40 ? "Pass" : "Fail";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${name}</td>
            <td>${marks}</td>
            <td>${status}</td>
        `;

        tableBody.appendChild(row);
    });
}

function displayPerformanceMessage(percentage, isPassed) {

    const message =
        document.getElementById("performanceMessage");

    if (!isPassed) {

        message.textContent =
            "The student has not passed all subjects. " +
            "More focus and improvement is required in the subjects " +
            "where the marks are below 40.";

    }
    else if (percentage >= 90) {

        message.textContent =
            "Excellent Performance! The student has achieved " +
            "outstanding results. Keep up the excellent work!";

    }
    else if (percentage >= 80) {

        message.textContent =
            "Very Good Performance! The student has shown " +
            "strong understanding and consistent performance.";

    }
    else if (percentage >= 70) {

        message.textContent =
            "Good Performance! The student is performing well. " +
            "With a little more effort, even better results can be achieved.";

    }
    else if (percentage >= 60) {

        message.textContent =
            "Satisfactory Performance. The student has passed " +
            "all subjects but can improve further with regular practice.";

    }
    else {

        message.textContent =
            "Needs Improvement. The student should focus more " +
            "on understanding concepts and practicing regularly.";
    }
}

function resetForm() {

    document.getElementById("studentName").value = "";
    document.getElementById("rollNumber").value = "";

    const subjectInputs = [
        "dataStructures",
        "digitalEconomy",
        "probability",
        "openElective",
        "computerArchitecture",
        "professionalCommunication"
    ];

    subjectInputs.forEach(function(id) {
        document.getElementById(id).value = "";
    });

    document.getElementById("resultName").textContent = "-";
    document.getElementById("resultRoll").textContent = "-";
    document.getElementById("totalMarks").textContent = "0";
    document.getElementById("percentage").textContent = "0";
    document.getElementById("grade").textContent = "-";
    document.getElementById("status").textContent = "-";

    document.getElementById("subjectTable").innerHTML = `
        <tr>
            <td colspan="3">
                Results will appear here
            </td>
        </tr>
    `;

    document.getElementById("performanceMessage").textContent =
        'Enter marks and click "Analyze Performance".';
}