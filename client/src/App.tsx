import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Redirect from './pages/Redirect'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Redirect />} 
        />
      </Routes>
    </Router>
  )
}

export default App
