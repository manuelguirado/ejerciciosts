class trafficLight {
  private state: string;
  private intervalID? : any;
  constructor() {
    this.state = "red";
    this.intervalID;
  }
  start() {
      if (this.intervalID) return;

    this.intervalID = setInterval(() => {
      if (this.state === "red") {
        this.state = "green";
        console.log("Green");
      } else if (this.state === "green") {
        this.state = "yellow";
        console.log("Yellow");
      } else if (this.state === "yellow") {
        this.state = "red";
        console.log("Red");
      }
      
    }, 1000);
  }
  stop() {
    if ( this.intervalID !== undefined) {
      clearInterval(this.intervalID);
      this.intervalID = undefined;
      console.log(`traffic light is stopped`  )
    }
  }
  getCurrerntColor() {
    console.log(this.state);
  }
}
let traffic = new trafficLight();
traffic.start();
setTimeout(() => {
  traffic.stop();
}, 5000);
setTimeout(() => {
  traffic.getCurrerntColor();
}, 6000);
