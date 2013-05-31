function(doc) {

	//Map function for Slice Thickness (0018,0050)

	//If SOP class is Enhanced MR
	if (doc["0008,0016"] === "1.2.840.10008.5.1.4.1.1.4.1") {
	  tagpath = doc["5200,9230"]["Item 0"]["0028,9110"]["Item 0"]["0018,0050"]; // Slice Thickness
	}
	else {
	  //If SOP class is Regular MR or anything else (which will just not evaluate)
	  tagpath = doc["0018,0050"]; // Slice Thickness
	}

	if (doc["0008,103E"] && tagpath) {
		emit([doc["0008,1010"], doc["0008,1030"], doc["0008,103E"],(parseFloat(tagpath)).toFixed(0)],doc["0020,000E"]);
	}
  
}