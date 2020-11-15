import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import config from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class LightningTalkService {
  constructor(private http: HttpClient) { }

  list({ page }) {
    return this.http.get(`${config.apiUrl}/lightning-talks` + (page? `?page=${encodeURIComponent(page)}` : ''));
  }

  get(id) {
    return this.http.get(`${config.apiUrl}/lightning-talks/${id}`);
  }

  vote(id) {
    return this.http.post(`${config.apiUrl}/lightning-talks/${id}/vote`, null);
  }

  unvote(id) {
    return this.http.delete(`${config.apiUrl}/lightning-talks/${id}/vote`);
  }

  create(title, description, file) {
    return this.http.post(`${config.apiUrl}/lightning-talks`, { title }).pipe(mergeMap((data: any) => {
      if (data.error) {
        return data;
      }
      const formData = new FormData();
      formData.append('description', description);
      formData.append('file', file);
      return this.http.post(data.result.uploadUri, formData);
    }))
  }
}
