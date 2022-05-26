import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4>
          &copy; {new Date().getFullYear()} - Made with love by{" "}
          <a
            className="footer-link"
            href="https://github.com/Wratten"
            target="_blank"
            rel="noreferrer"
          >
            Wratten
          </a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
