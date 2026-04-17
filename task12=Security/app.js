const express=require("express");   
const app=express();
const port=3000;
const helmet=require("helmet");
//uses of helmet.js
//if we do not use helmet.js, then anyone can see that on what technology our app is built on , so in order to hide this we use this
//it adds headers in order to save the confidential information
//also read documentation, it also secures from the clickjacking atck, which means , we see a fake ui , on clicking on the button of the fake ui, the actual click is taken place on some other button ,this types of attacks is called as click jacking attack


//JAVASCRIPT INJECTION

//what is javascript injection?
//hackers write some js in script and tag and inject in the user input whicb subsequently disrupts the code and is vulnerable to some errors
//also usig this the attackerss can access the document and cookies inside of our appplication
//this can be prevented by
//1-> not using innerHTML , because using inner HTML injects the input givenn by code into the html code , but if we use innerText, then what happens is
// the script inserted by the hacker would not be intonthe html
//hence, we can use innerhtml , if there is no user input alse do use innerText instead of that

//there are other important attacks-refer notes


app.listen(port,()=> console.log('started'));