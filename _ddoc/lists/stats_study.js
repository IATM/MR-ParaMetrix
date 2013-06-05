function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
		var obj = [], i=0, start=1, s=0, sd=0, avg=0;
        // Describe columns
		var results = {
    		cols: [{id: 'value', label: 'Value', type: 'number'},
         	{id: 'freq', label: 'Frequency', type: 'number'}],
    		rows: []
		};
		
		// Describe rows
        while (row = getRow()) {
		if (i==0 && start==1) {
			obj.push({key:[row.key[0], row.key[1], row.key[2]], value: 1});
			start = 0;
		}
		else if (row.key[0] == obj[i].key[0] && row.key[1] == obj[i].key[1]) {           
			obj[i].value = obj[i].value + 1;
		}
		else {            
			obj.push({key:[row.key[0], row.key[1], row.key[2]], value: 1});
			s=s + obj[i].value;
			i = i + 1;
		}
            
        }
		s = s + obj[i].value;
		avg = s/(i+1);
		
		for (var k=0; k<=i; k++)
		  {
		  	sd = sd + Math.pow((obj[i].value - avg), 2);
		  }
		  sd = Math.sqrt(sd);
		
		//Return 
		results.rows.push({
                c: [{v:avg},{v:sd}]
            });

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}