const bigOak = network.nodes["Big Oak"];

console.log('hello');

bigOak.readStorage("food caches", caches => {
  console.log(caches);
});
