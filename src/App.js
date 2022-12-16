import { NavLink, useHistory } from "react-router-dom";
import './App.css';
import  Routes from './routes';
import  { logout } from './Services/utils';

function App() {

  const history = useHistory();

  function handleLogout(){
    logout();
    history.push("/");
  }

  return (
    <div className='App'>
      <header>
        <nav>
          <ul>
            <li className="paddingRight">
              <NavLink to="/">
                Login
              </NavLink>
            </li>
            <li className="paddingRight">
              <NavLink to="/register" >
                Register
              </NavLink>
            </li>
            <li className="paddingRight">
              <NavLink to="/profiles" >
                Profiles
              </NavLink>
            </li>
            <li className="paddingRight">
              <NavLink to="/convidar" >
                Convidar
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={() => handleLogout}>Logout</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <Routes />
    </div>
  );

}

export default App;
