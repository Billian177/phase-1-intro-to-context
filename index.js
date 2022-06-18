// Your code here

function createEmployeeRecord (Record){
    return {
        firstName: Record[0],
        familyName: Record[1], 
        title:  Record[2],
        payPerHour: Record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(ArrayRecords){
    return ArrayRecords.map(function(Array){
        return createEmployeeRecord(Array);
    });
}


function createTimeInEvent(empObject, dates){
    let [date, hour] = dates.split(' ');

    empObject.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return empObject;
}


function createTimeOutEvent(empObject, dates){
    let [date, hour] = dates.split(' ');

    empObject.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return empObject;
}


function hoursWorkedOnDate(empObject, formDate){
    let inEvent = empObject.timeInEvents.find(function(emp){
        return emp.date === formDate;
    })

    let outEvent = empObject.timeOutEvents.find(function(emp){
        return emp.date === formDate;
    })

    return (outEvent.hour - inEvent.hour) / 100;
}


function wagesEarnedOnDate (employee, empObject){
    let rawWage = hoursWorkedOnDate(employee, empObject)
        * employee.payPerHour
    return parseFloat(rawWage.toString())
}


function allWagesFor(employee){
    let eligibleDates = employee.timeInEvents.map(function(emp){
        return emp.date
    })

    let payable = eligibleDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)

    return payable
}


function calculatePayroll (arrayRecords){
    return arrayRecords.reduce(function(memo, rec){
        return memo + allWagesFor(rec)
    }, 0)
}