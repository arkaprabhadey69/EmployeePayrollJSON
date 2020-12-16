let isUpdate=false;
let employeePayrollObj={};
 window.addEventListener('DOMContentLoaded',(event)=>{

const name=document.querySelector('#name');
const textError=document.querySelector('.name-error');
name.addEventListener('input',function(){
  if(name.value.length==0){
      textError.textContent="";
      return;
  }
  try{
(new EmployeePayrollData()).name= name.value;
textError.textContent="";
  }
  catch(e){
      textError.textContent=e;
  }}
);
const salary = document.querySelector('#salary');
const output = document.querySelector('.salary-output');
output.textContent = salary.value;
salary.addEventListener('input', function () {
output.textContent = salary.value;
});

 checkForUpdates();
    

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

const checkForUpdates= () => {
    const employeePayrollJSOn= localStorage.getItem("editEmp");
    isUpdate=employeePayrollJSOn? true:false;
    if(!isUpdate) return;
    employeePayrollObj=JSON.parse(employeePayrollJSOn);
    setForm();
}

const setForm = ()=> {
    setValues('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profile);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._department);
    setValues('#salary',employeePayrollObj._salary);
    setTextValues('.salary-output', employeePayrollObj._salary);
    let date=stringifyDate(employeePayrollObj._startDate).split(" ");
    setValues('#day',date[0]);
    setValues('#month',date[1]);
    setValues('#year',date[2]);
}

const setSelectedValues=(propertyValue,value)=>{
    let allItems=document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked=true;
            }
        }
        else if(item.value===value)
            item.checked=true;
    });

}
const setTextValues = (id, value) => {
      const element = document.querySelector(id);
     element.textContent = value;
 }
 const setValues=(id,value)=>{
    const element=document.querySelector(id);
    element.value=value;
}