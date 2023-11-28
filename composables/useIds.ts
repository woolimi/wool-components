const idGenerator = (function* () {
  let i = 1;
  while (true) {
    yield `wc-id-${i++}`;
  }
})();

export const useIds = () => ({
  get() {
    return idGenerator.next().value;
  },
});
