import { useState } from "react";
import { loginThunk, showToast, store, useLoginMutation } from "../store";
import { useDispatch, useSelector } from "react-redux";
import useThunk from "../hooks/use-thunk";
import { useNavigate } from "react-router-dom";
import { translatedMessages } from "../translations";
import Input from "../components/input/Input";
import useShowToast from "../hooks/use-show-toast";

function LoginPage() {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [doLogin, isLogin, loginError] = useThunk(loginThunk);

  const showToast = useShowToast();

  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

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

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  const errorMessage = loginError ? translatedMessages[loginError.message] : '';

  if (errorMessage) {
    showToast({header: 'Помилка авторізації', body: errorMessage, bg: 'warning'});
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <Input
        id="login"
        placeholder="Логін"
        value={login}
        onChange={handleLoginChange}
        required
      />
      <Input
        id="password"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
        type="password"
        required
      />
      <button type="submit" className="btn btn-primary">{isLogin? 'Вхід...' : 'Війти'}</button>
    </form>
  );
}

export default LoginPage;