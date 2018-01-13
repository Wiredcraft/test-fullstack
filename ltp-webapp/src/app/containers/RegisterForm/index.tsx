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
}

@inject(STORE_TALK, STORE_ROUTER)
@observer
export class RegisterFormContainer extends React.Component<RegisterFormProps, RegisterFormState> {
  talkStore: TalkStore
  routerStore: RouterStore
  constructor (props: RegisterFormProps, context: any) {
    super(props, context)
    this.talkStore = this.props[STORE_TALK] as TalkStore
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
      confirmPasswordErrorMessage: ''
    }
  }

  handleChange = name => event => {
    const errorMessageKey = `${name}ErrorMessage`
    this.setState({
      [name]: event.target.value
    })

    if (name === 'username' && this.state.username.length <= 5) {
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

    if (name === 'confirmPassword' && this.state.confirmPassword.length <= 5) {
      this.setState({
        ['confirmPasswordError']: true,
        ['confirmPasswordErrorMessage']: 'Description should contain at least 5 letters.'
      })
    } else {
      this.setState({
        ['confirmPasswordError']: false,
        ['confirmPasswordErrorMessage']: ''
      })
    }
  }

  render () {
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
          onChange={this.handleChange('title')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
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
          onChange={this.handleChange('password')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <TextField
          id='confirmPassword'
          label='Confirm Password'
          value={this.state.confirmPassword}
          multiline={true}
          error={this.state.confirmPasswordError}
          helperText={this.state.confirmPasswordErrorMessage}
          onChange={this.handleChange('confirmPassword')}
        />
      </FormControl>
      <FormControl fullWidth className={styles.margin_top_1rem}>
        <Button raised color='primary'>Register</Button>
        <Button onClick={() => { this.routerStore.history.push('/login') }} color='primary'>Already have an account? Login</Button>
      </FormControl>
    </div>)
  }
}
