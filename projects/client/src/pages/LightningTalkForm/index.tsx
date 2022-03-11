import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Header, Button } from "@/components";

import "./index.css";
import useForm from "@/hooks/useForm";
import { addLightningTalk } from "@/apis";

const { useState } = React;

function Error({ children }: { children: string }) {
  return children ? (
    <div className="LightningTalkForm__ErrorText">{children}</div>
  ) : null;
}

function validateTextInput(
  name: string,
  value: string,
  maxLength: number
): string {
  if (!value) {
    return `${name} is required`;
  }
  if (value.length > maxLength) {
    return `The value contains a maximum of ${maxLength} characters`;
  }
  return "";
}

export default function LightningTalkForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { values, handleChange, errors, isValid } = useForm({
    initialValues: {
      user: "",
      title: "",
      description: "",
    },
    // Check all values are valid every time the form changes.
    // A better strategy is to check only the fields that have been updated
    // Just simplifying the logic to save time here
    validate: ({ user, title, description }) => {
      const newErrors: Record<string, string> = {};
      newErrors.user = validateTextInput("Name", user, 20);
      newErrors.title = validateTextInput("Title", title, 60);
      newErrors.description = validateTextInput(
        "Description",
        description,
        200
      );
      return newErrors;
    },
  });

  // Compared with the `errors` above, which records complete errors in real time
  // `uiErrors` is used to provide feedback on user actions when appropriate.
  // such as onSubmit, onBlur.
  const [uiErrors, setUiErrors] = React.useState<typeof errors>({});

  const onSubmit = async () => {
    setUiErrors(errors);
    if (isValid && !isSubmitting) {
      setIsSubmitting(true);
      const response = await addLightningTalk({
        user: values.user,
        title: values.title,
        description: values.description,
      });
      setIsSubmitting(false);
      if (!response.error) {
        navigate(`/`, {
          // show the newest item on the list page
          state: "newest",
        });
      }
    }
  };

  const resetUiError = (field: string) => () => {
    setUiErrors({
      ...uiErrors,
      [field]: errors[field],
    });
  };

  return (
    <div className="Page__LightningTalkForm">
      <Header action={<Button onClick={() => navigate("/")}>Back</Button>} />

      <div className="LightningTalkFormContainer">
        <form className="LightningTalkForm" data-testid="lightning-talk-form">
          <div
            className={`LightningTalkForm__Field${
              uiErrors.user ? " LightningTalkForm__Field--Error" : ""
            }`}
          >
            <input
              type="text"
              value={values.user}
              onChange={handleChange("user")}
              onBlur={resetUiError("user")}
              className="LightningTalkForm__Input LightningTalkForm__Input--Text"
              placeholder="Your Name"
              data-testid="lightning-talk-form-user"
            />
            <Error>{uiErrors.user}</Error>
          </div>

          <div
            className={`LightningTalkForm__Field${
              uiErrors.title ? " LightningTalkForm__Field--Error" : ""
            }`}
          >
            <input
              type="text"
              value={values.title}
              onChange={handleChange("title")}
              onBlur={resetUiError("title")}
              className="LightningTalkForm__Input LightningTalkForm__Input--Text"
              placeholder="Title"
              data-testid="lightning-talk-form-title"
            />
            <Error>{uiErrors.title}</Error>
          </div>

          <div
            className={`LightningTalkForm__Field${
              uiErrors.description ? " LightningTalkForm__Field--Error" : ""
            }`}
          >
            <textarea
              value={values.description}
              onChange={handleChange("description")}
              onBlur={resetUiError("description")}
              className="LightningTalkForm__Input LightningTalkForm__Input--Textarea"
              placeholder="Description"
              data-testid="lightning-talk-form-description"
            />
            <Error>{uiErrors.description}</Error>
          </div>

          {isSubmitting ? (
            <Button disabled>Creating...</Button>
          ) : (
            <Button onClick={onSubmit}>Create</Button>
          )}
        </form>
      </div>
    </div>
  );
}
