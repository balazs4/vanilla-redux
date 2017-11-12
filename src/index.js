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

const setupDOM = mount => (config, onclick) => {
  const header = document.createElement('h1');
  header.innerText = `${config.label}`;

  const button = document.createElement('button');
  button.innerText = `Fetch ${config.api}`;
  button.onclick = onclick;

  const result = document.createElement('div');
  result.setAttribute('id', 'result');

  const element = document.createElement('div');
  element.setAttribute('id', config.id);
  element.appendChild(header);
  element.appendChild(button);
  element.appendChild(result);

  mount(element);

  const renderResult = content => {
    result.innerHTML = content;
  };

  return renderResult;
};

const hit = api => (dispatch, getState, base) => {
  dispatch({ type: 'FETCHING' });
  return fetch(`${base}${api}`)
    .then(x => (x.ok === true ? x.json() : Promise.reject(x.statusText)))
    .then(x => dispatch({ type: 'RESOLVED', payload: x }))
    .catch(x => dispatch({ type: 'REJECTED', payload: x }));
};

services
  .map(config => ({ config, store: setupStore(config) }))
  .forEach(({ config, store }) => {
    const mount = root.appendChild.bind(root);
    const onclick = () => store.dispatch(hit(config.api));
    const render = setupDOM(mount)(config, onclick);
    observable(store)
      .map(x => JSON.stringify(x, null, 2))
      .map(x => `<pre>${x}</pre>`)
      .onValue(render);
  });
