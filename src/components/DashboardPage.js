import { useSelector } from "react-redux"
import { authApi } from "../store/apis/authApi";

function DashboardPage() {

  const auth = useSelector((state) => {
    window.state = state;
    window.authApi = authApi;
    // console.log(state[authApi.login]);
    return state.auth;
  });


  return (
    <div>
      Dashboard
    </div>
  )
}

export default DashboardPage;