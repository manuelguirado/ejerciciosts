function logAnalizer(logs: string[]) : string{
    let logMap = new Map();
    let errorMap = new Map();
    let warningMap = new Map();
    let infoMap = new Map();
    let fileMap = new Map();
    
    
    for (let n of logs){
        let [date, time, event, file] = n.split(" ");
        if (logMap.has(event)){
            logMap.set(event, logMap.get(event) + 1);
        }else{
            logMap.set(event, 1);
        }
        if (event === "ERROR"){
            if (errorMap.has(file)){
                errorMap.set(file, errorMap.get(file) + 1);
            }else{
                errorMap.set(file, 1);
            }
        }
        if (event === "WARNING"){
            if (warningMap.has(file)){
                warningMap.set(file, warningMap.get(file) + 1);
            }else{
                warningMap.set(file, 1);
            }
        }
        if (event === "INFO"){
            if (infoMap.has(file)){
                infoMap.set(file, infoMap.get(file) + 1);
            }else{
                infoMap.set(file, 1);
            }
        }
        if (fileMap.has(file)){
            fileMap.set(file, fileMap.get(file) + 1);
        }else{
            fileMap.set(file, 1);
        }
    }
    let maxCount = 0;
    let frecuentEvent = "";
    for (let [key, value] of logMap){
        if (value > maxCount){
            maxCount = value;
            frecuentEvent = key;
        }
    }
    return `The most frequent event is ${frecuentEvent} with ${maxCount} occurrences`;
}

let logs = [
"2021-01-01 00:00:00 INFO file1",
"2021-01-01 00:00:01 INFO file2",
"2021-01-01 00:00:02 INFO file3",
"2021-01-01 23:59:59 ERROR file1",
"2021-01-02 00:00:00 ERROR file2",
"2021-01-02 00:00:01 ERROR file3",
"2021-01-02 23:59:59 WARNING file1",
"2021-01-03 00:00:00 WARNING file2",
"2021-01-03 00:00:01 WARNING file3"
];
console.log(logAnalizer(logs)); // Output 