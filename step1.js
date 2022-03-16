let fs = require("fs");
const { exit } = require("process");

function cat(path){
fs.readFile(`${path}`, "utf8", function(err, data){
    if(err){
        console.log("ERROR IS: ", err);
        process.exit(1);
    }
    console.log(data);
})
}

cat(process.argv[2]);
