import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Navbar } from "../component/navbar";
export const Home = () => {
  const { store, actions } = useContext(Context);
  const [logIn, setLogIn] = useState({});
  const [signUp, setSignUp] = useState({});

  useEffect(() => {
    actions.logOut();
  });

  return (
    <>
      {localStorage.token ? (
        <div>
          <h1>You are Logged</h1>
          <Link to="/">
            <Button type="submit">LogOut</Button>
          </Link>
        </div>
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
            <Button
              onClick={() => {
                actions.signUp(signUp);
              }}
              type="submit"
              className="Submit mt-2"
              value={"Registrarme"}
              variant="outline-primary"
            >
              SignUp
            </Button>
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

            <Button
              onClick={() => {
                actions.logIn(logIn);
              }}
              type="submit"
              className="Submit mt-2"
              variant="outline-primary"
            >
              LogIn
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
