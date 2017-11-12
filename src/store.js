const { createStore, applyMiddleware } = require('redux');
const thunk = require('redux-thunk').default;

module.exports = init => {
  const reducer = (state = init, action) => {
    switch (action.type) {
      case 'FETCHING':
        return { ...state, fetching: true, error: undefined, data: undefined };
      case 'REJECTED':
        return { ...state, fetching: false, error: action.payload };
      case 'RESOLVED':
        return { ...state, fetching: false, data: action.payload };
      default:
        return state;
    }
  };

  return createStore(
    reducer,
    init,
    applyMiddleware(thunk.withExtraArgument('http://krautipsum.de'))
  );
};
