function(doc) {

	//Map function for TR (Repetition Time) (0018,0080)

	//If SOP class is Enhanced MR
	if (doc["0008,0016"] === "1.2.840.10008.5.1.4.1.1.4.1") {
	  tagpath = doc["5200,9229"]["Item 0"]["0018,9112"]["Item 0"]["0018,0080"]; // Repetition Time
	}
	else {
	  //If SOP class is Regular MR or anything else (which will just not evaluate)
	  tagpath = doc["0018,0080"]; // Repetition Time
	}

	if (doc["0008,103E"] && tagpath) {
		var binnedtag = Math.round((parseFloat(tagpath)).toFixed(0) / 50) * 50; // Binned to the nearest 50
		emit([doc["0008,1010"], doc["0008,1030"], doc["0008,103E"],binnedtag],doc["0020,000E"]);
	}
  
}