export default () => {
  document.querySelector('#app').innerHTML = `
    <form method="GET" action="/login">
      <button class="button is-info" type="submit">Login To Github</button>
    </form>
  `;
};
