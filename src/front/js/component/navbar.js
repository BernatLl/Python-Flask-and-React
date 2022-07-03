import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex justify-content-end">
        {localStorage.token ? (
          <Link to="/">
            <button
              style={{ cursor: "pointer" }}
              onClick={() => {
                actions.logOut();
              }}
            >
              Cerrar sesión
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};
