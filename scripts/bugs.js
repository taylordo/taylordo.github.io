

/* Harvest form data from bug Submission */

let getBugData = function() {
const description = document.getElementById('description').value;
const urgency = document.getElementById('urgency').value;
const completion = document.getElementById('completion').value;
const employee = document.getElementById('employee').value;

let bugSubData = {};
bugSubData["description"] = description;
bugSubData["urgency"] = urgency;
bugSubData["completion"] = completion;
bugSubData["employee"] = employee;

return bugSubData
}

document.getElementById('submit').addEventListener('click', getBugData);
