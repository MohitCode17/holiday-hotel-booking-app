import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout/Layout";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import AuthLayout from "./Layout/AuthLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddHotel from "./pages/AddHotel";
import { useAppContext } from "./context/AppContext";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";

const App = () => {
  const { isLoggedIn } = useAppContext();
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

          {/* Hotels Route */}
          {isLoggedIn && (
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          )}

          <Route
            path="/my-hotels"
            element={
              <Layout>
                <MyHotels />
              </Layout>
            }
          />

          <Route
            path="/edit-hotel/:hotelId"
            element={
              <Layout>
                <EditHotel />
              </Layout>
            }
          />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </Router>
      {/* React Toastify Container */}
      <ToastContainer />
    </>
  );
};

export default App;
