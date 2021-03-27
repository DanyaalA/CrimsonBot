import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfo,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
export const Menu = () => {
  return (
    <MenuStyle>
      <MenuHeader>Homework Bot</MenuHeader>
      <MenuContent>
        <MenuItem>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <span>Home</span>
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon className="icon" icon={faDiscord} size="2x" />
          <span>Discord</span>
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
          <span>Logs</span>
        </MenuItem>
      </MenuContent>
    </MenuStyle>
  );
};

const MenuStyle = styled.div`
  width: 100px;
  height: 100%;
  background: #212c31;
  padding: 0px;
  position: fixed;
  box-sizing: border-box;
  h1 {
  }
`;

const MenuHeader = styled.header`
  box-sizing: border-box;
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.25);
  padding: 25px;
  z-index: 10;
  background-color: inherit;
  text-align: center;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
`;

const MenuContent = styled.div`
  box-sizing: border-box;
  margin-top: 50px;
`;

const MenuItem = styled.div`
  background-color: #212c31;
  width: 180px;
  border: 2px solid pink;
  cursor: pointer;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 0 3px 0 0;
  padding: 20px 0;
  span {
    padding-left: 10px;
    padding-top: 8px;
  }
`;
