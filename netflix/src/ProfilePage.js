import logo from './Images/Netflix.png';
import './css/App.css';

export function ProfilePage(){
    return(
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Netflix
      </a>
    </header>
  </div>
)
}