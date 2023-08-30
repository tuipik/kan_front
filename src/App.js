import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { useSelector } from "react-redux";

function App() {

const { config } = useSelector((state) => {
  return state.toast;
});

  return (
    <div className="mx-5">
     <Navbar />
      <Toast config={config} />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App;