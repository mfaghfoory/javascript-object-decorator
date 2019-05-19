# javascript-object-decorator
A simple library that takes an object and decorates over all its functions with custom actions

example:

First of all define an object or maybe you already have an object

let person = {
  name: 'foo',
  family: 'fighters',
  print() {
     console.log(this.name + ' ' + this.family);
     return this.name + ' ' + this.family;
   },
   sendToDb() {
     //sample heavy operation
   }   
};

Then you can decorate all functions of this object with this simple function:

person = decorate(person, (beforeCallOutput) => { console.log(beforeCallOutput); }, (afterCallOutput) => { console.log(afterCallOutput); }, (onException) => { //do something with error });

person.print();

Result : 

// { method: 'print', args: [], object: //same object }

// foo fighters

// { method: 'print', args: [], result: 'foo fighters', object: //same object }

Or for example, you can use it to evaluate the time that every function takes to run or send parameter with every function names to a log resource or even log every exception
