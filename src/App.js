import logo from './logo.svg';
import './App.css';
import ListFile from './homepage/list';
import CreateFile from './homepage/create';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const columns = {
    
  }

  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
          <Route exact path="/" element={<ListFile/>}/>
          <Route exact path="/create" element={<CreateFile/>}/>
       
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
