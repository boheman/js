function main06() {
  function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }

  // Methods
  whiteRabbit = {
    type: 'white', // property 'type'
    speak, // bind method 'speak' with fn value
  };
  hungryRabbit = {
    type: 'hungry',
    speak,
  };
  whiteRabbit.speak("bbbb");

  // Prototypes (__proto__)
  let empty = {};
  console.log(empty.toString); // function toString() {...}
  // prototype of empty object
  console.log(Object.getPrototypeOf({}) == Object.prototype); // true
  // prototype of empty array
  console.log(Object.getPrototypeOf([]) == Array.prototype); // true
  console.log(Object.getPrototypeOf(Math.max) == Function.prototype); // true

  // Classes (ES5) : Only allow methods!
  class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(`The ${this.type} rabbit says ${line}.`);
    }
  }
  // Instantiate Rabbit
  let weirdRabbit = new Rabbit("weird");
  console.log(weirdRabbit);

  // Verify that Rabbit has its own prototype now.
  console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype); // true


  // Maps (key/value) based on Object
  let ages = {
    a: 1,
    b: 2,
  };
  console.log(ages.a); // 1
  console.log(ages["a"]); // 1
  console.log("a" in ages); // true (test if key in ages)
  console.log(Object.keys(ages).includes("a")); // true

  // Better way to instantiate Map.
  ages = new Map();
  ages.set("a", 1);
  ages.set("b", 2);
  console.log(ages.has("a")); // true
  console.log(ages.get("b")); // 2
  console.log(ages.get("what")); // undefined

  // Symbol
  Rabbit.prototype["speak"]; //
  let sym = Symbol("boo");
  Rabbit.prototype[sym] = line => console.log(line);

  // symbol property in object expression.
  let mySymbol = Symbol("hell");
  let stringObject = {
    [mySymbol]() {
      return "hello";
    }
  };
  console.log(stringObject[mySymbol]()); // hello

  // Iterator interface [Symbol.iterator]
  // How to iterate each char in String
  for (let c of "OK") {
    console.log(c);
  }
  // We can access iterator through Symbol.iterator directly.
  let iter = "OK" [Symbol.iterator]();
  while (true) {
    let c = iter.next(); // StringIterator
    if (c.done) {
      break;
    }
    console.log(c.value);
  }

  console.log("Hello" [Symbol.iterator]().next()); // {value: "H", done: false}


  // Getter, Setter, Static method.
  class Temp {
    constructor(celsius) {
      this.celsius = celsius;
    }
    get fahrenheit() {
      return this.celsius * 1.8 + 32;
    }
    set fahrenheit(value) {
      this.celsius = (value - 32) / 1.8;
    }
    static fromFahrenheit(value) {
      return new Temp((value - 32) / 1.8);
    }
  }
  let temp = new Temp(22);
  console.log(temp.fahrenheit); // 71.6 (getter)
  temp.fahrenheit = 86; // setter
  console.log(temp.celsius); // 30 (property)
  console.log(Temp.fromFahrenheit(71.6));

  // Inheritance
  class Animal {
    constructor(leg = 2) {
      this.leg = leg;
    }
    speak() {
      console.log("zzz");
    }
  }
  class Dog extends Animal {
    constructor() {
      super(4);
    }
    speak() {
      console.log("ruff");
    }
  }
  let dog = new Dog();
  console.log(dog); // Dog {leg: 4}
  console.log(dog.speak()); // ruff
  console.log(dog instanceof Dog); // true
  console.log(dog instanceof Animal); // true
  console.log(new Animal(3) instanceof Dog); // false
}
