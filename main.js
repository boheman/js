// main06();

function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
whiteRabbit = {
  type: 'white', // property 'type'
  speak, // bind method 'speak' with fn value
};
hungryRabbit = {
  type: 'hungry',
  speak,
};
whiteRabbit.speak("ABC");

let empty = {};
console.log(empty.toString());
