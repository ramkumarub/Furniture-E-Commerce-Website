import './App.css';
import Routing from './Routing/Routing';
import { useLocation } from 'react-router-dom';

function App() {

  const location = useLocation()
  const bgClass = location.pathname === '/' ? 'home' : location.pathname === '/story' ? 'story' : location.pathname === '/help' ? 'help' : ''

  return (
    <>
      <div className={bgClass}></div>
      <Routing />
    </>
  );
}

export default App;
