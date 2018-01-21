import { TalkModel } from '../../models/index'
import * as React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions,
  ExpansionPanelProps
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ThumbUpIcon from 'material-ui-icons/ThumbUp'
import marked from 'marked'
import * as styles from './index.css'

export interface TalkActions {
  likeTalk: (talkId: string) => void
}

export interface TalkProps extends TalkActions {
  talk: TalkModel
}

export interface TalkState {
  expanded: boolean
}

export class TalkItem extends React.Component<TalkProps, TalkState> {
  constructor (props?: TalkProps, context?: any) {
    super(props, context)
    this.state = { expanded: false }
  }

  render () {
    const authorName = this.props.talk.author ? this.props.talk.author.username : 'None'
    return (
    <ExpansionPanel expanded = {this.state.expanded} onChange = {() => { this.setState({ expanded: !this.state.expanded }) }}>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={styles.title}>
          <Typography>{this.props.talk.title}</Typography>
        </div>
        <div className={styles.score}>
          {this.getScoreShowText(this.props.talk.score)}
        </div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <div className={styles.desc} dangerouslySetInnerHTML={{ __html: marked(this.props.talk.description) }}></div>
        <div className={styles.other_holder}>
          <div><Typography>{authorName}</Typography></div>
          <div><Typography>{this.props.talk.createdAt ? new Date(this.props.talk.createdAt).toString() : 'None'}</Typography></div>
        </div>
      </ExpansionPanelDetails>
      <ExpansionPanelActions>
        <span>{this.props.talk.likedByCurrentUser ? 'You are already the supporter, thanks. ' : 'Please give me a thumb if you like this topic.'}</span>
        {!this.props.talk.likedByCurrentUser && (<Button dense color='primary' onClick={this.likeTalk.bind(this)}>
          <ThumbUpIcon />
        </Button>)}
      </ExpansionPanelActions>
    </ExpansionPanel>
    )
  }

  private likeTalk (event) {
    this.props.likeTalk(this.props.talk.id)
    this.setState({ expanded: false })
  }

  private getScoreShowText (score: number) {
    let showText = ''
    if (!score) {
      showText = 'No supporter yet'
    }
    if (score === 1) {
      showText = '1 person likes it'
    }
    if (score > 1) {
      showText = score + ' people like it.'
    }
    return <Typography>{showText}</Typography>
  }
}
