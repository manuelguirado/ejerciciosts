function checkCoordinate(axisx: number[], axisy: number[], coordinatesx: number[], coordinatesy: number[]): number[][] {
  let result: number[][] = [];

  for (let i = 0; i < coordinatesx.length; i++) {
    for (let j = 0; j < coordinatesy.length; j++) {
      if (axisx.includes(coordinatesx[i]) && axisy.includes(coordinatesy[j])) {
        result.push([coordinatesx[i], coordinatesy[j]]);
      }
    }
  }

  return result;
}

let coordinatesx = [-5, 0, 2, 5];
let coordinatesy = [-2, 0, 3, 4];
let axisx = [-5, -4, -3, -3, -2, -1, 0, 1, 2, 3, 4, 5];
let axisy = [-5, -4, -3, -3, -2, -1, 0, 1, 2, 3, 4, 5];

let matchingCoordinates = checkCoordinate(axisx, axisy, coordinatesx, coordinatesy);
console.log(matchingCoordinates);
