//Remi Parayao
//I&C SCI_X472.15 (WINTER 2020/REG 00448/SEC 1)
//01.20.2020
import {expect} from "chai";
import {showMessage} from "../src/index.js";



//test showmessage function and 
//check the length of the return value
it("call show message --happy path", () =>{
	expect(showMessage("This is a test")).to.equal(14);
});


it("call show message --unexpected use case with no arguments", () =>{
	expect(showMessage()).to.equal(-1);
});

it("call show message --unexpected use case with three params", () =>{
	expect(showMessage("argument1", "argument2", "arg3")).to.equal(9);
});