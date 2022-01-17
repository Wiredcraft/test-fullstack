import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Submit.scss';
import { createPost } from '../../api';

export function Submit(props) {
  const navigate = useNavigate();
  const post = async (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.target);
    const jsonData = Object.fromEntries(data);

    await createPost(jsonData);
    navigate('/newest');
  }

  return (
    <div className={styles.root}>
      <form onSubmit={post}>
        <div className={styles.formField}>
          <label>title</label>
          <input type="text" name="title"></input>
        </div>
        <div className={styles.formField}>
          <label>url</label>
          <input type="text" name="url"></input>
        </div>
        <div className={styles.formField}>
          <label></label>
          <span>or</span>
        </div>
        <div className={styles.formField}>
          <label>text</label>
          <textarea name="text"></textarea>
        </div>
        <div className={styles.formField}>
          <label></label>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
}
export default Submit;
