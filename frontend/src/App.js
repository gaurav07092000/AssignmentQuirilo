import AddSitePage from './Components/AddSite';
import AddZonePage from './Components/AddZone';
import LandingPage from './Components/LandingPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
function App() {
  return (
    <div className="App">
    <Router>
    
      <Routes>
      <Route path='/' element={<LandingPage />} />
        <Route path='/add-site' element={<AddSitePage/>} />
        <Route path='/add-zone' element = {<AddZonePage />} />
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
