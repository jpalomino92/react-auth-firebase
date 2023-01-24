import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./routes/Home";
import Login from "./routes/Login";
import RequireAuth from "./components/RequireAuth";

const App = () => {
  return (
    <>
      <Navbar />

      <h1>APP</h1>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
