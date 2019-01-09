var url = 'http://157.230.17.132:4015/sales';

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    },

    // Configuration options go here
    options: {}
});

$(document).ready(function() {

  $.ajax({
    url: url,
    method: 'GET',
    success: function(data)
    {
      var objectPending = {};

      for (var i = 0; i < data.length; i++) {
        var oggetto = data[i];
        var date = oggetto.date;
        var pendingDate = moment(date, 'DD/MM/YYYY');
        var newDate = pendingDate.format('MMMM');
        console.log(newDate);
        console.log(date);

        if (objectPending[oggetto.date] == undefined)
        {
          objectPending[oggetto.date] = 0;
        }

        objectPending[oggetto.date] += oggetto.amount;
      }



       console.log(objectPending);
    },
    error: function(err)
    {
      alert('si è verificato un errore');
    }
  })
})
