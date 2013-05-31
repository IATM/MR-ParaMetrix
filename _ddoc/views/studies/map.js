function(doc) {
 if(doc["0008,1030"]) {
   emit([doc["0008,1010"],doc["0008,1030"]], 1);
 }
}