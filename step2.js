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

const axios = require('axios');

async function webcat(path){
    try{
        var htmlVer = await axios.get(`https://${path}/index.html`)
        console.log(htmlVer.data)

    }    
    catch(err){
        console.log(`Error: getting ${path}`)
        process.exit(2);
    }
}
let fName =`${process.argv[2]}` 
if (fName.slice(fName.length - 4) == '.txt'){
    cat(process.argv[2]);
}
if (fName.slice(fName.length - 4) != '.txt'){
    webcat(process.argv[2]);
}


