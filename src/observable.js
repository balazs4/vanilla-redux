const { stream } = require('kefir');

module.exports = store =>
  stream(obs => {
    store.subscribe(() => {
      obs.emit(store.getState());
    });
    obs.emit(store.getState()) // init
  }).skipDuplicates((a, b) => JSON.stringify(a) === JSON.stringify(b));

