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
} from "react-bootstrap"

import "styles/app.scss";

const Navbar = lazy(() => import("components/Navbar"));
const Sidebar = lazy(() => import("components/Sidebar"));


const App = () => {
  const [text, setText] = useState("");

  const test = () => {
    if (process.env.NODE_ENV !== 'production') {
      // not for production
      console.log("yoyo")
    }
    setText(document.getElementById('test').value)
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>

      <Suspense fallback={<div>Loading...</div>}>
        <Row noGutters>

          <Col xs="auto" xl="auto" sm="auto" md="auto" lg="auto">
            <Sidebar />
          </Col>

          <Col>
            <ul>
              <li><a href="pages/dashboard/index.html">Dashboard</a></li>
            </ul>
          </Col>

        </Row>
      </Suspense>
    </div>
  );
};

export default hot(App);
