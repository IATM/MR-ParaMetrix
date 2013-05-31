function(keys, values, rereduce) {
var i,
     len=values.length,
     out=[],
     obj={};

 for (i=0;i<len;i++) {
   obj[values[i]]=0;
 }
 for (i in obj) {
   out.push(i);
 }
 return out.length;
}