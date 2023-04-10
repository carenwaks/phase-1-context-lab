/* Your Code Here */
function createEmployeeRecord(employee) {
    return {
    firstName: employee[0],   // first name to be the first index[0]
    familyName: employee[1],   // family name to be the second index[1]
    title: employee[2],      // name to be the third index[2]
    payPerHour: employee[3],  // payPerHour to be the fourth index [3]
    timeInEvents: [],   // timeInEvents to be an empty array
    timeOutEvents: []   // timeoutEvents to be an empty array
  }
}

// function to make an array out of the created employee record array above
function createEmployeeRecords(employee) {
  return employee.map(createEmployeeRecord);  
}

// function to create an array of that splits the date and hour adds it to the employee record as a new object
function createTimeInEvent(dateStamp) {
    const [date, hour] = dateStamp.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(hour),
      date: date,
    };
    return timeInEvent;
}  
console.log(createTimeInEvent());

// function to create an array of that splits the date and hour adds it to the employee record as a new object with properties
function createTimeOutEvent(employee, timeStamp) {
  let [date, hour] = timeStamp.split(' ');
  
  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date: date
  });
  
  return employee;
}  
// function to calculate hours worked
function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date);   
    let timeOut = employee.timeOutEvents.find(event => event.date === date);  
   
    return (timeOut.hour - timeIn.hour) / 60;   
}
   
// function to calculate wages earned for each employee on a date 
function wagesEarnedOnDate(employee, date) {  
     let hoursWorked = hoursWorkedOnDate(employee, date);  
     return hoursWorked * employee.payPerHour;  
}

// Fuction to find employee by first name
function findEmployeeByFirstName(createEmployeeRecords, firstName) {
    return createEmployeeRecords.find(function(employee) {
      return employee.firstName === firstName;
    });
  }
   
   
// function to calculate wages earned for all employee 
function calculatePayroll(employee) {
   const allWages = employee.map(record => allWagesFor(record));
   const totalPayroll = allWages.reduce((acc, curr) => acc + curr, 0);
   return totalPayroll;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

