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
      <MenuHeader>
        <IconStyle src="https://i.imgur.com/uMPcOzj.png" alt="Reddit Avatar" />
      </MenuHeader>
      <MenuContent>
        <MenuItem>
          <FontAwesomeIcon icon={faHome} size="2x" />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon className="icon" icon={faDiscord} size="2x" />
        </MenuItem>
        <MenuItem>
          <FontAwesomeIcon icon={faInfoCircle} size="2x" />
        </MenuItem>
      </MenuContent>
    </MenuStyle>
  );
};

const IconStyle = styled.img`
  height: 55px;
  width: 55px;
  background-color: #2f3136;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s all;
  :hover {
    border-radius: 5px;
  }
`;

const MenuStyle = styled.div`
  width: 85px;
  height: 100%;
  background-color: #202225;
  position: fixed;
  box-sizing: border-box;
`;

const MenuHeader = styled.header`
  box-sizing: border-box;
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.25);
  padding: 15px;
  background-color: inherit;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  height: 85px;
`;

const MenuContent = styled.div`
  box-sizing: border-box;
`;

const MenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  transition: 0.7s all;
  :hover {
    background-color: #2f3136;
    cursor: pointer;
  }
`;
