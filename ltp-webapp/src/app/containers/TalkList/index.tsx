import * as React from 'react'
import { TalkList } from '../../components/TalkList'
import { observer, inject } from 'mobx-react'
import { STORE_TALK, STORE_ROUTER } from '../../constants/stores'
import { TalkStore, RouterStore } from '../../stores'
import TalkHeader from '../../components/TalkHeader'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import * as styles from './style.css'

export interface TalkListProps {

}

export interface TalkListState {

}

@inject(STORE_TALK, STORE_ROUTER)
@observer
export class TalkListContainer extends React.Component<TalkListProps, TalkListState> {
  talkStore: TalkStore
  routerStore: RouterStore
  constructor (props: TalkListProps, context: any) {
    super(props, context)
    this.talkStore = this.props[STORE_TALK] as TalkStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
  }

  render () {
    return (
    <div>
      <TalkHeader />
      <TalkList likeTalk={this.likeTalk.bind(this)} talks={this.talkStore.talks} />
      <Button onClick={() => { this.routerStore.history.push('/new') }} color='primary' fab className={styles.right_bottom}><AddIcon /></Button>
    </div>)
  }

  private likeTalk (talkId: string) {
    this.talkStore.likeTalk(talkId)
  }
}
