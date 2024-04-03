function main06() {
  function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }

  // Methods
  whiteRabbit = {
    // Properties
    type: 'white', // property 'type'

    // Methods
    speak, // bind method 'speak' with fn value
  };
  hungryRabbit = {
    // Properties
    type: 'hungry',

    // Methods
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

function exercise06() {
  // Exercises

  // Vector
  class Vec {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    plus(v) {
      return new Vec(this.x + v.x, this.y + v.y);
    }
    minus(v) {
      return new Vec(this.x - v.x, this.y - v.y);
    }
    get length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }

  console.log(new Vec(1, 2).plus(new Vec(3, 4))); // Vec {x: 4, y: 6}
  console.log(new Vec(1, 2).minus(new Vec(2, 3))); // Vec {x: -1, y: -1}
  console.log(new Vec(3, 4).length); // 5

  // Groups (aka Set with add, delete, has methods)
  class Group {
    constructor() {
      this.x = [];
    }
    has(elem) {
      return this.x.includes(elem);
    }
    add(elem) {
      if (!this.has(elem)) {
        this.x.push(elem);
      }
      return this;
    }
    delete(elem) {
      if (!this.has(elem)) {
        return this;
      }
      let len = this.x.length;
      let idx = this.x.findIndex(x => x === elem);
      if (idx == 0) {
        this.x.shift();
      } else if (idx == len - 1) {
        this.x.pop();
      } else {
        this.x = this.x.slice(0, idx).concat(this.x.slice(idx + 1, len));
      }
      return this;
    }
    static from(iter) {
      let out = new Group();
      iter.forEach(x => out.add(x));
      return out;
    }
  }
  let group = Group.from(["a", 1, 5, 8, true]);
  console.log(group.has(1)); // true
  console.log(group.has("hello")); // false
  console.log(group.delete(5)); // Group {x: ["a", 1, 8, true]}
  console.log(group.add(10)); // Group {x: ["a", 1, 8, true, 10]}

  // Iterable groups
  // for (let i of group) {} // TypeError: group is not iterable
  class IterableGroup extends Group {
    static from(iter) {
      let out = new IterableGroup();
      iter.forEach(x => out.add(x));
      return out;
    }

    [Symbol.iterator]() {
      return new GroupIterator(this);
    }
  }
  class GroupIterator {
    constructor(group) {
      this.idx = 0;
      this.group = group;
    }
    next() {
      if (this.idx >= this.group.x.length) {
        return {
          done: true
        };
      }
      return {
        value: this.group.x[this.idx++],
        done: false
      };
    }
  }
  for (let i of IterableGroup.from(["I", "can", "iterate"])) {
    console.log(i);
  }
}
