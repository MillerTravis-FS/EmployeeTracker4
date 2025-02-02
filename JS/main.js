// employee.js
class Employee {
  constructor(name, age, annualSalary) {
    this.name = name;
    this.age = age;
    this.annualSalary = annualSalary; //All employees will have this property, even though it may be calculated differently
  }
}

// manager.js
class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "Manager";
    this.calculatePay(); // Calculate salary upon creation
  }

  calculatePay() {
    // Manager employees have a 40+ hour work week and a $1000 deduction
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}

// partTime.js
class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Part Time";
    this.calculatePay(); // Calculate salary upon creation
  }

  calculatePay() {
    // Part-time employees have a <40 hour work week
    this.annualSalary = this.payRate * this.hours * 52;
  }
}

// main.js
class Main {
  constructor() {
    this.employees = [];
    this.initializeEmployees();
    this.displayEmployees();
    this.displayMenu();
  }

  initializeEmployees() {
    // Hardcode 3 initial employees
    this.employees.push(new Manager("Scott", 44, 5));
    this.employees.push(new PartTime("Dave", 40, 5, 38));
    this.employees.push(new PartTime("Lisa", 23, 8, 30));
  }

  displayMenu() {
    // Display the menu using a prompt and handle user input
    let choice = prompt(`Main Menu:
      1. Add Employee
      2. Remove Employee
      3. Edit Employee
      4. Display Employees
      Enter your selection:`);

    switch (choice) {
      case "1":
        this.addEmployee();
        break;
      case "2":
        this.removeEmployee();
        break;
      case "3":
        this.editEmployee();
        break;
      case "4":
        this.displayEmployees();
        break;
      default:
        alert("Invalid choice. Please try again.");
    }

    if (choice !== null) {
      //clears the console and redisplays the employee table and menu
      console.clear();
      this.displayEmployees();
      this.displayMenu();
    }
  }

  addEmployee() {
    // Prompt for employee data, create the appropriate instance, and add it to the array
    let input = prompt(
      "Enter employee name, age, hours/wk, pay rate (separate each by a comma):"
    );
    let employeeData = input.split(",");

    // Trim whitespace from each element in employeeData
    employeeData = employeeData.map((element) => element.trim());

    let name = employeeData[0];
    let age = parseInt(employeeData[1]);
    let hours = parseFloat(employeeData[2]);
    let payRate = parseFloat(employeeData[3]);

    if (hours >= 40) {
      this.employees.push(new Manager(name, age, payRate));
    } else {
      this.employees.push(new PartTime(name, age, payRate, hours));
    }
  }

  removeEmployee() {
    // Prompt for employee name or ID and remove the corresponding employee
    let input = prompt("Enter the name or ID of the employee to remove:");

    // if input is a number and not NaN (Not a Number)
    if (!isNaN(input)) {
      let idToRemove = parseInt(input);

      if (idToRemove > 0 && idToRemove <= this.employees.length) {
        this.employees.splice(idToRemove - 1, 1);
      } else {
        alert("Invalid ID. Please enter a valid employee ID.");
      }
      // else if the input is not a number then it must be a string, which represents a name
    } else {
      let nameToRemove = input;
      this.employees = this.employees.filter(
        (employee) => employee.name.toLowerCase() !== nameToRemove.toLowerCase()
      );
    }
  }

  editEmployee() {
    // Prompt for employee ID and new pay rate, then update the employee
    let idToEdit = parseInt(prompt("Enter the ID of the employee to edit:"));

    if (idToEdit > 0 && idToEdit <= this.employees.length) {
      let newPayRate = parseFloat(prompt("Enter the new pay rate:"));
      this.employees[idToEdit - 1].payRate = newPayRate;
      this.employees[idToEdit - 1].calculatePay(); // Recalculate salary after editing pay rate
    } else {
      alert("Invalid ID. Please enter a valid employee ID.");
    }
  }

  displayEmployees() {
    // Display employee information in the console, formatted with tabs
    console.log("My cool Employees");
    console.log("ID\tName\tAge\tSalary\thrs\tpay\tFT/PT");

    this.employees.forEach((employee, index) => {
      let hours = employee.hours ? employee.hours : "N/A"; // if hours exists display the hours, otherwise display N/A
      let type = employee.employeeType;
      let pay = employee.payRate;
      console.log(
        `${index + 1}\t${employee.name}\t${employee.age}\t${
          employee.annualSalary
        }\t${hours}\t${pay}\t${type}`
      );
    });
  }
}

// IIFE
(() => {
  const main = new Main();
})();
