import api from './api-instance';

class LightningTalkService {
  list(page) {
    return api.get('lightning-talks' + (page ? `?page=${encodeURIComponent(page)}` : ''));
  }

  get(id) {
    return api.get(`lightning-talks/${id}`);
  }

  vote(id) {
    return api.post(`lightning-talks/${id}/vote`);
  }

  unvote(id) {
    return api.delete(`lightning-talks/${id}/vote`);
  }

  create(title, description, file) {
    return api.post('lightning-talks', { title }).then(res => {
      if (res.data.error) {
        return res;
      }
      const formData = new FormData();
      formData.append('description', description);
      formData.append('file', file);
      return api.post(res.data.result.uploadUri, formData);
    });
  }
}

export default new LightningTalkService();