//Styles
import { GlobalStyles } from "./styles/GlobalStyles";
import { Container } from './styles'

//Router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//Import Components
import  {Navbar}  from "./components/Navbar";
import { Footer } from "./components/Footer";

//Import Pages
import { Home } from "./pages/Home";
import { Login } from "./pages/Auth/Login";
import { Register } from "./pages/Auth/Register";
import { EditProfile} from './pages/EditProfile/EditProfile'

// Hooks
import { useAuth } from "./hooks/useAuth";

function App() {

  const { auth , loading } = useAuth();


  if (loading){
    return <p>loading</p>
  }

  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <Container>
        <Routes>
          <Route path="/" element={auth ? <Home/> : <Navigate to="/login"/>} />
          <Route path="/login" element={!auth ? <Login/> : <Navigate to="/"/>} />
          <Route path="/register" element={!auth ? <Register/> : <Navigate to="/"/>} />
          <Route path="/profile" element={auth ? <EditProfile/> : <Navigate to="/login"/>}/>
        </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
