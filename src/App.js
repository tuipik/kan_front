import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App;