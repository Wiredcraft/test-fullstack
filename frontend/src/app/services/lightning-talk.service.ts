import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LightningTalkService {
  constructor(private http: HttpClient) { }

  list({ page }) {
    return this.http.get('http://localhost:3000/lightning-talks' + (page? `?page=${encodeURIComponent(page)}` : ''));
  }

  get(id) {
    return this.http.get('http://localhost:3000/lightning-talks/' + id);
  }

  vote(id) {
    return this.http.post(`http://localhost:3000/lightning-talks/${id}/vote`, null);
  }

  unvote(id) {
    return this.http.delete(`http://localhost:3000/lightning-talks/${id}/vote`);
  }

  create(title, file) {
    return this.http.post('http://localhost:3000/lightning-talks', { title }).pipe(mergeMap((data: any) => {
      if (data.error) {
        return data;
      }
      const formData = new FormData();
      formData.append('title', title);
      formData.append('file', file);
      return this.http.post(data.result.uploadUri, formData);
    }))
  }
}
