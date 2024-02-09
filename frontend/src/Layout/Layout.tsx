import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <div className="container mx-auto px-2">
        <SearchBar />
      </div>
      <div className="container mx-auto py-10 px-2 flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
