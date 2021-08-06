import { hot } from "react-hot-loader/root";
import React, { useEffect } from "react";
import { RecoilRoot } from "recoil";

import "styles/app.scss";
import styled from "styled-components";

import Navbar from "components/Navbar";
import Footer from "components/Footer"

import {
  HashRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Spinner from "components/Spinner"

import Page1 from "components/Page1"

// const StyledFooter = styled.div`
//   position: fixed;
//   bottom: 0;
// `;

const App = () => {
  return (
    <RecoilRoot>
      <HashRouter hashType="noslash">
        <MyApp />
      </HashRouter>
    </RecoilRoot>
  );
};

const MyApp = () => {
  return (
    <div>
      <Navbar />

      <Switch>
        <Route path="/page-1" component={Page1} />
        <Route path="/" component={() => <h3 style={{ margin: "15px 30px", minHeight: "75vh" }}>Home</h3>} />
      </Switch>

      <Footer />
    </div>
  );
};

export default hot(App);
