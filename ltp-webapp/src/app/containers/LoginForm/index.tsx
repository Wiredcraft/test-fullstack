import * as React from 'react'
import { observer, inject } from 'mobx-react'
import isEmail from 'validator/lib/isEmail'
import { STORE_TALK, STORE_ROUTER, STORE_USER } from '../../constants/stores'
import { TalkStore, RouterStore, UserStore } from '../../stores'
import TalkHeader from '../../components/TalkHeader'

import * as styles from './style.css'

import TextField from 'material-ui/TextField'
import FormControl from 'material-ui/Form/FormControl'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Snackbar from 'material-ui/Snackbar'

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
  saving: boolean
  snackBarOpen: boolean
  snackBarMessage: string
}

@inject(STORE_ROUTER, STORE_USER)
@observer
export class LoginFormContainer extends React.Component<LoginFormProps, LoginFormState> {
  userStore: UserStore
  routerStore: RouterStore
  constructor (props: LoginFormProps, context: any) {
    super(props, context)
    this.userStore = this.props[STORE_USER] as UserStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      password: '',
      passwordError: false,
      passwordErrorMessage: '',
      saving: false,
      snackBarOpen: false,
      snackBarMessage: ''
    }
  }

  handleChange = name => event => {
    const errorMessageKey = `${name}ErrorMessage`
    this.setState({
      [name]: event.target.value
    }, () => {
      if (name === 'email' && !isEmail(this.state.email)) {
        // TODO: email check logic
        this.setState({
          ['emailError']: true,
          ['emailErrorMessage']: 'Email format is not valid.'
        })
      } else {
        this.setState({
          ['emailError']: false,
          ['emailErrorMessage']: ''
        })
      }
      if (name === 'password' && this.state.password.length < 5) {
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
    })
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false, snackBarMessage: '' })
  }

  login = () => {
    const { email, password, emailError, passwordError } = this.state
    if (!email || !password || emailError || passwordError) {
      return
    }
    (async () => {
      this.setState({ saving: true })
      try {
        await this.userStore.login(this.state)
        this.setState({ snackBarMessage: 'Login success', snackBarOpen: true })
        this.routerStore.history.push('/')
      } catch (error) {
        this.setState({ snackBarMessage: 'Error: ' + error.response.data.message, snackBarOpen: true })
        this.setState({ saving: false })
      }
    })()
  }

  render () {
    const vertical = 'top'
    const horizontal = 'center'
    const { snackBarOpen, snackBarMessage, saving } = this.state
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
          onChange={this.handleChange('email')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <TextField
          id='password'
          label='Password'
          value={this.state.password}
          multiline={false}
          error={this.state.passwordError}
          helperText={this.state.passwordErrorMessage}
          onChange={this.handleChange('password')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <Button raised color='primary' onClick = {this.login} disabled={saving}>Login</Button>
        <Button onClick={() => { this.routerStore.history.push('/register') }} color='primary'>Has not had an account? Register</Button>
      </FormControl>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarOpen}
        onClose={this.handleSnackBarClose}
        SnackbarContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id='message-id'>{snackBarMessage}</span>}
      />
    </div>)
  }
}
