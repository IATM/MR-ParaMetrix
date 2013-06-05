function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {
		var obj = [], i=0, start=1;
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
            results.rows.push({
                c: [{v:obj[i].key[1]},{v:obj[i].value}]
            });
			i = i + 1;
		}
            
        }
		
		if (i == 0) {

		results.rows.push({
                c: [{v:obj[i].key[1]},{v:obj[i].value}]
            });
			}

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}