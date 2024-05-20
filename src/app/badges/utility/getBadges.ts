//var csv is the CSV file with headers

const badgesMap = new Map();
processCSV();

function processCSV(){
    console.log("processing points_snapshot csv");
    var csv_file = File('points_snapshot.csv');
    csv_file.open('r');
    csv_file.encoding = 'utf-8';
    var data = csv_file.read().split('/\r\n|\n/'); // split by lines
    csv_file.close();
    for (var row in data) data[row].split(','); // split all lines by comas
    var headers=data[0];
    console.log("All rows of csv:");
    console.log(data); // here is your 2d array
    for(var i=1;i<data.length;i++){

        var obj = {};
        var currentline=data[i];
  
        for(var j=1;j<headers.length;j++){
            badgesMap[headers[j]] = currentline[j];
        }
  
        badgesMap.set(currentline[0],obj);
    }
    console.log("full map of badge holders");
    console.log(badgesMap);
  }

  export const badgesMap ; 
