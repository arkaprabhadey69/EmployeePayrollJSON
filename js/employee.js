class EmployeePayrollData {

    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.startDate = params[3];
        this.department = params[4];
        this.profile=params[5];
        this.note=params[6];
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-z\\s]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Incorrect name";
    }
    get department() {
        return this._department;
    }
    set department(department) {
        this._department = department;
    }
    get profile() {
        return this._profile;
    }
    set profile(profile) {
        this._profile = profile;
    }
    get note() {
        return this._note;
    }
    set note(note) {
        this._note = note;
    }
    get salary() {
        return this._salary;
    }
    set salary(salary) {
        let salaryRegex = RegExp('^[1-9]{1}[0-9]*$');
        if (salaryRegex.test(salary))
            this._salary = salary;
        else throw "Salary should be non zero positive number";
    }
    get gender() {
        return this._gender;
    }
    set gender(gender) {
        if (gender != undefined) {
            let genderRegex = RegExp('^(male|female)$');
            if (genderRegex.test(gender)) {
                this._gender = gender;
            } else {
                throw "Gender incorrect";
            }
        }
    }
    get startDate() {
        return this._startDate;
    }
    set startDate(startDate) {
        if (startDate != undefined) {
            if (startDate <= new Date()) {
                const options = { year: "numeric", month: "long", day: "numeric" };
                const employeeDate = startDate.toLocaleDateString("en-US", options);
                this._startDate = employeeDate;
            }
            else throw "Select valid date!";
        }
    }
    toString() {
        return " Name: " + this.name + " Salary: " + this.salary + " Gender: " + this.gender + " Start Date: " + this.startDate + " Department: " + this.department+ " Profile Pic: " + this.profile+ " Notes: " + this.note;
    }
}

const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
salary.addEventListener('input', function () {
    output.textContent = salary.value;
});

const day = document.querySelector('#day');
const year = document.querySelector('#year');
const month = document.querySelector('#month');
const dateError = document.querySelector('.date-error');
[day, month, year].forEach(item => item.addEventListener('input', function () {
    if (month.value == 1) {
        if (isLeapYear(year.value)) {
            if (day.value > 29) {
                dateError.textContent = "Invalid Date!";
            } else dateError.textContent = "";
        } else {
            if (day.value > 28) {
                dateError.textContent = "Invalid Date!";
            } else dateError.textContent = "";
        }
    }
    if (month.value == 3 || month.value == 5 || month.value == 8 || month.value == 10) {
        if (day.value > 30) {
            dateError.textContent = "Invalid Date!";
        } else dateError.textContent = "";
    }
}));


const isLeapYear = (year) => {
    let result = false;
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                result = true;
            }
        } else {
            result = true;
        }
    }
    return result;
}

function save(){
    try{
        let employeePayrollData=createPayroll();
        createAndUpdateStorage(employeePayrollData);
    }
    catch(e){
        return;
    }
}

const createPayroll = () => {
    try {
        var name = document.querySelector('#name').value;
        var salary = document.querySelector('#salary').value;
        var gender=getSelectedValues('[name=gender]').pop();
        var year = document.querySelector('#year').value;
        var month = document.querySelector('#month').value;
        var day = document.querySelector('#day').value;
        var startDate = new Date(year, month, day);
        var department=getSelectedValues('[name=department]');
        var notes=document.querySelector('#notes').value;
        var profile=getSelectedValues('[name=profile]').pop();
        var employee = new EmployeePayrollData(name, salary, gender, startDate, department,profile,notes);
        alert(employee);
    } catch (error) {
        alert(error);
    }
    return employee;

}

const getSelectedValues =(propertyValue) => {
    let allItems= document.querySelectorAll(propertyValue);
    let selItems= [];
    allItems.forEach(item => {
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }
    else{
    employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));

}

const reset= () => {
    setValue('#name','');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department');
    unsetSelectedValues('[name=profile]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','0');
    setValue('#year','2020');

}
const unsetSelectedValues=(propertyValue)=>{
    let allItems= document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{item.checked=false});
}
const setValue=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}