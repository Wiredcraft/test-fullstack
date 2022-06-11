import { useRef, useState } from "react";
import { CreateTalkParams } from "types";

import styles from "./styles.module.css";

export interface TalkFormProps {
  onSubmit: (data: CreateTalkParams) => void;
}

export const TalkForm: React.FC<TalkFormProps> = (props) => {
  const { onSubmit } = props;

  const emailRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [error, setError] = useState<string>();

  const onClickSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    if (!email) return setError("Email is required");

    const title = titleRef.current?.value;
    if (!title) return setError("Title is required");

    const description = descriptionRef.current?.value;
    if (!description) return setError("Description is required");

    onSubmit({ email, title, description });
  };

  return (
    <form onSubmit={onClickSubmit}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>email</td>
            <td>
              <input ref={emailRef} required size={50} type="email" />
            </td>
          </tr>
          <tr>
            <td>title</td>
            <td>
              <input ref={titleRef} required size={50} type="text" />
            </td>
          </tr>
          <tr>
            <td>description</td>
            <td>
              <textarea ref={descriptionRef} required rows={4} cols={50} />
            </td>
          </tr>
          <tr>
            <td></td>
            <td>{error ?? ""}</td>
          </tr>
          <tr>
            <td></td>
            <td>
              <input type="submit" value="submit" />
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
};
