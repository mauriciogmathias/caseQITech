import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import { ContactContextProvider } from "./Contexts/questions";
import Home from "./Pages/Home";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";

export const UserContext = createContext();

function App() {
  return (
    <ContactContextProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/quiz" exact element={<Quiz />} />
            <Route path="/result" exact element={<Result />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </ContactContextProvider>
  );
}

export default App;
