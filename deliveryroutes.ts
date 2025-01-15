function bestDeliveryRoute(routes: string[]): string {
  let Routes = new Map();
  let bestRoute = "";
  let minDistance = 0;
  let minTime = 0;
  let minCost = 0;
  let minTimeRoute = "";
  let minCostRoute = "";
  let minDistanceRoute = "";
  for (let n of routes) {
    let [route, distance, time, cost] = n.split(" ");
    let [start, end] = route.split("-");
    let totalDistance = parseInt(distance);
    let totalTime = parseInt(time);
    let totalCost = parseInt(cost);
    if (Routes.has(start)) {
      Routes.set(start, Routes.get(start) + totalDistance);
    } else {
      Routes.set(start, totalDistance);
    }
    if (Routes.has(end)) {
      Routes.set(end, Routes.get(end) + totalDistance);
    } else {
      Routes.set(end, totalDistance);
    }
    if (minDistance === 0) {
      minDistance = totalDistance;
      minDistanceRoute = route;
    }
    if (minTime === 0) {
      minTime = totalTime;
      minTimeRoute = route;
    }
    if (minCost === 0) {
      minCost = totalCost;
      minCostRoute = route;
    }
    if (totalDistance < minDistance) {
      minDistance = totalDistance;
      minDistanceRoute = route;
    }
    if (totalTime < minTime) {
      minTime = totalTime;
      minTimeRoute = route;
    }
    if (totalCost < minCost) {
      minCost = totalCost;
      minCostRoute = route;
    }
    if (Routes.get(start) < minDistance) {
      minDistance = Routes.get(start);
      minDistanceRoute = start;
    }
    if (Routes.get(end) < minDistance) {
      minDistance = Routes.get(end);
      minDistanceRoute = end;
    }
    if (Routes.get(start) < minTime) {
      minTime = Routes.get(start);
      minTimeRoute = start;
    }
    if (Routes.get(end) < minTime) {
      minTime = Routes.get(end);
      minTimeRoute = end;
    }
    if (Routes.get(start) < minCost) {
      minCost = Routes.get(start);
      minCostRoute = start;
    }


  }
  return `The best route is ${minDistanceRoute} with ${minDistance} miles`;
}

let routes = [
  "A-B 10 5 100",
  "A-C 15 7 200",
  "A-D 20 10 300",
  "B-C 35 15 400",
  "B-D 25 12 500",
  "C-D 30 20 600",
];
console.log(bestDeliveryRoute(routes)); // The best route is A-B with 10 miles