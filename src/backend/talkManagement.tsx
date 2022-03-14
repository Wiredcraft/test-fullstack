class Talk {
    title?: string;
    description?: string;
    time?: string;
    user?: string;
    rate: number = 0;
}

interface TalkService {
    insert(data: Array<any>): Promise<void>;
    update(data: Talk): Promise<void>;
    queryAll(): Promise<Array<Talk>>;
}

class TalkServiceImpl implements TalkService {
    private static talkService: TalkService;

    private constructor() {};

    static createService(): TalkService {
        if(null == this.talkService) {
            this.talkService = new TalkServiceImpl();
        }
        return this.talkService;
    }

    insert(data: Array<any>) {
      console.log('calling insert')
      return new Promise<void>((resolve, reject) => {

          if(window.indb) {
            this.queryAll().then((allData) => {
              let id = allData.length + 1;
              data.id = id;
              let request = window.indb.transaction(['TALKS'], 'readwrite').objectStore('TALKS')
              .add(data);
              request.onsuccess = resolve;
            
              request.onerror = reject
            });
          }
      });
    }

    update(data: Array<any>) {
      console.log('calling update')
      return new Promise<void>((resolve, reject) => {

          if(window.indb) {
            let request = window.indb.transaction(['TALKS'], 'readwrite').objectStore('TALKS')
            .put(data);
            request.onsuccess = resolve;
          
            request.onerror = reject
          }
      });
    }

    queryAll() {
      console.log('calling queryAll')
      return new Promise<Array<Talk>>((resolve, reject) => {
          if(window.indb) {
            let objectStore = window.indb.transaction(['TALKS']).objectStore('TALKS');
            let result: Array<Talk> = [];
            objectStore.openCursor().onsuccess = (event: { target: { result: any; }; }) => {
              let cursor = event.target.result;
              if(cursor) {
                cursor.value.id = cursor.key
                result.push(cursor.value);
                cursor.continue();
              } else {
                console.log(result)
                result = result.sort((a: Talk,b: Talk) => { return b.rate - a.rate });
                resolve(result);
              }
            };
          }
      })
    }
}

export {
    Talk,
    TalkService,
    TalkServiceImpl
};