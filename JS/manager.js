// manager.js
import Employee from "./employee.js";

export default class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age);
    this.payRate = payRate;
    this.employeeType = "Manager";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.payRate * 40 * 52 - 1000;
  }
}
