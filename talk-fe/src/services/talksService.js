import request from '../utils/request';

export async function get() {
  // mock data
  // return new Promise(resolve => {
  //   console.log('service.get');
  //   setTimeout(() => {
  //     resolve([
  //       {
  //         id: 1,
  //         title: 'title',
  //         description: 'ssdasssssssd',
  //         likedCount: 1
  //       },
  //       {
  //         id: 2,
  //         title: 'title',
  //         description: 'ssdasssssssd',
  //         likedCount: 1
  //       },
  //       {
  //         id: 3,
  //         title: 'title',
  //         description: 'ssdasssssssd',
  //         likedCount: 1
  //       }
  //     ]);
  //   }, 1000);
  // });
  return request('/talks');
}

export async function like({ id }) {
  // return new Promise(resolve => {
  //   console.log('service.like', id);
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // });
  return request(`/talks/${id}/like`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    }
  });
}

export async function create({ title, description }) {
  return request(`/talks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
    },
    body: { title, description }
  });
}
