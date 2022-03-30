import React, { useState } from "react";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Modal from "react-modal";

import ALink from "~/components/features/custom-link";
import useFirebaseFunctions from "../../../hooks/useFirebaseFunctions";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
  },
};

let index = 0;

Modal.setAppElement("#__next");

// interface SignInData {
//     fullName:string,
//     email:string,
//     password:string,
//     checkboxTerms:boolean
// }

function LoginModal() {
  const [open, setOpen] = useState(false);

  const { createUser } = useFirebaseFunctions();

  // const [signInData, setsignInData] = useState<SignInData>({
  //     fullName:'',
  //     email:'',
  //     password:'',
  //     checkboxTerms:false
  // })

  const [signInData, setsignInData] = useState({
    fullName: "",
    email: "",
    password: "",
    checkboxTerms: false,
  });

  const onChangeSignIn = (e) => {
    setsignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const validateSignInData = (e) => {
    const { fullName, email, password, checkboxTerms } = signInData;
    console.log(signInData);

    createUser(email, password);
  };

  function closeModal() {
    document.querySelector(".ReactModal__Overlay").classList.add("removed");
    document
      .querySelector(".login-popup.ReactModal__Content")
      .classList.remove("ReactModal__Content--after-open");
    document
      .querySelector(".login-popup-overlay.ReactModal__Overlay")
      .classList.remove("ReactModal__Overlay--after-open");
    setTimeout(() => {
      setOpen(false);
    }, 330);
  }

  function openModal(e, loginIndex = 0) {
    e.preventDefault();
    index = loginIndex;
    setOpen(true);
  }

  return (
    <>
      <a className="login-link d-lg-show" href="#" onClick={openModal}>
        <i className="d-icon-user"></i>Sign in
      </a>
      <span className="delimiter">/</span>
      <a
        className="register-link ml-0"
        onClick={(e) => openModal(e, 1)}
        href="#"
      >
        Register
      </a>

      {open ? (
        <Modal
          isOpen={open}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Login Modal"
          className="login-popup"
          overlayClassName="login-popup-overlay"
          shouldReturnFocusAfterClose={false}
          id="login-modal"
        >
          <div className="form-box">
            <div className="tab tab-nav-simple tab-nav-boxed form-tab">
              <Tabs
                selectedTabClassName="active"
                selectedTabPanelClassName="active"
                defaultIndex={index}
              >
                <TabList className="nav nav-tabs nav-fill align-items-center border-no justify-content-center mb-5">
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Iniciar Sesión
                    </span>
                  </Tab>
                  <li className="delimiter">o</li>
                  <Tab className="nav-item">
                    <span className="nav-link border-no lh-1 ls-normal">
                      Registrarse
                    </span>
                  </Tab>
                </TabList>

                <div className="tab-content">
                  <TabPanel className="tab-pane">
                    <form action="#">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="singin-email"
                          name="singin-email"
                          placeholder="Username or Email Address *"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control"
                          id="singin-password"
                          placeholder="Password *"
                          name="singin-password"
                          required
                        />
                      </div>
                      <div className="form-footer">
                        <div className="form-checkbox">
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id="signin-remember"
                            name="signin-remember"
                          />
                          <label
                            className="form-control-label"
                            htmlFor="signin-remember"
                          >
                            Remember me
                          </label>
                        </div>
                        <ALink href="#" className="lost-link">
                          Lost your password?
                        </ALink>
                      </div>
                      <button
                        className="btn btn-dark btn-block btn-rounded"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                    <div className="form-choice text-center">
                      <label className="ls-m">or Login With</label>
                      <div className="social-links">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f border-no"
                        ></ALink>
                        {/* <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink> */}
                      </div>
                    </div>
                  </TabPanel>

                  <TabPanel className="tab-pane">
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        validateSignInData();
                      }}
                    >
                      <div className="form-group">
                        <label htmlFor="singin-email">Nombre Completo:</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          placeholder="Ingresa tu nombre completo *"
                          onChange={onChangeSignIn}
                          value={signInData.fullName}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="singin-email">Correo:</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Ingresa tu correo *"
                          onChange={onChangeSignIn}
                          value={signInData.email}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="singin-password">Contraseña:</label>
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          placeholder="Ingresa tu contraseña *"
                          onChange={onChangeSignIn}
                          value={signInData.password}
                        />
                      </div>
                      <div className="form-footer">
                        <div
                          onClick={() => {
                            console.log("que onda");
                            setsignInData({
                              ...signInData,
                              ["checkboxTerms"]: !signInData.checkboxTerms,
                            });
                          }}
                          className="form-checkbox"
                        >
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            name="checkboxTerms"
                            checked={signInData.checkboxTerms}
                          />
                          <label
                            className="form-control-label"
                            htmlFor="register-agree"
                          >
                            Acepto los términos y condiciones y políticas de
                            privacidad
                          </label>
                        </div>
                      </div>
                      <button className="btn btn-dark btn-block btn-rounded">
                        Crear cuenta
                      </button>
                    </div>
                    <div className="form-choice text-center">
                      <label className="ls-m">o Registrate Con</label>
                      <div className="social-links">
                        <ALink
                          href="#"
                          className="social-link social-google fab fa-google border-no"
                        ></ALink>
                        <ALink
                          href="#"
                          className="social-link social-facebook fab fa-facebook-f border-no"
                        ></ALink>
                        {/* <ALink href="#" className="social-link social-twitter fab fa-twitter border-no"></ALink> */}
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </Tabs>
            </div>
          </div>

          <button
            title="Close (Esc)"
            type="button"
            className="mfp-close"
            onClick={closeModal}
          >
            <span>×</span>
          </button>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default LoginModal;
