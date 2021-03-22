/* New bug submission data harvested from form */

let getNewBugData = function() {
    const new_description_input = document.getElementById('new_description_input').value;
    const new_urgency_input = document.getElementById('new_urgency_input').value;
    const new_completion_input = document.getElementById('new_completion_input').value;
    const new_employee_input = document.getElementById('new_employee_input').value;
    
    let new_bug_data = {};
    new_bug_data["new_description_input"] = new_description_input;
    new_bug_data["new_urgency_input"] = new_urgency_input;
    new_bug_data["new_completion_input"] = new_completion_input;
    new_bug_data["new_employee_input"] = new_employee_input;

    document.getElementById('bug-form').reset();
    
    return new_bug_data;
}

function deleteTable(){
    //deletes the table
    const rootParent = document.getElementById('featured-bugs');
    if (rootParent != null) {
    while(rootParent.firstElementChild != null){
        rootParent.removeChild(rootParent.firstElementChild)
    }
    }
}

/* Generate Table of pre-existing bugs onto  */

let attachBugCard = function (dataSet, empData, filter) {
    const rootParent = document.getElementById('featured-bugs');
    if (filter === 'all') {
        for (let j = 0; j < dataSet.length; j++) {
            rootParent.appendChild(generateBugCard(dataSet[j], empData));
        }
    } else {
        for (let i = 0; i < dataSet.length; i++) {
            if (dataSet[i].complete == filter) {
            rootParent.appendChild(generateBugCard(dataSet[i], empData));
            }
        }
    }
}

let generateBugCard = function (dataSet, empData) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    let getName;
    let dataEmpNumber = dataSet.employee;
    for (i=0; i < empData.length; i++) {
        if (empData[i].employee_id == dataEmpNumber) {
            getName = `${empData[i].first_name} ${empData[i].last_name}`;
            break;
        }
    }
    const br = document.createElement('br');
    const br1 = document.createElement('br')
    /* Add content to card */
    fieldset.appendChild(generateHeader(dataSet));
    fieldset.appendChild(generateTextArea(dataSet));
    fieldset.appendChild(br);
    fieldset.appendChild(generateUrgency(dataSet));
    fieldset.appendChild(generateName(dataSet, empData, getName, dataEmpNumber));
    fieldset.appendChild(br1)
    fieldset.appendChild(generateUpdate(dataSet));
    fieldset.appendChild(generateSubmitUpdate(dataSet));
    fieldset.appendChild(generateDelete(dataSet));
    if (dataSet.complete === 0) {
    fieldset.appendChild(generateResolved(dataSet));
    }
    /* Complete append of items to document. */
    form.appendChild(fieldset);

    return form;
}

let generateLabel = function (name, content) {
    const label = document.createElement('label');
    label.setAttribute('for', name);
    label.textContent = content
    return label;
}

let generateTextArea = function (dataSet) {
    const textArea = document.createElement('textarea');
    textArea.setAttribute('name', `description${dataSet.bug_id}`);
    textArea.setAttribute('rows', 4);
    textArea.setAttribute('columns', 150);
    textArea.setAttribute('id', `description${dataSet.bug_id}`);
    textArea.textContent = dataSet.description;
    textArea.disabled = true;
    return textArea;
}

let generateHeader = function (dataSet) {
    const header = document.createElement('h3');
    header.setAttribute('resolved', dataSet.complete);
    let resolveStatus = ''
    if (dataSet.complete == 1) {
        resolveStatus = 'Resolved'
        header.style.textDecoration = "line-through";
    }
    header.textContent = "Bug" + " " + dataSet.bug_id + " " + resolveStatus;
    return header;
}

let generateUrgency = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `urgency${dataSet.bug_id}`);
    input.setAttribute('value', dataSet.urgency);
    input.disabled = true;
    const label = generateLabel(`urgency${dataSet.bug_id}`, ' Urgency Level: ')
    label.appendChild(input);
    return label;
}

let generateName = function (dataSet, empData, empName, dataEmpNumber) {
    const input = document.createElement('select');
    const employeeNum = `employee${dataSet.bug_id}`;
    input.setAttribute('id', employeeNum);

    let nullOption = document.createElement('option')
    nullOption.setAttribute('value', null);
    nullOption.textContent = ''
    input.appendChild(nullOption)

    for (i = 0; i < empData.length; i++) {

        const empName = `${empData[i].first_name} ${empData[i].last_name}`
        employee_option = addRowEmployeeDropDown(empData[i].employee_id, empName);
        input.add(employee_option)

        if(empData[i].employee_id === dataEmpNumber){
            employee_option.selected = true;   
        }
    }
    
    input.disabled = true;
    const label = generateLabel(employeeNum, ' Employee Assigned: ');
    label.appendChild(input);
    return label;
}

let generateUpdate = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('id', `edit${dataSet.bug_id}`)
    input.setAttribute('value', 'Edit');
    input.setAttribute('onclick', "revealUpdate(" + dataSet.bug_id + ")")
    return input;
}

