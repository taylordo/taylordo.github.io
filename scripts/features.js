/* Retrieve data for new feature submission */

let getFeatData = function() {
    const description = document.getElementById('newdescription').value;
    const date = document.getElementById('newdate').value;
    const status = document.getElementById('newstatus').value;
    const team = document.getElementById('newteam').value;
    
    let featSubData = {};
    featSubData["description"] = description;
    featSubData["date"] = date;
    featSubData["status"] = status;
    featSubData["team"] = team;

    console.log(featSubData)
    
    return featSubData
    }

/* Generate Table of pre-existing Features onto  */

let attachFeatCard = function (dataSet) {
    const rootParent = document.getElementById('featured-features');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateFeatCard(dataSet[i]));
    }
}

let generateFeatCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    const br = document.createElement('br');
    /* Add content to card */
    fieldset.appendChild(generateHeader(dataSet));
    fieldset.appendChild(generateTextArea(dataSet));
    fieldset.appendChild(br);
    fieldset.appendChild(generateDate(dataSet));
    fieldset.appendChild(generateStatus(dataSet));
    fieldset.appendChild(generateTeam(dataSet));
    fieldset.appendChild(generateUpdate(dataSet));
    fieldset.appendChild(generateDelete(dataSet));
    

    /* Complete append of items to document. */
    form.appendChild(fieldset);

    return form;
}

let generateHeader = function (dataSet) {
    const header = document.createElement('h3');
    header.textContent = "Feature" + " " + dataSet.id;
    return header;
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

let generateDate = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', `date${dataSet.id}`);
    input.setAttribute('value', dataSet.date);
    input.disabled = true;
    const label = generateLabel(`date${dataSet.id}`, ' Deadline: ')
    label.appendChild(input);
    return label;
}

let generateStatus = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'number');
    input.setAttribute('id', `status${dataSet.id}`)
    input.setAttribute('value', dataSet.status);
    const label = generateLabel(`status${dataSet.id}`, 'Status: ');
    label.appendChild(input);
    return label;
}

let generateTeam = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `team${dataSet.id}`)
    input.setAttribute('value', dataSet.team);
    const label = generateLabel(`team${dataSet.id}`, 'Team Assigned: ');
    label.appendChild(input);
    return label;
}

let generateUpdate = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit${dataSet.id}`);
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


/* TEST Table Data */
const testData = [{'id': '001', 
                   'description': 'This is the first item in the lise',
                   'date': '2012-10-02',
                   'status': 1,
                   'team': 'Front End'
                   },
                   {'id': '002', 
                   'description': 'Another item',
                   'date': '2012-11-12',
                   'status': 1,
                   'team': 'Anything Goes'
                   },
                   {'id': '003', 
                   'description': 'Add a nice layout',
                   'date': '2015-02-02',
                   'status': 0,
                   'team': 'Back End'}]

document.addEventListener('DOMContentLoaded', attachFeatCard(testData));
document.getElementById('newsubmit').addEventListener('click', getFeatData);