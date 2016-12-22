const request = (method, url, payload, resolve) => {
  const xhr = new XMLHttpRequest();
  const payloadString = JSON.stringify(payload);

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      resolve(JSON.parse(xhr.responseText));
    }
  };
  xhr.open(method, url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(payloadString);
};

const get = (url) => new Promise((resolve) => request('GET', url, null, resolve));
const post = (url, payload) => new Promise((resolve) => request('POST', url, payload, resolve));
const put = (url, payload) => new Promise((resolve) => request('PUT', url, payload, resolve));
const del = (url) => new Promise((resolve) => request('DELETE', url, null, resolve));

export default { get, post, put, del };
