import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInForm from './Components/SignInForm.jsx';
import LogInForm from './Components/LogInForm.jsx';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ToastContainer/>
    <Router>
      <Routes>
        <Route path="/" element={<SignInForm />} />
        <Route path="/login" element={<LogInForm />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
