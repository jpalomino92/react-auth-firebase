import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { Perfil } from "./routes/Perfil";
import NotFound from "./routes/NotFound";

import LayoutRequireAuth from "./components/layout/LayoutRequireAuth";
import { LayoutContainerForm } from "./components/layout/LayoutContainerForm";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import LayoutRedirect from "./components/layout/LayoutRedirect";

const App = () => {
  const { user } = useContext(UserContext);

  if (user === false) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route to="/" element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>

        <Route path="/" element={<LayoutContainerForm />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route path="/:nanoid" element={<LayoutRedirect />}>
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
