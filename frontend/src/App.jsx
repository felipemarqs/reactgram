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

function App() {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </Container>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
