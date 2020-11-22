class EmployeePayrollData {
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
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
        return "Id: " + this.id +" Name: " + this.name + " Salary: " + this.salary + " Gender: " + this.gender + " Start Date: " + this.startDate + " Department: " + this.department+ " Profile Pic: " + this.profile+ " Notes: " + this.note;
    }
}


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
    let employee = new EmployeePayrollData();
    try {
        employee.name = document.querySelector('#name').value;
        employee.salary = document.querySelector('#salary').value;
        employee.gender=getSelectedValues('[name=gender]').pop();
        var year = document.querySelector('#year').value;
        var month = document.querySelector('#month').value;
        var day = document.querySelector('#day').value;
        employee.startDate = new Date(year, month, day);
        employee.department=getSelectedValues('[name=department]');
        employee.note=document.querySelector('#notes').value;
        employee.profile=getSelectedValues('[name=profile]').pop();
        let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
        if (employeePayrollList == undefined)
            employee.id = 1;
        else employee.id = employeePayrollList.length + 1;
        alert(employee.toString());
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

const resetForm= () => {
    setValue('#name','');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department');
    unsetSelectedValues('[name=profile]');
    setValue('#salary','40000');
    setTextValue('.salary-output','40000')
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
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}