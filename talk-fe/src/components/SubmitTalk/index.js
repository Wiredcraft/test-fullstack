import React from 'react';

export default ({ actions: { onCreate } }) => {
  const onSubmit = event => {
    event.preventDefault();
    const [ttitleInput, descriptionInput] = event.target.children;
    const title = ttitleInput.value;
    const description = descriptionInput.value;
    onCreate({ title, description });
  };
  return (
    <div>
      <div>SubmitTalk</div>
      <form action="submit" onSubmit={onSubmit}>
        <input type="text" />
        <input type="text" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};
