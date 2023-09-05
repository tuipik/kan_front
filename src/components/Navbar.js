import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";
import { tasksApi } from "../store/apis/tasksApi";
import { commentsApi } from "../store/apis/commentsApi";
import { accountsApi } from "../store/apis/accountsApi";
import { departmentsApi } from "../store/apis/departmentsApi";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => {
    return state.auth;
  });

  const handleExitClick = () => {
    dispatch(logout());
    dispatch(tasksApi.util.resetApiState());
    dispatch(commentsApi.util.resetApiState());
    dispatch(accountsApi.util.resetApiState());
    dispatch(departmentsApi.util.resetApiState());
    dispatch(commentsApi.util.resetApiState());
    dispatch(departmentsApi.util.resetApiState());
    navigate("/login");
  };

  const isAuthenticated = data && data.username;

  let renderdRightPart = isAuthenticated
    ? <>
      <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">{data.username}</a>
      <span className="navbar-text" onClick={handleExitClick} style={{ cursor: "pointer" }} >
        Вихід
      </span>
    </>

    : <li className="nav-item">
      <Link className="nav-link" to={'login'}>Логін</Link>
    </li>;

  const renderedLeftPart = isAuthenticated
    ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item">
        <Link className="nav-link" to={'dashboard'}>Дошка</Link>
      </li>
        <li className="nav-item">
          <Link className="nav-link" to={'departments'}>Департаменти</Link>
        </li>
    </ul>
    : ''

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          {renderedLeftPart}
          <ul className="navbar-nav justify-content-end">
            {renderdRightPart}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;