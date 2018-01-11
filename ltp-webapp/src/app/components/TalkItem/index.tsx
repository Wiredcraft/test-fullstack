import { TalkModel } from '../../models/index'
import * as React from 'react'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel'
import Typography from 'material-ui/Typography'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'

export interface TalkActions {

}

export interface TalkProps extends TalkActions {
  talk: TalkModel
}

export interface TalkState {
  editing: boolean
}

export class TalkItem extends React.Component<TalkProps, TalkState> {
  constructor (props?: TalkProps, context?: any) {
    super(props, context)
    this.state = { editing: false }
  }

  render () {
    return (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Expansion Panel 1</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
    )
  }
}