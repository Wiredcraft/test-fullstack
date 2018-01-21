import * as React from 'react'
import { TalkList } from '../../components/TalkList'
import { observer, inject } from 'mobx-react'
import { STORE_TALK, STORE_ROUTER, STORE_USER } from '../../constants/stores'
import { TalkStore, RouterStore, UserStore } from '../../stores'
import TalkHeader from '../../components/TalkHeader'

import Button from 'material-ui/Button'
import Snackbar from 'material-ui/Snackbar'
import AddIcon from 'material-ui-icons/Add'

import * as styles from './style.css'

export interface TalkListProps {

}

export interface TalkListState {
  loading: boolean
  snackBarOpen: boolean
  snackBarMessage: string
}

@inject(STORE_TALK, STORE_ROUTER, STORE_USER)
@observer
export class TalkListContainer extends React.Component<TalkListProps, TalkListState> {
  talkStore: TalkStore
  routerStore: RouterStore
  userStore: UserStore
  constructor (props: TalkListProps, context: any) {
    super(props, context)
    this.talkStore = this.props[STORE_TALK] as TalkStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
    this.userStore = this.props[STORE_USER] as UserStore
    this.state = {
      loading: false,
      snackBarOpen: false,
      snackBarMessage: ''
    }
    this.talkStore.httpClient = this.userStore.httpClient
  }

  componentDidMount () {
    this.setState({ loading: true })
    this.talkStore.loadData().then(() => {
      this.setState({ loading: false })
    }).catch(err => {
      this.setState({
        snackBarOpen: true,
        snackBarMessage: 'Error: ' + err.response.data.message
      })
    })
  }

  handleSnackBarClose = () => {
    this.setState({})
  }

  render () {
    const { snackBarOpen, snackBarMessage } = this.state
    return (
    <div>
      <TalkHeader />
      {this.state.loading ? 'Loading...' : (<TalkList likeTalk={this.likeTalk.bind(this)} talks={this.talkStore.talks} />)}
      <Snackbar
        anchorOrigin={{ 'vertical': 'top', 'horizontal': 'center' }}
        open={snackBarOpen}
        onClose={this.handleSnackBarClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{snackBarMessage}</span>}
      />
      <Button onClick={() => { this.routerStore.history.push('/new') }} color='primary' fab className={styles.right_bottom}><AddIcon /></Button>
    </div>)
  }

  private likeTalk (talkId: string) {
    (async () => {
      try {
        await this.talkStore.likeTalk(talkId)
      } catch (err) {
        console.error(err)
      }
    })()
  }
}
