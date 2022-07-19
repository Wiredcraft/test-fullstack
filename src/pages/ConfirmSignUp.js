import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { isNil } from 'lodash'
import { PrimaryButton, InputField, UnstyledButton } from 'components'
import { confirmSignUpInputsConfig } from 'config'
import { l, confirmSignUp, resendConfirmationCode } from 'utility'
import CONSTANTS from 'constants'

export default function ConfirmSignUp() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const signInRoute = `/${CONSTANTS?.ROUTES_NAMES?.SIGN_IN}`

  const schema = yup
    .object()
    .shape({
      [CONSTANTS?.INPUT_ID?.USERNAME]: yup.string().min(3).required(),
      [CONSTANTS?.INPUT_ID?.CONFIRMATION_CODE]: yup.string().length(6),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      [CONSTANTS?.INPUT_ID?.USERNAME]: params?.username,
    },
  })

  async function handSignIn(data) {
    try {
      const { username, confirmationCode } = data

      setIsLoading(true)
      const response = await confirmSignUp(username, confirmationCode)

      if (response !== 'SUCCESS') throw new Error('API Error')

      setIsLoading(false)
      navigate(signInRoute)
    } catch (error) {
      setIsLoading(false)
      // eslint-disable-next-line no-alert
      alert(
        'Activating account Error. Please make sure you use the correct credentials.',
      )
    }
  }

  function renderInputFields() {
    return confirmSignUpInputsConfig.map((item) => (
      <InputField
        key={item?.id}
        id={item?.id}
        label={item?.label}
        placeholder={item?.placeholder}
        type={item?.type}
        register={register(item?.id)}
        errors={errors}
        errorMessage={item?.errorMessage}
        disabled={
          isLoading ||
          (CONSTANTS?.INPUT_ID?.USERNAME === item?.id && params?.username)
        }
      />
    ))
  }

  return (
    <div>
      {renderInputFields()}

      {isNil(params?.username) ? (
        <UnstyledButton text="Sign In" onClick={() => navigate(signInRoute)} />
      ) : (
        <UnstyledButton
          text="Resend Code"
          onClick={() => resendConfirmationCode(params?.username)}
        />
      )}

      <div className="primary-button-container">
        <PrimaryButton
          text="Activate"
          onClick={handleSubmit(handSignIn)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
