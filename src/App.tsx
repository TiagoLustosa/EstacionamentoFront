import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Carros from './pages/Carros';
import { Preco } from './pages/Preco';
import GlobalStyles from './styles/global';

function App() {
  return (
   
    <Router>
      <GlobalStyles />
    <Header />
      <Routes>
        <Route path="/" element={<Carros/>}/>   
        <Route path="/preco-vigencia" element={<Preco/>}/>   
      </Routes>  
  </Router> 
  )
}

export default App;
