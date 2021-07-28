import logo from './logo.svg';
import './App.css';
import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import LoginPage from "./views/login"
import KelasPelajaran from './views/kelasPelajaran/kelasPelajaran';
import WrapperWeb from "./components/WrapperWeb";
import userPage from "./views/users/user"
import Pelajaran from './views/pelajaran/pelajaran';
import JadwalPelajaran from "./views/jadwalPelajaran/jadwalPelajaran"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <WrapperWeb>
          <Route exact path="/kelas-pelajaran" component={KelasPelajaran} />
          <Route exact path="/user" component={userPage} />
          <Route exact path="/jadwal-pelajaran" component={JadwalPelajaran} />
          <Route exact path="/dashboard-siswa" component={Pelajaran} />
        </WrapperWeb>
      </Switch>
    </Router>
  );
}

export default App;
