function readTextArea() {
  var dayOffCodes = document.getElementById("dayOffCodes").value.split(",");
  for (var i = 0; i < dayOffCodes.length; i++) {
    dayOffCodes[i] = dayOffCodes[i].trim();
  }
  console.log(dayOffCodes);
  var lines = document.getElementById("titaniacsv").value.split("\n");
  var calItem =
    "Start Date, Start Time, End Date, End Time, All Day Event, Subject\n"; 
  for (var i = 0; i < lines.length; i++) {
    if (
      lines[i].charAt(0) === "-" ||
      lines[i].charAt(0) === " " ||
      lines[i].length === 0
    ) {
      console.log("Skip, just line here");
    } else {
      var shiftCode = lines[i].charAt(16);
      if (dayOffCodes.indexOf(shiftCode) !== -1) {
        console.log("vapaapäivä");
      } else {
        var date = lines[i].substring(0, 5);
        var shiftTime = lines[i].substr(18, 9);
        var day = date.substr(0, 2);
        var month = date.substr(3, 2);
        var year = document.getElementById("year").value;
        date = day + "." + month + "." + year;
        console.log(date + ":" + shiftTime + "(" + shiftCode + ")");
        calItem += date + ',' + '00:00' + ',' + date + ',' + '00:00' + ',' + 'True' + ',' + shiftTime + ' (' + shiftCode + ')\n';
      }
    }
  }
  //save_csv(calItem);
  download(calItem, "vuorot.csv", "text/csv");
  
}

document.getElementById("year").value = new Date().getFullYear();