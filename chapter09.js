"use strict";

// Create RegExp
let re1 = new RegExp("abc");
let re2 = /abc/; // Same as above
console.log(re1.test("abcde")); // true
console.log(re2.test("abcde")); // true

// Set of Chars
console.log(/[0123456789]/.test("in 1992")); // true
console.log(/[0-9]/.test("in 1992")); // Same as above
console.log(/\d/.test("in 1992")); // Same as above

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20")); // true
console.log(dateTime.test("01-jan-2003 15:20")); // false

// Invert set of char
let binary = /[01]/;
let noBinary = /[^01]/;

// [^] match any char that is not empty set of char.
let matchEverything = /[^]*/;
console.log(/.+/.test("\n")); // false (period cannot match newline)
console.log(/[^]+/.test("\n")); // true

// Quantifier
let oneOrMoreDigit = /\d+/;
let zeroOrMoreDigit = /\d*/;
let zeroOrOneDigit = /\d?/;

let twoDigit = /\d{2}/;
let oneOrTwoDigit = /\d{1,2}/;
let fiveOrMoreDigit = /\d{5,}/;

dateTime = /\d{2}-\d{2}-\d{4} \d{2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45")); // false
dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45")); // true

// Group: Quantifier on group
let cartoonCrying = /boo+(hoo+)+/;
console.log(cartoonCrying.test("booohooooohooho")); // true

// test vs exec
let match = /\d+/.exec("5 two 100");
// ["5", index: 0, input: "5 two 100", groups: undefined]
console.log(match); // 5 (first match)
console.log(match.index); // 0 (index of the match)

// String.match()
console.log("5 two 300".match(/\d+/)); // same as above

// Exec with sub-expresion group
console.log(/\d+/.exec("123")); // ["123"] no group
console.log(/(\d)+/.exec("123")); // ["123", "3"]

// ["123 abc 5", "3", "c", "5"]
console.log(/(\d)+\s(\w)+\s(\d)+/.exec("123 abc 5"));

// Date
console.log(new Date().getTime()); // 1576999396807
console.log(new Date(1576999396807)); // Sat Dec 21 2019 23:23:16 GMT-0800

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(
    year,
    month - 1, // what the heck?
    day);
}
// Tue Dec 03 2019 00:00:00 GMT-0800
console.log(getDate("12-3-2019"));

// Word and string boundaries
// Must start with \d and end with \d.
console.log(/^\d+$/.test("100")); // true
console.log(/^\d+$/.test("s100")); // false

// There cannot be an x before the start of string.
let neverMatchAnything = /x^/; // This is likely a bug.

// \b is used as word boundary
console.log(/cat/.test("concatenate")); // true
console.log(/\bcat\b/.test("concatenate")); // false

// Choice patterns
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs")); // true

let binOrHexOrDec = /\b([01]+b|[\da-fA-F]+h|\d+)\b/;
console.log(binOrHexOrDec.test("010101100b")); // true
console.log(binOrHexOrDec.test("deadBEEFh")); // true
console.log(binOrHexOrDec.test("1234")); // true

// String Replace
/* Only the first match got replace. */
console.log("papa".replace("p", "m")); // mapa

// Use regex instead
console.log("papa".replace(/p/, "m")); // save as above

// Globally replace (i.e. not only the first hit).
console.log("papa".replace(/p/g, "m")); // mama
console.log("Borobudur".replace(/[ou]/, "a")); // Barobudur
console.log("Borobudur".replace(/[ou]/g, "a")); // Barabadar

// sura => pong
// cherry => wong
console.log(
  "pong, sura\nwong, cherry".replace(
    /(\w+), (\w+)/g,
    ("$2 => $1"))); // $1 and $2 are matched groups.

let stock = "1 lemon, 2 cabbages, and 101 eggs";
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// 0:lemon, 1:cabbages, and 100:eggs
function minusOne(_, digits, words) {
  return (digits - 1) + ":" + words;
}

// Greed
function stripComments(code) {
  let comment = /\/\/.*|\/\*[^]*\*\//g;
  return code.replace(comment, "");
}
console.log(stripComments("x += 1; // hello there.")); // x += 1;
console.log(stripComments("run(/* count= */ 2, true);")); // run( 2, true);
console.log(stripComments("/**\n Helper function\n hello.\n */")); //

// 1 2; Why? Greedy matching!!
console.log(stripComments("1 /* a */ + /* b */ 2;")) // 1 2;

// Non-greedy matching +? *? ?? {}?
function nonGreedyStripComments(code) {
  let comment = /\/\/.*|\/\*[^]*?\*\//g;
  return code.replace(comment, "");
}
console.log(nonGreedyStripComments("1 /* a */ + /* b */ 2;")) // 1 + 2;

// lastIndex property (global mode).
{
  let pattern = /y/g;
  pattern.lastIndex = 3; // last match index at 2
  let match = pattern.exec("xyzzy");
  console.log(match.index); // 4
  console.log(pattern.lastIndex); // 5 (last match index = 4)
}
// global vs sticky
{
  let global = /abc/g;
  let sticky = /abc/y;
  console.log(global.exec("xyz abc")); // ["abc"] at idx = 4
  console.log(global.lastIndex); // 7

  console.log(sticky.lastIndex); // 0
  console.log(sticky.exec("xyz abc")); // null
  console.log(sticky.lastIndex); // 0

  // Only work iff starts directly at lastIndex.
  sticky.lastIndex = 4;
  console.log(sticky.exec("xyz abc")); // ["abc"] at idx = 4
  console.log(sticky.lastIndex); // 0
}

// Loop over matches
{
  let input = "A string with 3 numbers in it ... 42 and 88.";
  let number = /\b\d+\b/g;
  let x;
  while (x = number.exec(input)) {
    console.log("Found", x[0], "at", x.index);
  }
  // Found 3 at 14
  // Found 42 at 34
  // Found 88 at 41
}

// Unicode regexp //u
{
  console.log(/\p{Script=Greek}/u.test("α")); // true
  console.log(/\p{Script=Arabic}/u.test("α")); // false
  console.log(/\p{Alphabetic}/u.test("α")); // true
  console.log(/\p{Alphabetic}/u.test("!")); // false
}

// Exercises
// Golf
{
  // car and cat
  let r1 = /ca[rt]/;
  // pop and prop
  let r2 = /pr?op/;
  // ferret, ferry, and ferrari
  let r3 = /ferr(et|y|ari)/;
  // Any word ending in ious
  let r4 = /ious\b/;
  // A whitespace character followed by a period, comma, colon, or semicolon
  let r5 = /\s[.,:;]/;
  // A word longer than six letters
  let r6 = /\w{7}/;
  // A word without the letter e(or E)
  let r7 = /^\We/;
}

// Quoting style
{
  let text = "'I'm the cook,' he said, 'it's my job.'";
  console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));
  // → "I'm the cook," he said, "it's my job."
}
