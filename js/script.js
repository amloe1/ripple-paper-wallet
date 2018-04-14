
var qrcodeAddress = new QRCode(document.getElementById("qrcodeAddress"),{width: 120,height: 120});
var qrcodeSecret = new QRCode(document.getElementById("qrcodeSecret"),{width: 120, height: 120});

newripple();

function newripple() {
  var account = [];
  for (i = 0; i < 1000; i++) {
  var api = new ripple.RippleAPI();
  account[i]= new api.generateAddress()
  console.log(account[i]);
  document.getElementById("address").innerHTML = account[i].address;
  document.getElementById("secret").innerHTML = account[i].secret;
  //qrcodeAddress.makeCode(account[i].address);
  //qrcodeSecret.makeCode(account[i].secret);
  }
//download_csv(account);
downloadCSV(({ data: account }));
}


 function convertArrayOfObjectsToCSV(args) {
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    }

    function downloadCSV(args) {
        var data, filename, link;

        var csv = convertArrayOfObjectsToCSV(args);
        if (csv == null) return;

        filename = args.filename || 'ripple.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }





//function download_csv(account) {
	
//	var A = [[account.address, account.secret]];
//	console.log(A);
//	var csvRows = [];

//	for(var i=0, l=A.length; i<l; ++i){
//  	  csvRows.push(A[i].join(','));
//	}

//var csvString = csvRows.join("%0A");
//var a         = document.createElement('a');
//a.href        = 'data:attachment/csv,' +  encodeURIComponent(csvString);
//a.target      = '_blank';
//a.download    = 'ripple.csv';

//document.body.appendChild(a);
// a.click();

//}

