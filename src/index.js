//Remi Parayao
//I&C SCI_X472.15 (WINTER 2020/REG 00448/SEC 1)
//01.20.2020


//show message function which will console log
//string pass as parameter and returns
//the length of the string
export const showMessage = (message) => {
   console.log(message);
   //return message.length;
   return message ? message.length : -1;
};



showMessage("This is a test...");