let fs = require("fs");
let path=require("path")
let folderPath = process.argv[2];
console.log(folderPath);

let folderExists = fs.existsSync(folderPath);
let extensions={
    Audio:[".mp3"],
    Video:[".mp4",".mkv",".gif"],
    Document:[".doc",".xlsx",".pdf",".txt"],
    Image:[".jpeg",".jpg",".png",".png"],
    Software:[".exe"]
    
};
if (folderExists) {
    // Only if the path is Valid 
    // console.log("Path is Valid ")
    let files=fs.readdirSync(folderPath);
    for(let i=0;i<files.length;i++){
        let ext=path.extname(files[i]);
        let nameOfFolder=giveFolderName(ext);
        // console.log("Ext-->",ext,"Folder-->",nameOfFolder);
        let pathOfFolder=path.join(folderPath,nameOfFolder);
        let exist=fs.existsSync(pathOfFolder);//Whether folder exist or not
        if(exist){
            moveFile(folderPath,pathOfFolder,files[i]);

        }else{
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath,pathOfFolder,files[i]);
        }
    }
    
}
else {
  console.log("Please Enter a Valid Path!!!!");
  
// ['mp3','zip','jpeg','doc','mp4','xlsx','mkv','jpg','pdf','png','exe','gif','tar','rar']
}


function giveFolderName(ext){
    for(let key in extensions){
        let extArr=extensions[key];
        for(let i=0;i<extArr.length;i++){
            if(extArr[i]==ext)
            return key;
        }
    }
    return 'Others'
}

function moveFile(folderPath,pathOfFolder,fileName){
    let sourcePath=path.join(folderPath,fileName);
    let destinationPath=path.join(pathOfFolder,fileName);
    fs.copyFileSync(sourcePath,destinationPath);
    fs.unlinkSync(sourcePath);
}