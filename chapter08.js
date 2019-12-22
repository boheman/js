function main08() {
  "use strict";

  function canYouSpotTheProblem() {
    for (let counter = 0; counter < 10; counter++) {
      console.log("Happy happy");
    }
  }
  canYouSpotTheProblem(); // ReferenceError: counter is not defined

  // Tests
  function test(label, body) {
    if (!body()) {
      console.log(`Failed: ${label}`);
    }
  }
  test("convert Latin text to uppercase", () => {
    return "hello".toUpperCase() == "HELLO";
  });
  test("convert Greek text to uppercase", () => {
    return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
  });
  test("don't convert case-less characters", () => {
    return "مرحبا".toUpperCase() == "مرحبا";
  });

  /*
  In many situations, when there is error, it should be returned in a good way.
  Wrap result in an object so successful value can be distinguished from failure.
  */
  function lastElement(array) {
    if (array.length == 0) {
      return {
        failed: true
      }
    }
    return {
      element: array[array.length - 1]
    };
  }
  console.log(lastElement([])); // {failed: true}
  console.log(lastElement([1, 2])); // {element: 2}

  // Exception
  function promptDirection(question) {
    let result = prompt(question).toLowerCase();
    if (result == 'left') return "L";
    if (result == 'right') return "R";
    throw new Error("Invalid direction: " + result);
  }

  function look() {
    if (promptDirection("Which way?") == "L") {
      return "a house";
    }
    return "two angry bears";
  }

  // try {
  //   console.log("You see", look());
  // } catch (error) {
  //   console.log("Something went wrong: " + error);
  // }

  class MyError extends Error {}

}
