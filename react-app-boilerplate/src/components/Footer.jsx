import React, { useState } from "react";
import styled from "styled-components";

import {
  Container,
} from "react-bootstrap"

import variables from "styles/_variables.module.scss";

const Styled = styled(Container)`
  padding: 30px 30px 5px 30px;
  background-color: ${variables.footerGray};
  border-top: ${variables.sidebarBorderWidth} solid ${variables.borderGray};

  * {
    font-size: 0.75rem;
  }
`;

const MyFooter = () => {
  return (
    <Styled fluid>
      <div>
        <div>
          Disclaimer
          <ul>
            <li>
              The information contained in this website is for general information purposes only. The information is provided by XXX Limited and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
            </li>
            <li>
              In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </li>
            <li>
              Through this website you are able to link to other websites which are not under the control of XXX Limited. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
            </li>
            <li>
              Every effort is made to keep the website up and running smoothly. However, XXX Limited takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
            </li>
            <li>
              Information and content published in the website are public information and you may refer to the sources for the latest updated information.
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p>© 2021 XXX Limited. All rights reserved.</p>
    </Styled>
  );
  // return <div>Footer here! Somewhere</div>;
};

export default MyFooter;
