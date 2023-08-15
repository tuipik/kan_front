import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../store";
import { tasksApi } from "../store/apis/tasksApi";

function Navbar() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector((state) => {
    return state.auth;
  });

  const handleExitClick = () => {
    dispatch(logout());
    dispatch(tasksApi.util.resetApiState());
    navigate("/login");
  };

  let renderdRightPart = data && data.username
    ? <>
      <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">{data.username}</a>
      <span className="navbar-text" onClick={handleExitClick} style={{ cursor: "pointer" }} >
        Вихід
      </span>
    </>

    : <li className="nav-item">
      <Link className="nav-link" to={'login'}>Логін</Link>
    </li>;



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand" href="#">Navbar</a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to={'page1'}>Page1</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'page2'}>Page2</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'dashboard'}>Дошка</Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
          </ul>
          <ul className="navbar-nav justify-content-end">
            {renderdRightPart}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;