let generateDelete = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('id', `delete${dataSet.bug_id}`);
    input.setAttribute('value', 'Delete');
    input.setAttribute('onclick', 'deleteRow(' + dataSet.bug_id + ')');
    return input;
}

let generateResolved = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('id', `resolved${dataSet.bug_id}`);
    input.setAttribute('value', 'Resolved');
    input.setAttribute('onclick', 'resolveIssue('+ dataSet.bug_id + ')');
    return input;
}

let generateSubmitUpdate = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'button');
    input.setAttribute('id', `submit_update${dataSet.bug_id}`);
    input.setAttribute('value', 'Update')
    input.setAttribute('onclick', "submitUpdate(" + dataSet.bug_id + ")");
    input.hidden = true;
    return input;
}

let addRowEmployeeDropDown = function (empId, empName) {
    let dataPoint = document.createElement('option');
    dataPoint.setAttribute('value', empId);
    dataPoint.textContent = empName;
    return dataPoint;
}

let addEmployeeDropDown = function (dataSet) {
    const empInput = document.getElementById('new_employee_input');

    while (empInput.firstElementChild != null) {
        empInput.removeChild(empInput.firstElementChild)
    }

    let initialDropdownDisplay = document.createElement('option')
    initialDropdownDisplay.setAttribute('value', null);
    initialDropdownDisplay.textContent = ''
    empInput.appendChild(initialDropdownDisplay)

    for (i = 0; i < dataSet.length; i++) {
        let dataPoint = document.createElement('option');
        dataPoint.setAttribute('value', dataSet[i].employee_id);
        dataPoint.textContent = `${dataSet[i].first_name} ${dataSet[i].last_name}`;
        empInput.add(dataPoint)
    }
}


// Onclick functions for table operations.

let revealUpdate = function(bug_id) {
    let description = document.getElementById(`description${bug_id}`);
    let urgency = document.getElementById(`urgency${bug_id}`);
    let employee = document.getElementById(`employee${bug_id}`);
    let edit = document.getElementById(`edit${bug_id}`);
    let submit = document.getElementById(`submit_update${bug_id}`);

    description.disabled = false;
    urgency.disabled = false;
    employee.disabled = false;
    edit.hidden = true;
    submit.hidden = false;
};

let submitUpdate = function(bug_id) {
    let description = document.getElementById(`description${bug_id}`).value;
    let urgency = document.getElementById(`urgency${bug_id}`).value;
    let employee = document.getElementById(`employee${bug_id}`).value;

    var body= {description, urgency, employee, bug_id};

    let req = new XMLHttpRequest();

    req.open('PUT', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
        }
        else{
            console.log(req.statusText)
        }

    deleteTable();
    addEmployeeDropDown(response['employees']);
    attachBugCard(response['rows'], response['employees'], 'all');
    });
    
};

let resolveIssue = function(bug_id) {
    const resolved = 1;
    var body = {resolved, bug_id};

    let req = new XMLHttpRequest();

    req.open('PUT', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
        }
        else{
            console.log(req.statusText)
        }

    deleteTable();
    addEmployeeDropDown(response['employees']);
    attachBugCard(response['rows'], response['employees'], 'all');
    });
}

let deleteRow = function(bug_id) {
    var body = {bug_id}

    let req = new XMLHttpRequest();

    req.open('DELETE', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(body));
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
        }
        else{
            console.log(req.statusText)
        }

    deleteTable();
    addEmployeeDropDown(response['employees']);
    attachBugCard(response['rows'], response['employees'], 'all');
    });
}

let baseUrl = "http://flip1.engr.oregonstate.edu:4756/bugs"

//Initial Display Get request
let getRequest = function(filter) {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true);
    req.send(null);
    
    req.addEventListener('load', function(){
        if (req.status >=200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
        
        } else {
            console.log(req.statusText);
        }
        deleteTable();
        addEmployeeDropDown(response['employees'])
        attachBugCard(response['rows'], response['employees'], filter)
        // event.preventDefault();
    });
}

//Event listener for new bugs button
document.getElementById('new_submit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    req.open("POST", baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
        }
        else{
            console.log(req.statusText)
        }
        deleteTable();
        addEmployeeDropDown(response['employees']);
        attachBugCard(response['rows'], response['employees'], 'all');
    });
    new_bug_data = getNewBugData()
    req.send(JSON.stringify(new_bug_data));


    event.preventDefault();
  });


// Load all bugs on page initially
document.addEventListener('DOMContentLoaded', function(event) {
    getRequest('all');
    event.preventDefault();
});

// Filters for displaying elements.
document.getElementById('resolved_filter').addEventListener('click', function(event) {
    let filter = document.getElementById('resolved_filter').value;
    getRequest(filter);
    event.preventDefault();
});

document.getElementById('unresolved_filter').addEventListener('click', function(event) {
    let filter = document.getElementById('unresolved_filter').value;
    getRequest(filter);
    event.preventDefault();
});

document.getElementById('all_filter').addEventListener('click', function(event) {
    let filter = document.getElementById('all_filter').value;
    getRequest(filter);
    event.preventDefault();
});

// Reveal items so that contents can be updated.