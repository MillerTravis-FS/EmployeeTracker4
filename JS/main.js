import Manager from "./manager.js";
import PartTime from "./partTime.js";

(function () {
  class Main {
    constructor() {
      this.employees = [];
      this.initializeEmployees();
      this.displayEmployees();
      this.displayMenu();
    }

    initializeEmployees() {
      this.employees.push(new Manager("Thomas", 38, 10));
      this.employees.push(new Manager("Connor", 44, 5));
      this.employees.push(new PartTime("Jack", 23, 8, 12));
    }

    displayMenu() {
      let choice = prompt(`Main Menu:
      1. Add Employee
      2. Remove Employee
      3. Edit Employee
      4. Display Employees
      Enter your selection:`);

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

      if (choice !== null) {
        console.clear();
        this.displayEmployees();
        this.displayMenu();
      }
    }

    addEmployee() {
      let input = prompt(
        "Enter employee name, age, hours/wk, pay rate (separate each by a comma):"
      );
      let employeeData = input.split(",");

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
      let input = prompt("Enter the name or ID of the employee to remove:");

      if (!isNaN(input)) {
        let idToRemove = parseInt(input);

        if (idToRemove > 0 && idToRemove <= this.employees.length) {
          this.employees.splice(idToRemove - 1, 1);
        } else {
          alert("Invalid ID. Please enter a valid employee ID.");
        }
      } else {
        let nameToRemove = input;
        this.employees = this.employees.filter(
          (employee) =>
            employee.name.toLowerCase() !== nameToRemove.toLowerCase()
        );
      }
    }

    editEmployee() {
      let idToEdit = parseInt(prompt("Enter the ID of the employee to edit:"));

      if (idToEdit > 0 && idToEdit <= this.employees.length) {
        let newPayRate = parseFloat(prompt("Enter the new pay rate:"));
        this.employees[idToEdit - 1].payRate = newPayRate;
        this.employees[idToEdit - 1].calculatePay();
      } else {
        alert("Invalid ID. Please enter a valid employee ID.");
      }
    }

    displayEmployees() {
      console.log("My cool Employees");
      console.log("ID\tName\tAge\tSalary\thrs\tpay\tFT/PT");

      this.employees.forEach((employee, index) => {
        let hours = employee.hours ? employee.hours : "N/A";
        let type =
          employee.employeeType === "Manager" ? "Full Time" : "Part Time";
        let pay = employee.payRate;
        console.log(
          `${index + 1}\t${employee.name}\t${employee.age}\t${
            employee.annualSalary
          }\t${hours}\t${pay}\t${type}`
        );
      });
    }
  }

  new Main();
})();
