class clinic {
  private data: { name: string; date: string; time: string; doctor: string }[] =  [];

  addDate(name: string, date: string, time: string, doctor: string) {
    const exits = this.data.some((item) => item.date === date);
    if (exits) {
      console.log("Date already exists");
      return;
    }
    this.data.push({ name, date, time, doctor });
    console.log("Date added", { name, date, time, doctor });
  }
  removeDate(date : string){
     const index = this.data.findIndex((item) => item.date === date);
        if ( index === -1){
            this.data.splice(index, 1);
            console.log("Date removed");
        
        }else{
            console.log("Date not found");
        }
  }
   updateDAte (name : string, date : string, time : string, doctor : string){
      const appointment = this.data.find((item) => item.date === date);
      if ( appointment){
          appointment.name = name;
          appointment.time = time;
          appointment.doctor = doctor;
          console.log("Date updated");

      }else{
          console.log("Date not found");
      }
   }
   filterByname( name : string){
         const appointments = this.data.filter((item) => item.name === name);
         if ( appointments.length > 0){
             console.log(appointments);

         }else{
             console.log("No appointments found");
         }
   }
   modifytime ( date : string, time : string){
       const appointment = this.data.find((item) => item.date === date);
       if ( appointment){
           appointment.time = time;
           console.log("Time updated");
       }else{
           console.log("Date not found");
       }
   }
   showAll(){
       console.log(this.data);
   }


}
let clinic1 = new clinic();
clinic1.addDate("john", "12/12/2021", "12:00", "Dr. Smith");
clinic1.addDate("jane", "12/12/2021", "12:30", "Dr. Smith");
clinic1.addDate("jane", "12/12/2021", "12:30", "Dr. Smith");
clinic1.removeDate("12/12/2021");
clinic1.updateDAte("john", "12/12/2021", "12:00", "Dr. Smith");
clinic1.filterByname("john");
clinic1.modifytime("12/12/2021", "12:30");
clinic1.showAll();