import { useState } from "react";
import { loginThunk, store, useLoginMutation } from "../store";
import { useSelector } from "react-redux";
import useThunk from "../hooks/use-thunk";

function LoginPage() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [doLogin, isLogin, loginError] = useThunk(loginThunk)

  // const [makeLogin, addPhotoResults] = useLoginMutation();

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginRequest = { username: login, password };
    doLogin(loginRequest);
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="login" className="form-label">Логін</label>
        <input className="form-control" id="login" aria-describedby="loginHelp" value={login} onChange={handleLoginChange} />
        {/* <div id="loginHelp" className="form-text">We'll never share your email with anyone else.</div> */}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Пароль</label>
        <input type="password" className="form-control" id="password" value={password} onChange={handlePasswordChange} />
      </div>
      <button type="submit" className="btn btn-primary">Війти</button>
    </form>
  );
}

export default LoginPage;