
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

function changeExpressoin() {
  var range = document.getElementById("range");
  var expression = document.getElementById("expression");
  var r = range.value;
  var a = Math.floor((Math.random()*r));
  var b = Math.floor((Math.random()*r));
  var opv = Math.floor((Math.random()*2));
  console.log(opv);
  var operationExp = (opv >= 1) ? delExp : addExp;
  expression.innerHTML = operationExp(a, b);
}
