import React, { useState, useEffect, useContext } from "react";

import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";

import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getUserInfo();
  });

  return (
    <>
		<Navbar/>
      {localStorage.token ? (
        <div className="text-center">
          <h3>Perfil</h3>
          <p>email: {store.userinfo.user.email}</p>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <h2 className="text-center">No has iniciado sesion</h2>
          <Link to="/">
            <input type="button" value="Go Home" />
          </Link>
        </div>
      )}
    </>
  );
};