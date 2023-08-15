import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "./store";

function App() {

const { config } = useSelector((state) => {
  return state.toast;
});

  return (
    <div>
      <Navbar />
      <Toast config={config} />
      <div id="detail">
        <Outlet />
      </div>
    </div>
  )
}

export default App;