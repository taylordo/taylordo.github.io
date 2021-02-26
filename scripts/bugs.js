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
    
    console.log(new_bug_data)
    return new_bug_data;
}

function deleteTable(){
    //deletes the table
    const rootParent = document.getElementById('featured_bugs');
    
    while(rootParent.firstElementChild != null){
        rootParent.removeChild(rootParent.firstElementChild)
    }

}

/* Generate Table of pre-existing bugs onto  */

let attachBugCard = function (dataSet, empData) {
    const rootParent = document.getElementById('featured-bugs');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateBugCard(dataSet[i], empData));
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
    fieldset.appendChild(generateName(dataSet, getName));
    fieldset.appendChild(br1)
    fieldset.appendChild(generateUpdate(dataSet));
    fieldset.appendChild(generateDelete(dataSet));
    fieldset.appendChild(generateResolved(dataSet));

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
    textArea.setAttribute('name', `description${dataSet.id}`);
    textArea.setAttribute('rows', 4);
    textArea.setAttribute('columns', 150);
    textArea.setAttribute('bug_id', 'description');
    textArea.textContent = dataSet.description;
    textArea.disabled = true;
    return textArea;
}

let generateHeader = function (dataSet) {
    const header = document.createElement('h3');
    header.setAttribute('resolved', dataSet.resolved);
    let resolveStatus = ''
    if (dataSet.resolved === true) {
        resolveStatus = 'Resolved'
        header.style.textDecoration = "line-through";
    }
    header.textContent = "Bug" + " " + dataSet.bug_id + " " + resolveStatus;
    return header;
}

let generateUrgency = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `urgency${dataSet.id}`);
    input.setAttribute('value', dataSet.urgency);
    input.disabled = true;
    const label = generateLabel(`urgency${dataSet.id}`, ' Urgency Level: ')
    label.appendChild(input);
    return label;
}

let generateName = function (dataSet, empName) {
    const input = document.createElement('input');
    const employeeNum = `employee${dataSet.id}`
    input.setAttribute('type', 'text');
    input.setAttribute('id', employeeNum);
    input.setAttribute('value', empName);
    input.disabled = true;
    const label = generateLabel(employeeNum, ' Employee Assigned: ');
    label.appendChild(input);
    return label;
}

let generateUpdate = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit${dataSet.id}`)
    input.setAttribute('value', 'Edit');
    return input;
}

let generateDelete = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete${dataSet.id}`);
    input.setAttribute('value', 'Delete');
    return input;
}

let generateResolved = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `resolved${dataSet.id}`);
    input.setAttribute('value', 'Resolved');
    return input;
}

let addEmployeeDropDown = function (dataSet) {
    console.log(dataSet)
    const empInput = document.getElementById('new_employee_input');
    for (i = 0; i < dataSet.length; i++) {
        let dataPoint = document.createElement('option');
        dataPoint.setAttribute('value', dataSet[i].employee_id);
        dataPoint.textContent = `${dataSet[i].first_name} ${dataSet[i].last_name}`;
        empInput.add(dataPoint)
    }
}

let baseUrl = "http://flip1.engr.oregonstate.edu:4759/"

//Initial Display
document.addEventListener('DOMContentLoaded', function(event) {
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, true);
    req.send(null);
    
    req.addEventListener('load', function(){
        if (req.status >=200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
        
        } else {
            console.log(req.statusText);
        }

        console.log(response);
        addEmployeeDropDown(response['employees'])
        attachBugCard(response['rows'], response['employees'])
        event.preventDefault();
    })

});

//Event listener for new bugs button
document.getElementById('new_submit').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    req.open("POST", baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
            // deleteTable()
            // attachBugCard(response['rows'])
            console.log(response)
        }
        else{
            console.log(req.statusText)
        }
    });
    
    new_bug_data = getNewBugData()
    console.log(new_bug_data)
    req.send(JSON.stringify(new_bug_data));
    // document.getElementById("new_submit").reset();
    // event.preventDefault();

  })
