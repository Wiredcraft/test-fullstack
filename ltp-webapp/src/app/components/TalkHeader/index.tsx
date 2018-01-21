import * as React from 'react'
import './index.css'

interface TalkHeaderProps {

}

interface TalkHeaderState {
}

export default class TalkHeader extends React.Component< TalkHeaderProps, TalkHeaderState > {
  constructor (props: TalkHeaderProps, context: any) {
    super(props, context)
  }
  render () {
    return (<h1>Lighting Talk Polling</h1>)
  }
}
