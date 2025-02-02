// partTime.js
import Employee from "./employee.js";

export default class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age);
    this.payRate = payRate;
    this.hours = hours;
    this.employeeType = "Part Time";
    this.calculatePay();
  }

  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}
