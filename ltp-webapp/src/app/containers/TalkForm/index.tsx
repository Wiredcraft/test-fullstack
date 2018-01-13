import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { STORE_TALK, STORE_ROUTER } from '../../constants/stores'
import { TalkStore, RouterStore } from '../../stores'
import TalkHeader from '../../components/TalkHeader'

import * as styles from './style.css'

import TextField from 'material-ui/TextField'
import FormControl from 'material-ui/Form/FormControl'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'

import marked from 'marked'

export interface TalkFormProps {

}

export interface LoginFormState {
  title: string
  titleError: boolean
  titleErrorMessage: string
  description: string
  descriptionError: boolean
  descriptionErrorMessage: string
}

@inject(STORE_TALK, STORE_ROUTER)
@observer
export class TalkFormContainer extends React.Component<TalkFormProps, LoginFormState> {
  talkStore: TalkStore
  routerStore: RouterStore
  constructor (props: TalkFormProps, context: any) {
    super(props, context)
    this.talkStore = this.props[STORE_TALK] as TalkStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
    this.state = {
      title: '',
      titleError: false,
      titleErrorMessage: '',
      description: '',
      descriptionError: false,
      descriptionErrorMessage: ''
    }
  }

  handleChange = name => event => {
    let errorKey = 'titleError'
    const errorMessageKey = `${name}ErrorMessage`
    this.setState({
      [name]: event.target.value
    })
    if (name === 'title' && this.state.title.length <= 5) {
      this.setState({
        ['titleError']: true,
        ['titleErrorMessage']: 'Title should contain at least 5 letters.'
      })
    } else {
      this.setState({
        ['titleError']: false,
        ['titleErrorMessage']: ''
      })
    }

    if (name === 'description' && this.state.description.length <= 5) {
      this.setState({
        ['descriptionError']: true,
        ['descriptionErrorMessage']: 'Description should contain at least 5 letters.'
      })
    } else {
      this.setState({
        ['descriptionError']: false,
        ['descriptionErrorMessage']: ''
      })
    }
  }

  render () {
    return (
    <div>
      <TalkHeader />
      <h2>Add my talk</h2>
      <FormControl fullWidth>
        <TextField
          id='title'
          label='Title'
          value={this.state.title}
          error={this.state.titleError}
          helperText={this.state.titleErrorMessage}
          onChange={this.handleChange('title')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <TextField
          id='title'
          label='Description[Markdown]'
          value={this.state.description}
          multiline={true}
          error={this.state.descriptionError}
          helperText={this.state.descriptionErrorMessage}
          onChange={this.handleChange('description')}
        />
      </FormControl>
      <div dangerouslySetInnerHTML={{ __html: marked(this.state.description) }}>
      </div>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <Button raised color='primary'>Submit</Button>
      </FormControl>
      <Button onClick={() => { this.routerStore.history.push('/') }} color='primary' fab className={styles.right_bottom}>Go Back</Button>
    </div>)
  }
}
