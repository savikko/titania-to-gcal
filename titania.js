function readTextArea() {
  var dayOffCodes = document.getElementById("dayOffCodes").value.split(",");
  year = document.getElementById("year").value;
  for (var i = 0; i < dayOffCodes.length; i++) {
    dayOffCodes[i] = dayOffCodes[i].trim();
  }
  var lines = document.getElementById("titaniacsv").value.split("\n");
  var calItem =
    "Start Date, Start Time, End Date, End Time, All Day Event, Subject\n";
  for (var i = 0; i < lines.length; i++) {
    if (
      lines[i].charAt(0) === "-" ||
      lines[i].charAt(0) === " " ||
      lines[i].length === 0
    ) {
      console.log("Skip, just bogus line here");
    } else {
      var shiftCode = lines[i].charAt(16);
      if (dayOffCodes.indexOf(shiftCode) !== -1) {
        console.log("vapaapäivä");
        if (document.getElementById("hideDayOffs").checked === false) {
          var date = getDate(lines[i]);
          calItem +=
            date +
            "," +
            "00:00" +
            "," +
            date +
            "," +
            "00:00" +
            "," +
            "True" +
            "," +
            "VAPAA (" +
            shiftCode +
            ")\n";
        }
      } else {
        var shiftTime = lines[i].substr(18, 9);
        var date = getDate(lines[i]);
        calItem +=
          date +
          "," +
          "00:00" +
          "," +
          date +
          "," +
          "00:00" +
          "," +
          "True" +
          "," +
          shiftTime +
          " (" +
          shiftCode +
          ")\n";
      }
    }
  }
  //save_csv(calItem);
  download(calItem, "vuorot.csv", "text/csv");
}

function getDate(line) {
  // return '02.11 ......' in format '02.11.2018'
  dateStr = line.substring(0, 5);
  day = dateStr.substr(0, 2);
  month = dateStr.substr(3, 2);
  return day + "." + month + "." + year;
}

document.getElementById("year").value = new Date().getFullYear();
