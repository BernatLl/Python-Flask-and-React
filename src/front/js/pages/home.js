import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [logIn, setLogIn] = useState({});
  const [signUp, setSignUp] = useState({});
  return (
    <>
      {localStorage.token ? (
        <Link to="demo">
          <input type="button" value="Mi perfil" />
        </Link>
      ) : (
        <div>
          <div className="text-center mt-5 mx-auto" style={{ width: "10rem" }}>
            <h4>Registro</h4>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setSignUp({ ...signUp, email: e.target.value });
              }}
              email="email"
              type="text"
              id="email"
              className="inputgroup"
            />
            <label htmlFor="password">Contraseña</label>
            <input
              onChange={(e) => {
                setSignUp({ ...signUp, password: e.target.value });
              }}
              name="password"
              type="password"
              id="password"
              className="inputgroup"
            />
            <label htmlFor="repeatpassword">Repetir Contraseña</label>
            <input
              onChange={(e) => {
                setSignUp({ ...signUp, repeatpassword: e.target.value });
              }}
              name="repeatpassword"
              type="password"
              id="repeatpassword"
              className="inputgroup"
            />
            <input
              onClick={() => {
                actions.signUp(signUp);
              }}
              type="button"
              className="Submit mt-2"
              value={"Registrarme"}
            />
          </div>
          <div className="text-center mt-5 mx-auto" style={{ width: "10rem" }}>
            <h4>Iniciar sesión</h4>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setLogIn({ ...logIn, email: e.target.value });
              }}
              name="email"
              type="email"
              id="email"
              className="inputgroup"
            />
            <label htmlFor="password">Contraseña</label>
            <input
              onChange={(e) => {
                setLogIn({ ...logIn, password: e.target.value });
              }}
              name="password"
              type="password"
              id="password"
              className="inputgroup"
            />
            <input
              onClick={() => {
                actions.logIn(logIn);
              }}
              type="button"
              className="Submit mt-2"
              value={"Enviar"}
            />
          </div>
        </div>
      )}
    </>
  );
};
