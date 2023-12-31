import { useState } from "react";
import { loginThunk } from "../store";
import { useSelector } from "react-redux";
import useThunk from "../hooks/use-thunk";
import { useNavigate } from "react-router-dom";
import Input from "../components/custom/input/Input";
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

  const errorMessage = loginError ? loginError.message : '';

  if (errorMessage) {
    showToast({header: 'Помилка авторізації', body: errorMessage, bg: 'warning'});
  }

  return (
    <form className="container" onSubmit={handleSubmit}>
      <br />
      <Input
        id="login"
        label="Логін"
        value={login}
        onChange={handleLoginChange}
        required
      />
      <Input
        id="password"
        label="Пароль"
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