function cowboyLife(cuad : number[][]) : string{
    let neighbours = [[-1,0],[1,0],[0,-1],[0,1]];
    for ( let i = 0; i <= cuad.length;i++){
        for ( let j = 0; j <= cuad.length; j++){
            if (cuad[i][j] === 1){
                for ( let n of neighbours){
                    let x = i + n[0];
                    let y = j + n[1];
                    if ( x >= 0 && x < cuad.length && y >= 0 && y < cuad.length && cuad[x][y] === 1){
                        return "Game Over";
                    }
                }
            }
        }
         
   }
   return "You win";
}
let cuad = [
    [1,0,0,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [1,0,0,0,0],
    [0,0,0,1,0]
];
  
console.log(cowboyLife(cuad)); // Output: Game Over
