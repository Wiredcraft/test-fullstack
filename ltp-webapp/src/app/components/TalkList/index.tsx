import * as React from 'react'
import { TalkItem } from '../TalkItem/index'
import { TalkModel } from '../../models/index'
import { Typography } from 'material-ui'
export interface TalkListProps {
  talks: TalkModel[]
  likeTalk: (talkId: string) => void
}

export interface TalkListState {

}

export class TalkList extends React.Component<TalkListProps, TalkListState> {
  constructor (props?: TalkListProps, context?: any) {
    super(props, context)
  }

  render () {
    if (this.props.talks.length === 0) {
      return (<Typography>No lighting talk yet</Typography>)
    }
    return this.props.talks.map((talk, index) => (<TalkItem likeTalk = {this.props.likeTalk} talk = {talk} key={'talk-item-' + index } />))
  }
}
