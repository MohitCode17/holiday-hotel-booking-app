const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-primary text-neutral-content">
        <nav>
          <a className="link link-hover">Countries</a>
          <a className="link link-hover">Regions</a>
          <a className="link link-hover">Cities</a>
          <a className="link link-hover">Districts</a>
          <a className="link link-hover">Airports</a>
          <a className="link link-hover">Hotels</a>
        </nav>
        <nav>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Aprtments</a>
          <a className="link link-hover">Resorts</a>
          <a className="link link-hover">Villas</a>
          <a className="link link-hover">Hotels</a>
          <a className="link link-hover">Guest houses</a>
        </nav>
        <nav>
          <a className="link link-hover">How we work</a>
          <a className="link link-hover">Terms & Conditions</a>
          <a className="link link-hover">Privacy & cookie policy</a>
        </nav>
      </footer>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
          <p>Copyright © 2024 - All right reserved by Holiday.com</p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
