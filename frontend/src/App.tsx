import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <p>Home Page</p>
              </Layout>
            }
          />

          <Route
            path="/sign-in"
            element={
              <AuthLayout>
                <SignIn />
              </AuthLayout>
            }
          />

          <Route
            path="/sign-up"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
