import * as React from 'react'
import { connect } from 'react-redux'
import * as ToastNodes from './Toast.styles'
import { onToast } from '../actions/toastActions'

const _ = require('../utils/underscore')

interface Props {
  toast: any,
  dispatch: any,
}

export let closeToastExport: any

class Toast extends React.Component<Props> {

  constructor (props: Props) {
    super(props)

    this.timeoff = 2000
    this.timeout = null
    closeToastExport = this.closeToast
  }

  componentDidUpdate () {
    const { showToast, timeoff } = this.props.toast
    if (showToast === true) {
      this.timeout = setTimeout(this.closeToast, timeoff || this.timeoff)
    }
  }

  closeToast = () => {
    this.timeout && clearTimeout(this.timeout)
    this.props.dispatch(onToast({
      showToast: false,
      message: null,
    }))
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
  }

  timeoff: number
  timeout: any

  render () {
    const { showToast, message } = this.props.toast
    if (showToast !== true) return null
    if (!_.isString(message) || _.isEmpty(message)) return null
    return (
      <ToastNodes.Toast>
        <ToastNodes.ToastInner>
          <ToastNodes.ToastLine>
            { message }
          </ToastNodes.ToastLine>
        </ToastNodes.ToastInner>
      </ToastNodes.Toast>
    )
  }
}

const mapStateToProps = (state: any) => ({
  toast: state.toast,
})

export default connect(mapStateToProps)(Toast)
