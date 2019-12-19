// function loadScript(url) {
//   var head = document.getElementsByTagName('head')[0];
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = url;
//   head.appendChild(script);
// }
// loadScript('scripts.js');
// loadScript('intro.js');
// loadScript('chapter05.js');

function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, s => s.living));
console.log(SCRIPTS[0]);