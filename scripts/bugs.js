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

let baseUrl = "http://flip2.engr.oregonstate.edu:4756/"

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

        attachBugCard(response['rows'])
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
    event.preventDefault();

  })



  // Reference
//   let displayTable = function (dataSet) {
//     const rootParent = document.getElementById('featured_bugs');
//     for (let i = 0; i < dataSet.length; i++) {
//         rootParent.appendChild(generateBugCard(dataSet[i]));
//     }
// }

// let generateEmployeeCard = function (dataSet) {
//     const form = document.createElement('form');
//     const fieldset = document.createElement('fieldset');
//     /* Add content to card */
//     fieldset.appendChild(generateID(dataSet));
//     fieldset.appendChild(generateFirstName(dataSet));
//     fieldset.appendChild(generateLastName(dataSet));
//     fieldset.appendChild(generateEmail(dataSet));
//     fieldset.appendChild(generateDate(dataSet));
//     fieldset.appendChild(generateEditButton(dataSet));
//     fieldset.appendChild(generateDeleteButton(dataSet));

//     /* Complete append of items to document. */
//     form.appendChild(fieldset);

//     return form;
// }

// let generateLabel = function (name, content) {
//     const label = document.createElement('label');
//     label.setAttribute('for', name);
//     label.textContent = content
//     return label;
// }

// let generateID = function (dataSet) {
//     const id = document.createElement('span');
//     id.textContent = dataSet['employee_id'] + ':';
//     id.className = 'employee-id'
//     return id;
// }

// let generateFirstName = function (dataSet) {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'text');
//     input.setAttribute('id', `first-name${dataSet.id}`);
//     input.setAttribute('value', dataSet.first_name)
//     input.disabled = true;
//     const label = generateLabel(`first-name${dataSet.id}`, ' First Name: ');
//     label.appendChild(input);
//     return label;

// }

// let generateLastName = function (dataSet) {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'text');
//     input.setAttribute('id', `last-name${dataSet.id}`);
//     input.setAttribute('value', dataSet.last_name)
//     input.disabled = true;
//     const label = generateLabel(`last-name${dataSet.id}`, ' Last Name: ');
//     label.appendChild(input);
//     return label;
// }

// let generateEmail = function (dataSet) {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'email');
//     input.setAttribute('id', `email${dataSet.id}`);
//     input.setAttribute('value', dataSet.email_address)
//     input.disabled = true;
//     const label = generateLabel(`email${dataSet.id}`, ' Email: ');
//     label.appendChild(input);
//     return label;
// }

// let truncateDate = function(longDate){
//     //takes the longDate from sql as a parameter and cuts the time off the end
//     date = ""
//     for (j=0; j<longDate.length; j++){
//         if (longDate[j] == 'T'){
//             break;
//         }
//         else{
//             date += longDate[j]
//         }
//     }
//     return date;
// }



// let generateDate = function (dataSet) {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'date');
//     input.setAttribute('id', `date${dataSet.id}`);
//     input.setAttribute('value', truncateDate(dataSet.date_of_hire))
//     input.disabled = true;
//     const label = generateLabel(`date${dataSet.id}`, ' Date of Hire: ');
//     label.appendChild(input);
//     return label;
// }

// let generateEditButton = function (dataSet) {
//     let input = document.createElement('input');
//     input.setAttribute('type', 'submit');
//     input.setAttribute('id', `edit${dataSet.id}`);
//     input.setAttribute('value', 'Edit');
//     return input;
// }

// let generateDeleteButton = function (dataSet) {
//     let input = document.createElement('input');
//     input.setAttribute('type', 'submit');
//     input.setAttribute('id', `delete${dataSet.id}`);
//     input.setAttribute('value', 'Delete');
//     return input;
// }