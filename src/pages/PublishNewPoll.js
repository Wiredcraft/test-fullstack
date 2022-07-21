import * as api from 'api'
import * as yup from 'yup'

import { InputField, PrimaryButton } from 'components'
import React, { useState } from 'react'

import CONSTANTS from 'constants'
import { publishNewPollConfig } from 'config'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

export default function PublishNewPoll() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const schema = yup
    .object()
    .shape({
      [CONSTANTS?.INPUT_ID?.TITLE]: yup.string().min(10).max(50).required(),
      [CONSTANTS?.INPUT_ID?.DESCRIPTION]: yup
        .string()
        .min(10)
        .max(200)
        .required(),
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

  async function submitNewPost(data) {
    try {
      setIsLoading(true)
      const response = await api.createLightningTalksPoll(data)

      if (response === false) throw new Error('API Error')

      setIsLoading(false)
      navigate(CONSTANTS?.ROUTES_NAMES?.HOME)
    } catch (error) {
      setIsLoading(false)
      // eslint-disable-next-line no-alert
      alert('Create Post Error. Refresh the page and try again.')
    }
  }

  function renderInputFields() {
    return publishNewPollConfig.map((item) => (
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
          text="Submit"
          onClick={handleSubmit(submitNewPost)}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
