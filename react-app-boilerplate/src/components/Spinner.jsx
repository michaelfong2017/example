import React from "react"

import {
  Spinner,
} from "react-bootstrap"

import styled from "styled-components"

const SpinnerContainer = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
    padding-right: ${props => props.paddingRight};

    > .spinner-border {
        height: 10rem;
        width: 10rem;
    }
`

const MySpinner = (props) => {
  return (
    <SpinnerContainer paddingRight={props.paddingRight}>
      <Spinner animation="border" role="status">
      </Spinner>
    </SpinnerContainer>
  );
}

export default MySpinner;
