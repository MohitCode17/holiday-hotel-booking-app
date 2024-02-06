import Footer from "../components/Footer";
import Header from "../components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto py-10 px-2 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
