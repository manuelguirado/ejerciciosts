function validateSudoku(board : number[][]) : boolean{
    for ( let i = 0; i < 9 ; i++){
        let row  = new Set();
        let col = new Set();
        let subBox = new Set();

        // Add logic to validate the Sudoku board here
        for ( let j = 0; j < 9; j++){
            let rowValue = board[i][j];
            let colValue = board[j][i];
            let subBoxValue = board[3 * Math.floor(i/3) + Math.floor(j/3)][3 * (i % 3) + j % 3];

            if ( row.has(rowValue) || col.has(colValue) || subBox.has(subBoxValue)){
                return false; // Return false if the value is already present in the row, column or sub-box
            }

            if (rowValue !== 0){
                row.add(rowValue);
            }

            if (colValue !== 0){
                col.add(colValue);
            }

            if (subBoxValue !== 0){
                subBox.add(subBoxValue);
            }
        }

    }
    return true; // Return a boolean value
}
//matrix 9 x 9
let board = [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
];
console.log(validateSudoku(board)); // Output: true