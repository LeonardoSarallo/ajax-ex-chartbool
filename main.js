var url = 'http://157.230.17.132:4015/sales';
var monthSelect = $('.mymonthselect');
var nameSelect = $('.mynameselect');
var button = $('#mybutton');
var text = $('#mytext');


$(document).ready(function() {

  $.ajax({
    url: url,
    method: 'GET',
    success: function(data)
    {

      line(data);
      pie(data);

    },
    error: function(err)
    {
      alert('si è verificato un errore');
    }
  })


  button.click(function () {

    var input = parseInt(text.val());
    console.log(input);

    var selectMonthVal = monthSelect.val();

    selectMonthVal = moment(selectMonthVal, 'MMMM').format('01/MM/2017');
    console.log(selectMonthVal);

    var selectNameVal = nameSelect.val();

    console.log(selectNameVal);

    console.log(selectMonthVal);

    $.ajax({
      url: url,
      method: 'POST',
      data: {
        salesman: selectNameVal,
        amount: input,
        date: selectMonthVal
      },
      success: function (data)
      {
        lineUpdate(data);
        pie(data);
      },
      error: function ()
      {
        alert('si è verificato un errore');
      }

    })

  });


})

function line(data)
{
  var objectPending = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0};

  for (var i = 0; i < data.length; i++) {
    var oggetto = data[i];
    var date = oggetto.date;
    var pendingDate = moment(date, 'DD/MM/YYYY');
    var newDate = pendingDate.format('MMMM');
    console.log(newDate);
    console.log(date);


    objectPending[newDate] += parseInt(oggetto.amount);
  }

  var arrayLabels = [];
  var arrayData = [];


  for (var chiave in objectPending) {
    arrayLabels.push(chiave);
    arrayData.push(objectPending[chiave]);
    console.log(chiave);
    monthSelect.append("<option>" + chiave + "</option>");

  }



  console.log(arrayData);
  var ctx = document.getElementById('line').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: arrayLabels,
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(66, 134, 244)',
              borderColor: 'rgb(255, 99, 132)',
              data: arrayData,
          }]
      },

      // Configuration options go here
      options: {}
  });
}

function pie(data)
{


  var obj = {};
  var total = 0;

  for (var i = 0; i < data.length; i++) {
      var oggetto = data[i];
      var salesMan = oggetto.salesman;
      var amount = parseInt(oggetto.amount);

      if (obj[salesMan] == undefined)
      {
          obj[salesMan] = 0;
      }

      obj[salesMan] += amount;
      total += amount;
  }

  var arrayLabels = [];
  var arrayAmounts = [];

  for (var key in obj) {

      var disc = obj[key] / total * 100;
      console.log(disc);

      arrayLabels.push(key);
      arrayAmounts.push(disc.toFixed(2));
      nameSelect.append("<option>" + key + "</option>");


  }


  var myPieChart = new Chart($('#pie'), {
      type: 'pie',
      data: {
          datasets: [{
              data: arrayAmounts,
              backgroundColor: ['red','yellow','violet','blue']
          }],
          labels: arrayLabels

      }
  });
}

function lineUpdate(data)
{

  var objectPending = {
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0};

  for (var i = 0; i < data.length; i++) {
    var oggetto = data[i];
    var date = oggetto.date;
    var pendingDate = moment(date, 'DD/MM/YYYY');
    var newDate = pendingDate.format('MMMM');
    console.log(newDate);
    console.log(date);


    objectPending[newDate] += parseInt(oggetto.amount);
  }

  var arrayLabels = [];
  var arrayData = [];


  for (var chiave in objectPending) {
    arrayLabels.push(chiave);
    arrayData.push(objectPending[chiave]);
    console.log(chiave);
    monthSelect.append("<option>" + chiave + "</option>");

  }



  console.log(arrayData);
  var ctx = document.getElementById('line').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: arrayLabels,
          datasets: [{
              label: "My First dataset",
              backgroundColor: 'rgb(66, 134, 244)',
              borderColor: 'rgb(255, 99, 132)',
              data: input,
          }]
      },

      // Configuration options go here
      options: {}
  });

}
