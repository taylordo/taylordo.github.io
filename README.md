![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

# BugSplat 
A bugs, features, employees and teams tracking software

## Description
[Demo Video of all Features](https://www.youtube.com/watch?v=FkBK9Mp3_1M)

BugSplat is an issue tracking software developed with MySQL as a database, Node.js as a backend, and JavaScript/HTML/CSS as a frontend. The idea was to create a light weight, minimum tracking system that employers could use to manage their projects, teams/employees, and issues that pop up in the development cycle. All entities within the database are intertwined. Employees are entered into the database with a hire date, name, and email, Employees can be assigned to teams as a manager or team member, these teams can be assigned to specific features that need to be implemented, and bugs can be reported and issued to employees for review. The data is presented and saved in real time.

## Installation
Download all files and move to its own directory.

### Database
For the database there are two files. DML.sql has the implementation of the tables for the database. This should be uploaded to the MySQL database first to establish the tables. It is recommended to also upload the DDQ.sql file which contains dummy data to the database to ensure everything is working correctly. These data entries can easily be deleted on the main website or simply removed from the databse by a command.

### Website
Navigate to the main directory and run

```npm

    npm install

```

This will download all the essential node modules that are needed to run the program.

main.js will need to be updated with the proper server port and address, and the scripts will need to have their baseUrl's updated to their hosting urls.

### Usage
On the left is a navigation menu to Employees, Teams, Features, and Bugs. Navigating to each of these pages will pull up the page with a input form and any currently existing cards. Each card will have an edit, update, and delete option.

### Credits
Don Taylor - [Github](https://github.com/taylordo)
Chris Peterman - [Github](https://github.com/p0pkern)

### License
MIT License

Copyright (c) [2020] [fullname]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.