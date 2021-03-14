import { hot } from 'react-hot-loader/root';
import React, { lazy, Suspense, useState, useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil"

import {
  Container,
  Col,
  Row,
  Spinner,
} from "react-bootstrap"

import "styles/app.scss";

const Navbar = lazy(() => import("components/Navbar"));

const App = () => {
  useEffect(() => {
  }, []);

  return (
    <div>
      <Suspense fallback={
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>}>
        <Navbar />
      </Suspense>
    </div>
  );
};

export default hot(App);
