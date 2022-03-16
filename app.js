const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const validator = require("email-validator");
const fs = require('fs')
const fse = require('fs-extra')

const DIST_DIR = path.resolve(__dirname, 'dist');
const distPath = path.join(DIST_DIR, 'team.html');

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,

let theTeam = [];

function startApp() {
  function addMember() {
    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want to add any team members, I am not sure why i am here!",
        ],
      },
    ])
      .then((answer) => {
        if (answer.memberChoice === "Engineer") {
          return addEngineer();
        } else if (answer.memberChoice === "Intern") {
          return addIntern();
        } else if (answer.memberChoice === "Manager") {
          return addManager();
        } else {
          console.log('No problem, You are welcome back to use my app any time!');
        }
      });
  }



  function addManager() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer === '') {
              return 'Please enter at least one character'
            }
            return true;
          }
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the team manager's id?",
          validate: (answer) => {
            if (answer.match(/^[1-9]\d*$/)) {
              return true;
            }
            return 'Please enter a positive number greater than zero. '
          }
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the team manager's email?",
          validate: (answer) => {
            if (validator.validate(answer)) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the team manager's office number?",
          validate: (answer) => {
            if (answer.match(/^[1-9]\d*$/)) {
              return true;
            }
            return 'Please enter a positive number greater than zero. '
          }
        },
      ])
      .then((answers) => {
        const newManager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        theTeam.push(newManager);

        contiQuestion()
      });

  }

  function addEngineer() {
    inquirer.prompt([
      {
        type: "input",
        name: "engineerName",
        message: "What is the team engineer's name?",
        validate: (answer) => {
          if (answer === '') {
            return 'Please enter at least one character'
          }
          return true;
        }
      },
      {
        type: "input",
        name: "engineerId",
        message: "What is the team engineer's id?",
        validate: (answer) => {
          if (answer.match(/^[1-9]\d*$/)) {
            return true;
          }
          return 'Please enter a positive number greater than zero. '
        }
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "What is the team engineer's email?",
        validate: (answer) => {
          if (validator.validate(answer)) {
            return true;
          }
          return "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "engineerGithub",
        message: "What is your engineer Github username?",
        validate: (answer) => {
          if (answer === '') {
            return 'Please enter at least one character'
          }
          return true;
        }
      },
    ])
      .then((answers) => {
        const newEngineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.engineerGithub,
        );
        theTeam.push(newEngineer);

        contiQuestion()
      });

  }

  function addIntern() {
    inquirer.prompt([
      {
        type: "input",
        name: "internName",
        message: "What is the team intern's name?",
        validate: (answer) => {
          if (answer === '') {
            return 'Please enter at least one character'
          }
          return true;
        }
      },
      {
        type: "input",
        name: "internId",
        message: "What is the team intern's id?",
        validate: (answer) => {
          if (answer.match(/^[1-9]\d*$/)) {
            return true;
          }
          return 'Please enter a positive number greater than zero. '
        }
      },
      {
        type: "input",
        name: "internEmail",
        message: "What is the team intern's email?",
        validate: (answer) => {
          if (validator.validate(answer)) {
            return true;
          }
          return "Please enter a valid email address.";
        },
      },
      {
        type: "input",
        name: "internSchool",
        message: "What is your intern school name?",
        validate: (answer) => {
          if (answer === '') {
            return 'Please enter at least one character'
          }
          return true;
        }
      },
    ])
      .then((answers) => {
        const newIntern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.internSchool
        );
        theTeam.push(newIntern);

        contiQuestion()
      });

  }

  function printHtml() {
    let myArrayteam = render(theTeam)
    fse.outputFile('newhtml/team.html', myArrayteam)
      .then(() => {
        console.log("You successfully create team file!");
      })
  }

  function contiQuestion() {
    inquirer.prompt([{
      type: "list",
      name: "memberChoice",
      message: "Would you like to add more member?",
      choices: [
        'No',
        'Yes',
      ]
    }])
      .then((answer) => {
        if (answer.memberChoice === 'No') {
          return printHtml();
        } else {
          console.log('-------');
          return addMember();
        }
      })
  }
  addMember()
}
startApp();

// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work!



