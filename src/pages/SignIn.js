import React from 'react'
import { useForm } from 'react-hook-form'
import { PrimaryButton, InputField } from 'components'
import { signInInputsConfig } from 'config'
import { l } from 'utility'

export default function SignIn() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    // mode: 'onSubmit',
    // reValidateMode: 'onChange',
    // defaultValues: {
    //   url: '',
    // },
  })

  async function handSignIn(data) {
    l(data)
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
      />
    ))
  }

  return (
    <div>
      {renderInputFields()}
      <PrimaryButton text="Sign In" onClick={handleSubmit(handSignIn)} />
    </div>
  )
}
