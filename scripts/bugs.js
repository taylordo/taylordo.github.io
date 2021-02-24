
/* New bug submission data harvested from form */

let getBugData = function() {
const description = document.getElementById('newdescription').value;
const urgency = document.getElementById('newurgency').value;
const completion = document.getElementById('newcompletion').value;
const employee = document.getElementById('newemployee').value;

let bugSubData = {};
bugSubData["description"] = description;
bugSubData["urgency"] = urgency;
bugSubData["completion"] = completion;
bugSubData["employee"] = employee;

console.log(bugSubData);

return bugSubData
}

/* Generate Table of pre-existing bugs onto  */

let attachBugCard = function (dataSet) {
    const rootParent = document.getElementById('featured-bugs');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateBugCard(dataSet[i]));
    }
}

let generateBugCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    const br = document.createElement('br');
    const br1 = document.createElement('br')
    /* Add content to card */
    fieldset.appendChild(generateHeader(dataSet));
    fieldset.appendChild(generateTextArea(dataSet));
    fieldset.appendChild(br);
    fieldset.appendChild(generateUrgency(dataSet));
    fieldset.appendChild(generateName(dataSet));
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
    textArea.setAttribute('id', 'description');
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
    header.textContent = "Bug" + " " + dataSet.id + " " + resolveStatus;
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

let generateName = function (dataSet) {
    const input = document.createElement('input');
    const employeeNum = `employee${dataSet.id}`
    input.setAttribute('type', 'text');
    input.setAttribute('id', employeeNum);
    input.setAttribute('value', dataSet.employee);
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

/* TEST Table Data */
const testData = [{'id': '001', 
                   'description': 'This is the first item in the lise',
                   'urgency': '1',
                   'employee': 'Phil Mckracken',
                   'resolved': false
                   },
                   {'id': '002', 
                    'description': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, sed accusantium. Porro, vero aliquam consectetur reiciendis, quas, ab architecto tempore tempora voluptates illo reprehenderit in vel temporibus sequi facilis inventore?',
                    'urgency': '2',
                    'employee': 'Bill Braskerman',
                    'resolved': true
                   },
                   {'id': '003',
                    'description': 'Backend Will not connect to MariaDB due to CORS error, I am currently too dumb to figure it out.',
                    'urgency': '3',
                    'employee': 'Don',
                    'resolved': false}]

let baseUrl = "https://flip2.engr.oregonstate.edu:4756/"

const loadContent = function(event){
    var req = new XMLHttpRequest();
    req.open('GET', baseUrl, false);
    req.send(null);
    if (req.status >=200 && req.status < 400) {
    var response = JSON.parse(req.responseText);
    } else {
        console.log(req.statusText);
    }
    console.log(response);
    // makeTable(response);
    // event.preventDefault();
};

document.addEventListener('DOMContentLoaded', loadContent);

document.getElementById('newsubmit').addEventListener('click', getBugData);