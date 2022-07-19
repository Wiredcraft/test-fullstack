import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton, InputField } from 'components'
import { signUpInputsConfig } from 'config'
import { l, signUp } from 'utility'
import CONSTANTS from 'constants'
import { isNil } from 'lodash'

export default function ConfirmSignUp() {
  const params = useParams()
  useEffect(() => {
    l(params?.username)
  }, [])

  return (
    <div>
      <div className="primary-button-container">
        <PrimaryButton text="Activate" />
      </div>
    </div>
  )
}
