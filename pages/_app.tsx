import { useEffect } from "react";
import { useStore, Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Helmet from "react-helmet";

import { wrapper } from "../store/index";
import Layout from "../components/layout";
import { composeWithDevTools } from "redux-devtools-extension";

import { demoActions } from "../store/demo";

import { currentDemo } from "../server/queries";

import "~/public/sass/style.scss";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase/configFirebase";
import { userDataActions } from "../store/user-data";

const App = ({ Component, pageProps }) => {
  const store: any = useStore();

  useEffect(() => {
    if (store.getState().demo.current !== currentDemo) {
      // store.dispatch(demoActions.refreshStore(currentDemo));
    }

    console.log(store.getState());

    const usuarioSesionActiva = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        store.dispatch(
          userDataActions.setUserData({
            isLogged: true,
          })
        );

        // ...
      } else {
        console.log("no logueado");
        //Esto es para que si el usuario no tiene una sesion
        // activa y se mete a la url del dashboard lo redirija al login
      }
    });

    usuarioSesionActiva();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        persistor={store.__persistor}
        loading={
          <div className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
              <div className="bounce4"></div>
            </div>
          </div>
        }
      >
        <Helmet>
          <meta charSet="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <title>Animarama - Conectando lo mejor para tu mascota</title>

          <meta name="keywords" content="React Template" />
          <meta name="description" content="Riode - React eCommerce Template" />
          <meta name="author" content="D-THEMES" />
        </Helmet>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
};

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default wrapper.withRedux(App);
