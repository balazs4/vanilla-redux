const setupStore = require('./store');
const observable = require('./observable');

console.log('INIT');

const services = [
  { id: 'greeting', api: '/api/greeting', label: 'Greeting only' },
  { id: 'kraut', api: '/api/kraut', label: 'Random paragraph' }
];

const root = document.createElement('div');
//mount app
document.body.appendChild(root);

services
  .map(x => {
    const header = document.createElement('h1');
    header.innerText = `${x.label}`;

    const button = document.createElement('button');
    button.innerText = `Fetch ${x.api}`;

    const result = document.createElement('div');
    result.setAttribute('id', 'result');

    const element = document.createElement('div');
    element.setAttribute('id', x.id);
    element.appendChild(header);
    element.appendChild(button);
    element.appendChild(result);

    const store = setupStore(x);

    const hit = api => (dispatch, getState, base) => {
      dispatch({ type: 'FETCHING' });
      return fetch(`${base}${api}`)
        .then(x => (x.ok === true ? x.json() : Promise.reject(x.statusText)))
        .then(x => dispatch({ type: 'RESOLVED', payload: x }))
        .catch(x => dispatch({ type: 'REJECTED', payload: x }));
    };

    button.onclick = () => store.dispatch(hit(x.api));

    observable(store).onValue(
      x => (result.innerHTML = `<pre>${JSON.stringify(x, null, 2)}</pre>`)
    );

    return element;
  })
  .forEach(x => root.appendChild(x));
