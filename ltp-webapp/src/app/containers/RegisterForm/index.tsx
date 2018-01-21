import * as React from 'react'
import { observer, inject } from 'mobx-react'
import isEmail from 'validator/lib/isEmail'
import { STORE_USER, STORE_ROUTER } from '../../constants/stores'
import { UserStore, RouterStore } from '../../stores'
import TalkHeader from '../../components/TalkHeader'

import * as styles from './style.css'

import TextField from 'material-ui/TextField'
import FormControl from 'material-ui/Form/FormControl'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Snackbar from 'material-ui/Snackbar'

import marked from 'marked'

export interface RegisterFormProps {

}

export interface RegisterFormState {
  email: string
  emailError: boolean
  emailErrorMessage: string
  username: string
  usernameError: boolean
  usernameErrorMessage: string
  password: string
  passwordError: boolean
  passwordErrorMessage: string
  confirmPassword: string
  confirmPasswordError: boolean
  confirmPasswordErrorMessage: string
  snackBarOpen: boolean
  snackBarMessage: string
}

@inject(STORE_USER, STORE_ROUTER)
@observer
export class RegisterFormContainer extends React.Component<RegisterFormProps, RegisterFormState> {
  userStore: UserStore
  routerStore: RouterStore
  constructor (props: RegisterFormProps, context: any) {
    super(props, context)
    this.userStore = this.props[STORE_USER] as UserStore
    this.routerStore = this.props[STORE_ROUTER] as RouterStore
    this.state = {
      email: '',
      emailError: false,
      emailErrorMessage: '',
      username: '',
      usernameError: false,
      usernameErrorMessage: '',
      password: '',
      passwordError: false,
      passwordErrorMessage: '',
      confirmPassword: '',
      confirmPasswordError: false,
      confirmPasswordErrorMessage: '',
      snackBarOpen: false,
      snackBarMessage: ''
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    }, () => {
      console.log(this.state)
      if (name === 'username' && this.state.username.length < 5) {
        // TODO: username check logic
        this.setState({
          ['usernameError']: true,
          ['usernameErrorMessage']: 'Username should contain at least 5 letters.'
        })
      } else {
        this.setState({
          ['usernameError']: false,
          ['usernameErrorMessage']: ''
        })
      }
      if (name === 'email') {
        if (!isEmail(this.state.email)) {
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
      }
      if (name === 'password' || name === 'confirmPassword') {
        if (this.state.password.length < 5) {
          this.setState({
            ['passwordError']: true,
            ['passwordErrorMessage']: 'Password should contain at least 5 letters.'
          })
        } else {
          if (this.state.confirmPassword !== this.state.password) {
            this.setState({
              ['confirmPasswordError']: true,
              ['confirmPasswordErrorMessage']: 'Confirm password should be equal with password'
            })
          } else {
            this.setState({
              ['confirmPasswordError']: false,
              ['confirmPasswordErrorMessage']: ''
            })
          }
          this.setState({
            ['passwordError']: false,
            ['passwordErrorMessage']: ''
          })
        }
      }
    })
  }

  register = () => {
    if (!this.state.username ||
      !this.state.password ||
      !this.state.email ||
      !this.state.confirmPassword ||
      this.state.usernameError ||
      this.state.emailError ||
      this.state.passwordError ||
      this.state.confirmPasswordError
    ) {
      return
    }
    (async () => {
      try {
        const registerResult = await this.userStore.register(this.state)
        this.routerStore.history.push('/login')
      } catch (error) {
        this.setState({ snackBarOpen: true, snackBarMessage: 'Error: ' + error.response.data.message })
      }
    })()
  }

  handleSnackBarClose = () => {
    this.setState({ snackBarOpen: false, snackBarMessage: '' })
  }

  render () {
    const { snackBarOpen, snackBarMessage } = this.state
    return (
    <div>
      <TalkHeader />
      <h2>Register</h2>
      <FormControl fullWidth>
        <TextField
          id='username'
          label='Username'
          value={this.state.username}
          error={this.state.usernameError}
          helperText={this.state.usernameErrorMessage}
          onChange={this.handleChange('username')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
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
          error={this.state.passwordError}
          helperText={this.state.passwordErrorMessage}
          onChange={this.handleChange('password')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <TextField
          id='confirmPassword'
          label='Confirm Password'
          value={this.state.confirmPassword}
          error={this.state.confirmPasswordError}
          helperText={this.state.confirmPasswordErrorMessage}
          onChange={this.handleChange('confirmPassword')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <Button raised color='primary' onClick={this.register}>Register</Button>
        <Button onClick={() => { this.routerStore.history.push('/login') }} color='primary'>Already have an account? Login</Button>
      </FormControl>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
