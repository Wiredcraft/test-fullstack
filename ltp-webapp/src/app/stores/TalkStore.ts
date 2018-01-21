import { TalkModel } from '../models'
import { action, observable, runInAction } from 'mobx'
import { HttpStore } from './HttpStore'
import { RouterStore } from './RouterStore'

declare const socket: any

export class TalkStore extends HttpStore {
  @observable
  public talks: Array<TalkModel>

  @observable
  public liked: string[]

  constructor (routerStore: RouterStore, fixtures?: TalkModel[]) {
    super()
    if (Boolean(fixtures)) {
      this.talks = fixtures
    } else {
      this.talks = []
    }
    socket.on('talkChanged', (data) => {
      if (routerStore.location.pathname === '/') {
        runInAction(() => {
          this.loadData().then(() => {
            console.log('data reloaded.')
          })
        })
      }
    })
  }

  @action
  public likeTalk = async (talkId: string) => {
    await this.httpClient.post(`/api/talks/${talkId}/like`)
    const updatedTalks = this.talks.map(talk => {
      if (talk.id === talkId) {
        talk.score += 1
        talk.likedByCurrentUser = true
      }
      return talk
    }).sort((talk1, talk2) => {
      return talk2.score - talk1.score
    })
    runInAction(() => {
      this.talks = updatedTalks
    })
  }

  @action
  public async loadData () {
    await this.loadTalks()
    await this.loadLiked()
    runInAction(() => {
      this.talks = this.talks.map(talk => {
        if (this.liked.includes(talk.id)) {
          talk.likedByCurrentUser = true
        }
        return talk
      })
    })
  }

  @action
  public async loadLiked () {
    const res = await this.httpClient.get('/api/talks/liked')
    this.liked = res.data
  }

  @action
  public async loadTalks () {
    const res = await this.httpClient.get('/api/talks')
    runInAction(() => {
      this.talks = res.data as TalkModel[]
    })
  }

  @action
  public async createTalk (talkData: Partial<TalkModel>) {
    const res = await this.httpClient.post('/api/talks', talkData)
    await this.loadTalks()
  }
}

export default TalkStore
