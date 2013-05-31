function(doc) {
 if(doc["0008,103E"]) {
   emit([doc["0008,1010"],doc["0008,1030"], doc["0008,103E"]], 1);
 }
}