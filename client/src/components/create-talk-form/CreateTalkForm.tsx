import * as React from "react";
import { useForm, SubmitHandler, DeepMap, FieldError } from "react-hook-form";
import { createTalk } from "../../services/talks";
import "./createTalkForm.css";

type FormInput = {
  title: String;
  description: String;
}

type InputProps = {
  closeForm: Function;
}

type ErrorForm = (DeepMap<String, FieldError> & Partial<FieldError>) | undefined


function CreateTalkForm(props: InputProps) {
  const { closeForm } = props;

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { description, title } = data;
    await createTalk({ title, description })
    closeForm()
  };

  const showErrors = (error: ErrorForm) => {
    if (error) {
      return (
        <div className="create-talk-form--error">
          <span>This field is required</span>
        </div>
      )
    }
  }

  return (
    <form className="create-talk-form" onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register("title", { required: true, maxLength: 20 })} />
      {showErrors(errors.title)}
      <label>Description</label>
      <textarea {...register("description", { required: true, maxLength: 200 })} />
      {showErrors(errors.description)}
      <input className="create-talk-form--submit" type="submit" />
    </form>
  );
}

export default CreateTalkForm;