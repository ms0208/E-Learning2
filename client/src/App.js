import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './Components/SignInForm';
import LogInForm from './Components/LogInForm';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
    </Router>
  );
}

export default App;
