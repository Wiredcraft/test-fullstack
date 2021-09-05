import * as React from "react";
import { useForm, SubmitHandler, DeepMap, FieldError } from "react-hook-form";
import { useTalks } from "../../contexts/TalksContext";
import { createTalk, getTalks } from "../../services/talks";
import "./createTalkForm.css";

type FormInput = {
  title: String;
  description: String;
};

type InputProps = {
  closeForm: Function;
};

type ErrorForm = (DeepMap<String, FieldError> & Partial<FieldError>) | undefined;

function CreateTalkForm(props: InputProps) {
  const { closeForm } = props;
  const { reloadTalks } = useTalks();

  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { description, title } = data;

    await createTalk({ title, description });
    closeForm();

    const talksFromServer = await getTalks();
    reloadTalks(talksFromServer);
  };

  const showErrors = (error: ErrorForm) => {
    if (error) {
      return (
        <div className="create-talk-form--error">
          <span>{error.message}</span>
        </div>
      );
    }
  };

  return (
    <form className="create-talk-form" onSubmit={handleSubmit(onSubmit)}>
      <label>Title</label>
      <input {...register("title", { required: { value: true, message: 'Field is required' }, maxLength: { value: 20, message: "Title should be under 20 characters" } })} />
      {showErrors(errors.title)}
      <label>Description</label>
      <textarea {...register("description", { required: { value: true, message: 'Field is required' }, maxLength: { value: 20, message: "Description should be under 200 characters" } })} />
      {showErrors(errors.description)}
      <input className="create-talk-form__button--submit" type="submit" />
      <a onClick={() => closeForm()} className="create-talk-form__button--cancel">Cancel</a>
    </form>
  );
}

export default CreateTalkForm;
