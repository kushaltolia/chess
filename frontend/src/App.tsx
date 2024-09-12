import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './screens/landingPage';
import { Game } from './screens/Game';

function App() {
  return (
    <div className = 'h-screen bg-slate-950'>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<LandingPage/>}></Route>
          <Route path = "/game" element = {<Game/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
