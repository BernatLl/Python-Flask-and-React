const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      URLAPI:
        "https://3001-bernatll-pythonflaskand-so2iw3mggij.ws-eu47.gitpod.io/api/",
      userinfo: {},
    },
    actions: {
      logIn: async (email, password) => {
        const response = await fetch(getStore().URLAPI + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(email, password),
        });
        if (response.status == 200) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
          localStorage.setItem("logIn", true);
          return true;
        } else {
          alert("Contraseña o usuario incorrectos");
          return false;
        }
      },
      signUp: async (email, password, repeatpassword) => {
        const response = await fetch(getStore().URLAPI + "signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(email, password, repeatpassword),
        });
        if (response.status == 200) {
          const data = await response.json();
          localStorage.setItem("token", data.token);

          return true;
        } else {
          alert("No se ha podido realizar el registro");
          return false;
        }
      },
      logOut: () => {
        localStorage.removeItem("logIn");
        localStorage.removeItem("token");
      },
      getUserInfo: async () => {
        const response = await fetch(getStore().URLAPI + "infouser", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        setStore({ userinfo: data.results });
      },
    },
  };
};

export default getState;
