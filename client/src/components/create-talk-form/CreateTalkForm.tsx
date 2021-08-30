import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./createTalkForm.css";

type FormInput = {
	title: String;
	description: String;
}

type InputProps = {
	closeForm: Function;
}

function CreateTalkForm(props: InputProps) {
	const { closeForm } = props;

	const { register, handleSubmit } = useForm<FormInput>();
	const onSubmit: SubmitHandler<FormInput> = data => { closeForm()};

	return (
		<form className="create-talk-form" onSubmit={handleSubmit(onSubmit)}>
			<label>Title</label>
			<input {...register("title", { required: true, maxLength: 20 })} />
			<label>Description</label>
			<textarea {...register("description", { required: true, maxLength: 200 })} />
			<input className="create-talk-form--submit" type="submit" />
		</form>
	);
}

export default CreateTalkForm;