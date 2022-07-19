import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton, InputField } from 'components'
import { signUpInputsConfig } from 'config'
import { l, signUp } from 'utility'
import CONSTANTS from 'constants'
import { isNil } from 'lodash'

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const confirmSignUpRoute = `/${CONSTANTS?.ROUTES_NAMES?.CONFIRM_SIGN_UP}`

  const schema = yup
    .object()
    .shape({
      [CONSTANTS?.INPUT_ID?.USERNAME]: yup.string().min(3).required(),
      [CONSTANTS?.INPUT_ID?.EMAIL]: yup.string().email().required(),
      [CONSTANTS?.INPUT_ID?.PASSWORD]: yup.string().min(8).required(),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  async function handSignIn(data) {
    try {
      setIsLoading(true)
      const response = await signUp(data)

      if (response === false || isNil(response)) throw new Error('API Error')

      setIsLoading(false)
      navigate(`${confirmSignUpRoute}/${data?.username}`)
    } catch (error) {
      setIsLoading(false)
      // eslint-disable-next-line no-alert
      alert('Sign In Error. Please make sure you use the correct credentials.')
    }
  }

  function renderInputFields() {
    return signUpInputsConfig.map((item) => (
      <InputField
        key={item?.id}
        id={item?.id}
        label={item?.label}
        placeholder={item?.placeholder}
        type={item?.type}
        register={register(item?.id)}
        errors={errors}
        errorMessage={item?.errorMessage}
      />
    ))
  }

  return (
    <div>
      {renderInputFields()}

      <div className="primary-button-container">
        <PrimaryButton
          text="Sign Up"
          onClick={handleSubmit(handSignIn)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
