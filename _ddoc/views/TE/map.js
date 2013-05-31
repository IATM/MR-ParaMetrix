function(doc) {

	//Map function for TE (Echo Time)(0018,0081) or (EffectiveEchoTime)(0018,9082) for multiframe

	//If SOP class is Enhanced MR
	if (doc["0008,0016"] === "1.2.840.10008.5.1.4.1.1.4.1") {
	  tagpath = doc["5200,9230"]["Item 0"]["0018,9114"]["Item 0"]["0018,9082"]; // EffectiveEchoTime for first frame...should we choose a middle frame? an average?
	}
	else {
	  //If SOP class is Regular MR or anything else (which will just not evaluate)
	  tagpath = doc["0018,0081"]; // Echo Time
	}

	if (doc["0008,103E"] && tagpath) {
		emit([doc["0008,1010"], doc["0008,1030"], doc["0008,103E"],(parseFloat(tagpath)).toFixed(0)],doc["0020,000E"]);
	}
  
}