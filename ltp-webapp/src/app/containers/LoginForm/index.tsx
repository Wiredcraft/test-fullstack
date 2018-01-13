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

export interface LoginFormProps {

}

export interface LoginFormState {
  email: string
  emailError: boolean
  emailErrorMessage: string
  password: string
  passwordError: boolean
  passwordErrorMessage: string
}

@inject(STORE_TALK, STORE_ROUTER)
@observer
export class LoginFormContainer extends React.Component<LoginFormProps, LoginFormState> {
  talkStore: TalkStore
  routerStore: RouterStore
  constructor (props: LoginFormProps, context: any) {
    super(props, context)
    this.talkStore = this.props[STORE_TALK] as TalkStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      password: '',
      passwordError: false,
      passwordErrorMessage: ''
    }
  }

  handleChange = name => event => {
    const errorMessageKey = `${name}ErrorMessage`
    this.setState({
      [name]: event.target.value
    })
    if (name === 'email' && this.state.email.length <= 5) {
      // TODO: email check logic
      this.setState({
        ['emailError']: true,
        ['emailErrorMessage']: 'Email should contain at least 5 letters.'
      })
    } else {
      this.setState({
        ['emailError']: false,
        ['emailErrorMessage']: ''
      })
    }

    if (name === 'password' && this.state.password.length <= 5) {
      this.setState({
        ['passwordError']: true,
        ['passwordErrorMessage']: 'Description should contain at least 5 letters.'
      })
    } else {
      this.setState({
        ['passwordError']: false,
        ['passwordErrorMessage']: ''
      })
    }
  }

  render () {
    return (
    <div>
      <TalkHeader />
      <h2>Login</h2>
      <FormControl fullWidth>
        <TextField
          id='email'
          label='Email'
          value={this.state.email}
          error={this.state.emailError}
          helperText={this.state.emailErrorMessage}
          onChange={this.handleChange('title')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <TextField
          id='password'
          label='Password'
          value={this.state.password}
          multiline={true}
          error={this.state.passwordError}
          helperText={this.state.passwordErrorMessage}
          onChange={this.handleChange('description')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <Button raised color='primary'>Login</Button>
        <Button onClick={() => { this.routerStore.history.push('/register') }} color='primary'>Has not had an account? Register</Button>
      </FormControl>
    </div>)
  }
}
