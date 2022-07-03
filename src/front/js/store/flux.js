const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      URLAPI:
        "https://3001-bernatll-pythonflaskand-so2iw3mggij.ws-eu47.gitpod.io/api/",
      user: {},
    },
    actions: {
      logIn: async (logIn) => {
        const response = await fetch(getStore().URLAPI + "login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(logIn),
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

      signUp: async (signUp) => {
        try {
          const response = await fetch(getStore().URLAPI + "signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(signUp),
          });
          if (resp.status !== 200) {
            alert("Error!!!");
            return false;
          }
          const data = await resp.json();
          localStorage.setItem("token", data.token);

          return true;
        } catch (error) {
          console.error("Error!!!!!", error);
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
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const data = await response.json();
        setStore({ user: data.user });
        
      },
    },
  };
};

export default getState;
