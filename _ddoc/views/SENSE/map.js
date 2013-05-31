function(doc) {

	//Map function for TR (0020,000E)

	//If SOP class is Enhanced MR
	if (doc["0008,0016"] === "1.2.840.10008.5.1.4.1.1.4.1") {
	  tagpath = doc["5200,9229"]["Item 0"]["0018,9115"]["Item 0"]["0018,9069"]; // ParallelReductionFactorIn-plane
	}
	else {
		//If SOP class is Regular MR
		if (doc["0018,9069"]) {
			tagpath = doc["0018,9069"]; // ParallelReductionFactorIn-plane (In Philips private tag)
		}

		else {
			tagpath = doc["2005,140F"]["Item 0"]["0018,9069"]; // try to find it in ParallelReductionFactorIn-plane (In Philips private tag)
		}
	}

	if (doc["0008,103E"] && tagpath) {
		emit([doc["0008,1010"], doc["0008,1030"], doc["0008,103E"],(parseFloat(tagpath)).toFixed(0)],doc["0020,000E"]);
	}
  
}