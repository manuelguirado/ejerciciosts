class accesControl{
    constructor(){
        this.users = new Map();
    }
    private users: Map<string, {password: string, attemps: number,locked: boolean}>;
    private maxAttemps: number = 3;
    registerUser(username: string, password: string) : string{
       if (this.users.has(username)){
           return "User already exists";
       }else{
           this.users.set(username, {password: password, attemps: 0, locked: false});
           return "User registered";
       }
    }
   authenticateUser(username: string, password: string) : string{
     const user = this.users.get(username);
      if ( !user){
          return "User not registered";
      }
        if ( user.locked){
            return "User locked";
        }
        if ( user.password !== password){
            user.attemps++;
            if ( user.attemps === this.maxAttemps){
                user.locked = true;
                return "User locked";
            }
            return "Incorrect password";
        }
        if ( user.password === password){
            user.attemps = 0;
            return "User authenticated";
        }
        return "Incorrect password  attemps exceeded";

   }
   unlockUser(username: string, password: string) : string{
    const user = this.users.get(username);
    if ( !user){
        return "User not registered";
    }
    user.attemps = 0;
    user.locked = false;
    return "User unlocked";
 
   }

}
let access = new accesControl();
console.log(access.registerUser("user1", "password1")); // Output: User registered
console.log(access.registerUser("user1", "password1")); // Output: User already exists
console.log(access.authenticateUser("user1", "password1")); // Output: User authenticated
console.log(access.authenticateUser("user1", "password2")); // Output: Incorrect password
console.log(access.authenticateUser("user1", "password2")); // Output: Incorrect password
console.log(access.authenticateUser("user1", "password2")); // Output: User locked
console.log(access.authenticateUser("user1", "password2")); // Output: User locked
console.log(access.unlockUser("user1", "password1")); // Output: User unlocked
console.log(access.authenticateUser("user1", "password2")); // Output: Incorrect password
console.log(access.authenticateUser("user1", "password1")); // Output: User authenticated
