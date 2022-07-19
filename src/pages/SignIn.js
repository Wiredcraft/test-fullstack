import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PrimaryButton, InputField } from 'components'
import { signInInputsConfig } from 'config'
import { l, signIn } from 'utility'
import CONSTANTS from 'constants'

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const signUpRoute = `/${CONSTANTS?.ROUTES_NAMES?.SIGN_UP}`

  const schema = yup
    .object()
    .shape({
      [CONSTANTS?.INPUT_ID?.USERNAME]: yup.string().min(3).required(),
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
      const { username, password } = data

      setIsLoading(true)
      const response = await signIn(username, password)

      if (response === false) throw new Error('API Error')

      setIsLoading(false)
      navigate(CONSTANTS?.ROUTES_NAMES?.HOME)
    } catch (error) {
      setIsLoading(false)
      // eslint-disable-next-line no-alert
      alert('Sign In Error. Please make sure you use the correct credentials.')
    }
  }

  function renderInputFields() {
    return signInInputsConfig.map((item) => (
      <InputField
        key={item?.id}
        id={item?.id}
        label={item?.label}
        placeholder={item?.placeholder}
        type={item?.type}
        register={register(item?.id)}
        errors={errors}
        errorMessage={item?.errorMessage}
        disabled={isLoading}
      />
    ))
  }

  return (
    <div>
      {renderInputFields()}

      <div className="primary-button-container">
        <PrimaryButton
          text="Sign In"
          onClick={handleSubmit(handSignIn)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
