var url = 'http://157.230.17.132:4015/sales';



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
        var newDate = pendingDate.format('MM');
        console.log(newDate);
        console.log(date);

        if (objectPending[newDate] == undefined)
        {
          objectPending[newDate] = 0;
        }

        objectPending[newDate] += oggetto.amount;
      }

      var arrayLabels = [];
      var arrayData = [];


      for (var chiave in objectPending) {
          arrayLabels.sort().push(chiave);
          arrayData.push(objectPending[chiave]);
      }

      console.log(arrayLabels);
      console.log(arrayData);
      var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
          // The type of chart we want to create
          type: 'line',

          // The data for our dataset
          data: {
              labels: arrayLabels,
              datasets: [{
                  label: "My First dataset",
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: arrayData,
              }]
          },

          // Configuration options go here
          options: {}
      });
    },
    error: function(err)
    {
      alert('si è verificato un errore');
    }
  })
})
