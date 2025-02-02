// main.js
import Manager from "./manager.js";
import PartTime from "./partTime.js";

class Main {
  constructor() {
    this.employees = [];
    this.initializeEmployees();
    this.displayEmployees();
    this.displayMenu();
  }

  initializeEmployees() {
    // Create and add 3 initial employees to match the screenshot exactly
    this.employees.push(new Manager("Thomas", 38, 10));
    this.employees.push(new Manager("Connor", 44, 5));
    this.employees.push(new PartTime("Jack", 23, 8, 12));
  }

  displayMenu() {
    // Display the menu and prompt for user input
    let choice = prompt(`Main Menu:
    1. Add Employee
    2. Remove Employee
    3. Edit Employee
    4. Display Employees
    Enter your selection:`);

    // Handle user input using if...else if statements
    if (choice === "1") {
      this.addEmployee();
    } else if (choice === "2") {
      this.removeEmployee();
    } else if (choice === "3") {
      this.editEmployee();
    } else if (choice === "4") {
      this.displayEmployees();
    } else {
      alert("Invalid choice. Please try again.");
    }

    // Continue displaying the menu and employees unless the user cancels the prompt
    if (choice !== null) {
      console.clear();
      this.displayEmployees();
      this.displayMenu();
    }
  }

  addEmployee() {
    // Prompt for employee data
    let input = prompt(
      "Enter employee name, age, hours/wk, pay rate (separate each by a comma):"
    );
    let employeeData = input.split(",");

    // Trim whitespace from each input value
    employeeData = employeeData.map((element) => element.trim());

    // Extract data and convert to appropriate types
    let name = employeeData[0];
    let age = parseInt(employeeData[1]);
    let hours = parseFloat(employeeData[2]);
    let payRate = parseFloat(employeeData[3]);

    // Create Manager or PartTime instance based on hours
    if (hours >= 40) {
      this.employees.push(new Manager(name, age, payRate));
    } else {
      this.employees.push(new PartTime(name, age, payRate, hours));
    }
  }

  removeEmployee() {
    // Prompt for employee name or ID
    let input = prompt("Enter the name or ID of the employee to remove:");

    // Check if the input is a number (ID) or a string (name)
    if (!isNaN(input) && input !== null && input !== "") {
      let idToRemove = parseInt(input);
      // Remove by ID, adjusting for 1-based indexing in the prompt
      if (idToRemove > 0 && idToRemove <= this.employees.length) {
        this.employees.splice(idToRemove - 1, 1);
      } else {
        alert("Invalid ID. Please enter a valid employee ID.");
      }
    } else if (input !== null && input !== "") {
      // Remove by name (case-insensitive)
      let nameToRemove = input.toLowerCase();
      this.employees = this.employees.filter(
        (employee) => employee.name.toLowerCase() !== nameToRemove
      );
    } else {
      // Handle the case where the input is empty or null (canceled prompt)
      alert("No employee name or ID entered.");
    }
  }

  editEmployee() {
    // Prompt for employee ID
    let idToEdit = parseInt(prompt("Enter the ID of the employee to edit:"));

    if (idToEdit > 0 && idToEdit <= this.employees.length) {
      // Prompt for new pay rate
      let newPayRate = parseFloat(prompt("Enter the new pay rate:"));
      // Update pay rate and recalculate salary
      this.employees[idToEdit - 1].payRate = newPayRate;
      this.employees[idToEdit - 1].calculatePay();
    } else {
      alert("Invalid ID. Please enter a valid employee ID.");
    }
  }

  displayEmployees() {
    // Display employee information with headers and formatting
    console.log("My Employees");
    console.log(
      "ID\tName\tAge\tSalary\thrs\tpay\tFT/PT" //Updated the headers to match screenshot
    );

    this.employees.forEach((employee, index) => {
      // Display "N/A" for hours if not applicable (for managers)
      let hours = employee.hours ? employee.hours : "N/A"; //Updated to match screenshot
      let type =
        employee.employeeType === "Manager" ? "Full Time" : "Part Time"; //Updated to match screenshot
      let pay = employee.payRate;
      console.log(
        `${index + 1}\t${employee.name}\t${employee.age}\t${
          employee.annualSalary
        }\t${hours}\t${pay}\t${type}`
      );
    });
  }
}

// Instantiate the Main class to start the application
new Main();
