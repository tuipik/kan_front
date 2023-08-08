import { Link } from "react-router-dom";

function Navbar() {
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
            <li className="nav-item">
              <Link className="nav-link" to={'login'}>Логін</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;