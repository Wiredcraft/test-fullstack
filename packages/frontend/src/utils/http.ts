const post = async (url: string, data: any) => {
  const token = window.sessionStorage.getItem('token');
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

const put = async (url: string) => {
  const token = window.sessionStorage.getItem('token');
  const response = await fetch(url, {
    method: 'PUT',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bear ${token}`,
    },
  });
  return response.json();
};

const get = async (url: string) => {
  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default { post, get, put };
