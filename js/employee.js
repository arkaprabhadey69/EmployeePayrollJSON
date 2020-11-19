class EmployeePayrollData {

    constructor(...params){
        this.name=params[0];
        this.salary=params[1];
        this.gender=params[2];
        this.startDate=params[3];
        this.department=params[4];
    }
    get name() { return this._name; }
    set name(name) { 
        let regName=RegExp('^[A-Z]{1}[a-z]{3,}$');
        if(regName.test(name)){
        this._name = name;
    } 
    else throw 'Incorrect name';
}

    get salary(){return this._salary;}
    set salary(salary){
        if(salary>0){
            this._salary=salary;
        }
        else throw 'Incorrect salary';
    }
    get gender(){return this._gender;}
    set gender(gender){
        if(gender=='F'||gender=='M'){
            this._gender=gender;
        }
        else throw 'Incorrect gender';
    }
    get startDate(){return this._startDate;}
    set startDate(startDate){
        if(startDate<new Date()){
            this._startDate=startDate;
        }
        else throw 'Sorry, Future Date';
    }
   

    toString() {
        const options={year: 'numeric', month: 'numeric', day:'numeric'};
        const empDate= this.startDate===undefined?"undefined":this.startDate.toLocaleDateString("en-US",options);
        return '\nName: ' + this.name + ' salary: ' + this.salary+ ' gender: '+ this.gender+' startDate: '+ empDate+ ' dept: '+this.department;
    }

}
// try{
//     let employeePayrollData= new EmployeePayrollData("Arkaprabha",52000,'M',new Date('2019-09-13'),'HR');
//     let employeePayrollData1= new EmployeePayrollData("Arkatyyu",52000,'M',new Date('2019-09-13'),'Finance');
// employeePayrollData.name="Orko";
// employeePayrollData.id=6;
// employeePayrollData.salary=900000;
// employeePayrollData.startDate=new Date('2019-09-13');
// console.log(employeePayrollData.toString());
// let empArray= new Array();
// empArray.push(employeePayrollData);
// empArray.push(employeePayrollData1);
// empArray.filter(employeePayrollData=>employeePayrollData.name=="Orko").forEach(employeePayrollData=>console.log(employeePayrollData.salary));
// console.log( empArray.filter(emp=>emp.name=="Arka").reduce((acc, curVal) => acc.concat(curVal), []).length);
//     empArray.sort(function(a, b){
//         var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
//         if (nameA < nameB) //sort string ascending
//             return -1 
//         if (nameA > nameB)
//             return 1
//         return 0 //default return value (no sorting)
//     });
//     empArray.forEach(emp=>console.log(emp.name));
// }
// catch(e){
//     console.error(e);

// }
const salary=document.querySelector('#salary');
const output=document.querySelector('.salary-output');
salary.addEventListener('input', function(){
    output.textContent=salary.value;
});

function save(){
    var name=document.getElementById("name").nodeValue;
    var salary=document.getElementById("salary").nodeValue;
    var gender=document.getElementById("gender").nodeValue;
    var department=document.getElementById("department").nodeValue;
    try{
    let employeePayrollData= new EmployeePayrollData(name,salary,gender,new Date(),department);
    alert(employeePayrollData.name);
}
catch(e){
    console.error(e);
}
}

/*action="#" onsubmit="save();return false"*/
