import React from 'react';

export default ({ actions: { onLogin } }) => {
  const onSubmit = event => {
    event.preventDefault();
    const [usernameInput, passwordInput] = event.target.children;
    const username = usernameInput.value;
    const password = passwordInput.value;
    onLogin({ username, password });
  };
  return (
    <div>
      <div>Login</div>
      <form action="submit" onSubmit={onSubmit}>
        <input type="text" />
        <input type="password" />
        <button type="submit">login</button>
      </form>
    </div>
  );
};
