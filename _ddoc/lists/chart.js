function (head, req) {
    // specify that we're providing a JSON response
    provides('json', function() {

        // Describe columns
		var results = {
    		cols: [{id: 'value', label: 'Value', type: 'number'},
         	{id: 'freq', label: 'Frequency', type: 'number'}],
    		rows: []
		};
		
		// Describe rows
        while (row = getRow()) {
            results.rows.push({
                c: [{v:row.key[3]},{v:row.value}]
            });
        }

        // make sure to stringify the results :)
        send(JSON.stringify(results));
    });
}