function(doc) {

	//Map function for SpacingBetweenSlices (0018,0088)

	//If SOP class is Enhanced MR
	if (doc["0008,0016"] === "1.2.840.10008.5.1.4.1.1.4.1") {
	  tagpath = doc["0018,0088"]; // SpacingBetweenSlices
	}
	else {
	  //If SOP class is Regular MR or anything else (which will just not evaluate)
	  tagpath = doc["0018,0088"]; // SpacingBetweenSlices
	}

	if (doc["0008,103E"] && tagpath) {
		emit([doc["0008,1010"], doc["0008,1030"], doc["0008,103E"],(parseFloat(tagpath)).toFixed(0)],doc["0020,000E"]);
	}
  
}