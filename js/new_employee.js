
window.addEventListener('DOMContentLoaded', (event)=>{
    const name=document.querySelector('#name');
const textError=document.querySelector('.name-error');
name.addEventListener('input',function(){
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-z\\s]{2,}$');
  if(name.value.length==0||nameRegex.test(name.value)){
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
);});