// Repeate "action" for "n" times
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
      return script;
    }
  }
  return null;
}

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({
        name,
        count: 1
      });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({
    name
  }) => name != "none");

  let total = scripts.reduce((n, {
    count
  }) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({
    name,
    count
  }) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

function main05() {
  function filter(array, test) {
    let passed = [];
    for (let element of array) {
      if (test(element)) {
        passed.push(element);
      }
    }
    return passed;
  }

  console.log([1, -2, 3].filter(x => x > 0)); // [1, 3]
  console.log([1, 2, 3].map(x => 2 * x)); // [2, 4, 6]

  // Think reduce() as the way to aggregate array into single value.
  console.log([1, 2, 3].reduce((x, y) => x - y)); // (1 - 2) - 3 = -4
  console.log([2, 4, 3, 1].reduce((x, y) => Math.min(x, y))); // min(min(min(2, 4), 3), 1) = 1

  // Avg year of living script in unicode.
  let liveScripts = SCRIPTS.filter(s => s.living).map(s => s.year);
  console.log(Math.round(liveScripts.reduce((a, b) => a + b) / liveScripts.length));

  // Return true there exists some elem > 10.
  console.log([1, 2, 3].some(x => x > 10)); // false

  // Each code unit = 16-bit number. UTF-16.
  // Each unicode char needs 2 code units.
  let horseShoe = "🐴👟";
  console.log(horseShoe.length); // 4
  console.log(horseShoe[0]); // half-char emoji horse (unreadable)
  console.log(horseShoe.charCodeAt(0)); // 55357 (code for half emoji horse)
  // [55357, 56372, 55357, 56415]
  console.log(range(0, 3).map(i => horseShoe.charCodeAt(i)));

  console.log(horseShoe[0] + horseShoe[1]); // full (2-unit) emoji horse
  // [    [0     1]      [2     3]]
  // [128052, 56372, 128095, 56415]  only the 128052 and 128095 are valid.
  console.log(range(0, 3).map(i => horseShoe.codePointAt(i)));

  // Iterate each char in String (unicode).
  for (let c of horseShoe) {} // How to iterate each char in String.
  // horseShoe.forEach(c => {}); // forEach is not allowed here!!

  // 61% Han, 22% Latin, 17% Cyrillic
  console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));

  // Exercises

  // Flattening
  console.log([
    [1, 2],
    [3],
    [4, 5, 6]
  ].reduce((a, b) => a.concat(b), [])); // [1,2,3,4,5,6]

  // You own loop
  function loop(start, test, update, body) {
    for (let x = start; test(x); x = update(x)) {
      body(x);
    }
  }
  loop(3, n => n > 0, n => n - 1, console.log);

  // Everything
  function every(array, test) {
    return !array.some(x => !test(x));
    //  return array.reduce((x, y) => x && test(y), true);
  }

  console.log(every([1, 3, 5], n => n < 10)); // true
  console.log(every([2, 4, 16], n => n < 10)); // false
  console.log(every([], n => n < 10)); // true

  // Dominant writing
  function dominantDirection(text) {
    let scripts = countBy(text, char => {
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
    }).filter(({
      name
    }) => name != "none");

    if (scripts.length == 0) {
      return undefined;
    }
    let dominantScript = scripts.reduce((a, b) => a.count > b.count ? a : b);
    return dominantScript.name;
  }
  console.log(dominantDirection("Hello!")); // ltr
  console.log(dominantDirection("Hey, مساء الخير")); // rtl
}