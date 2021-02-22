/* New employee submission data harvested from form */

let getNewEmployeeData = function() {
    const first_name_input = document.getElementById('first-name-input').value;
    const last_name_input = document.getElementById('last-name-input').value;
    const email_input = document.getElementById('email-input').value;
    const date_input = document.getElementById('date-input').value;
    
    let new_employee_data = {};
    new_employee_data["first_name_input"] = first_name_input;
    new_employee_data["last_name_input"] = last_name_input;
    new_employee_data["email_input"] = email_input;
    new_employee_data["date_input"] = date_input;
    
    return new_employee_data;
}

function deleteTable(){
    //deletes the table
    const rootParent = document.getElementById('featured-employees');
    
    while(rootParent.firstElementChild != null){
        rootParent.removeChild(rootParent.firstElementChild)
    }

}

let displayTable = function (dataSet) {
    const rootParent = document.getElementById('featured-employees');
    for (let i = 0; i < dataSet.length; i++) {
        rootParent.appendChild(generateEmployeeCard(dataSet[i]));
    }
}

let generateEmployeeCard = function (dataSet) {
    const form = document.createElement('form');
    const fieldset = document.createElement('fieldset');
    /* Add content to card */
    fieldset.appendChild(generateID(dataSet));
    fieldset.appendChild(generateFirstName(dataSet));
    fieldset.appendChild(generateLastName(dataSet));
    fieldset.appendChild(generateEmail(dataSet));
    fieldset.appendChild(generateDate(dataSet));
    fieldset.appendChild(generateEditButton(dataSet));
    fieldset.appendChild(generateDeleteButton(dataSet));

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

let generateID = function (dataSet) {
    const id = document.createElement('span');
    id.textContent = dataSet['employee_id'] + ':';
    id.className = 'employee-id'
    return id;
}

let generateFirstName = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `first-name${dataSet.id}`);
    input.setAttribute('value', dataSet.first_name)
    input.disabled = true;
    const label = generateLabel(`first-name${dataSet.id}`, ' First Name: ');
    label.appendChild(input);
    return label;

}

let generateLastName = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', `last-name${dataSet.id}`);
    input.setAttribute('value', dataSet.last_name)
    input.disabled = true;
    const label = generateLabel(`last-name${dataSet.id}`, ' Last Name: ');
    label.appendChild(input);
    return label;
}

let generateEmail = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'email');
    input.setAttribute('id', `email${dataSet.id}`);
    input.setAttribute('value', dataSet.email_address)
    input.disabled = true;
    const label = generateLabel(`email${dataSet.id}`, ' Email: ');
    label.appendChild(input);
    return label;
}

let truncateDate = function(longDate){
    //takes the longDate from sql as a parameter and cuts the time off the end
    date = ""
    for (j=0; j<longDate.length; j++){
        if (longDate[j] == 'T'){
            break;
        }
        else{
            date += longDate[j]
        }
    }
    return date;
}



let generateDate = function (dataSet) {
    const input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.setAttribute('id', `date${dataSet.id}`);
    input.setAttribute('value', truncateDate(dataSet.date_of_hire))
    input.disabled = true;
    const label = generateLabel(`date${dataSet.id}`, ' Date of Hire: ');
    label.appendChild(input);
    return label;
}

let generateEditButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `edit${dataSet.id}`);
    input.setAttribute('value', 'Edit');
    return input;
}

let generateDeleteButton = function (dataSet) {
    let input = document.createElement('input');
    input.setAttribute('type', 'submit');
    input.setAttribute('id', `delete${dataSet.id}`);
    input.setAttribute('value', 'Delete');
    return input;
}


const testData = [{'id': '001', 
                   'first_name': 'Frank',
                   'last_name': 'Thomas',
                   'email': 'fthomas@email.com',
                   'date': '2016-02-02'
                   },
                   {'id': '002', 
                    'first_name': 'Eric',
                    'last_name': 'Johnson',
                    'email': 'ejohnson@email.com',
                    'date': '2014-02-02'
                   },
                {'id': '003',
                'first_name': 'Donald',
                'last_name': 'Taylor',
                'email': 'taylordo@oregonstate.edu',
                'date': '2021-02-16'}]

let baseUrl = "http://flip1.engr.oregonstate.edu:4756/"

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

        displayTable(response['rows'])
        event.preventDefault();
    })

});

//Event listener for new employee button
document.getElementById('new-employee-submit-button').addEventListener('click', function(event){
    var req = new XMLHttpRequest();
    req.open("POST", baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    
    req.addEventListener('load',function(){
        if(req.status >=200 && req.status < 400){
            var response = JSON.parse(req.responseText)
            
            deleteTable()
            displayTable(response['rows'])
        }
        else{
            console.log(req.statusText)
        }
    });
    
    new_employee_data = getNewEmployeeData()
    req.send(JSON.stringify(new_employee_data));
    document.getElementById("new-employee-form").reset();
    event.preventDefault();

  })

