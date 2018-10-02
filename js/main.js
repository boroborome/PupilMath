function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

function addExp(a, b) {
  return a + "+" + b;
}
function delExp(a, b) {
  if (a < b) {
    var t = a;
    a = b;
    b = t;
  }
  return a + "-" + b;
}

function createStatusInfo() {
  var status = new Object();
  status.startTime = new Date();
  status.endTime = null;
  status.rightQuestions = [];
  status.wrongQuestions = [];
  status.currentExpression = null;
  return status;
}
var currentStatus = createStatusInfo();

function changeExpression() {
  var range = document.getElementById("range");
  var r = range.value;
  var a = Math.floor((Math.random()*r));
  var b = Math.floor((Math.random()*r));
  var opv = Math.floor((Math.random()*2));
  var operationExp = (opv >= 1) ? delExp : addExp;
  currentStatus.currentExpression = operationExp(a, b);
  $("#expression").html(currentStatus.currentExpression);
}


function startPractice(event) {
  currentStatus = createStatusInfo();
  changeExpression();
}

function rightAnswer(event) {
  currentStatus.rightQuestions.push(currentStatus.currentExpression);
  changeExpression();
}

function wrongAnswer(event) {
  currentStatus.wrongQuestions.push(currentStatus.currentExpression);
  changeExpression();
}

function calculateExpendTime(status) {
  var milliseconds = parseInt(status.endTime.getTime() - status.startTime.getTime());
  var millisecondsInHour = 1000*60*60;
  var hour = parseInt(milliseconds/millisecondsInHour);
  milliseconds = milliseconds - hour * millisecondsInHour;

  var millisecondsInMinus = 1000*60;
  var minus = parseInt(milliseconds/millisecondsInMinus);
  milliseconds = milliseconds - minus * millisecondsInMinus;

  var millisecondsInSecond = 1000;
  var second = parseInt(milliseconds/millisecondsInSecond);
  milliseconds = milliseconds - second * millisecondsInSecond;

  var timeExpend = prefixInteger(hour, 2) + ":"
    + prefixInteger(minus, 2) + ":"
    + prefixInteger(second, 2) + "."
    + prefixInteger(milliseconds, 3);
  return timeExpend;
}

function arrayToString(array) {
  var result = "";
  for(var i in array){
    result = result + array[i] + "<br>";
  }
  return result;
}

function endPractice(event) {
  currentStatus.endTime = new Date();
  $("#txtAllRightQuestions").html(arrayToString(currentStatus.rightQuestions));
  $("#txtAllWrongQuestions").html(arrayToString(currentStatus.wrongQuestions));
  $("#timeExpend").html("耗时： " + calculateExpendTime(currentStatus));

  statusDialog.dialog( "open" );
}

function closeStatus(event) {
  $("#divStatus").close();
}

var statusDialog = null;
function initUI() {
  $("#btnStartPractice").click(startPractice);
  $("#btnRight").click(rightAnswer);
  $("#btnWrong").click(wrongAnswer);
  $("#btnEndPractice").click(endPractice);
  startPractice();

  statusDialog = $("#divStatus").dialog({
    autoOpen: false,
    show: { effect: "blind", duration: 800 },
    // height: 400,
    // width: 350,
    modal: false,
    buttons: {
      "关闭": function() {
        statusDialog.dialog( "close" );
      }
    }
  });
}