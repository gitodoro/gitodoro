export default () => {
  document.querySelector('#app').innerHTML = `
    <form method="GET" action="/login">
      <button type="submit">Login To Github</button>
    </form>
  `;
};
