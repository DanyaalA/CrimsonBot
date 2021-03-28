import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
export const Menu = () => {
  return (
    <MenuStyle>
      <Link to="/">
        <MenuHeader>
          <IconStyle
            src="https://i.imgur.com/uMPcOzj.png"
            alt="Reddit Avatar"
          />
        </MenuHeader>
      </Link>

      <MenuContent>
        <Link to="/">
          <MenuItem>
            <FontAwesomeIcon icon={faHome} size="2x" color="#FFF" />
          </MenuItem>
        </Link>
        <Link to="/discord">
          <MenuItem>
            <FontAwesomeIcon
              className="icon"
              icon={faDiscord}
              size="2x"
              color="#FFF"
            />
          </MenuItem>
        </Link>
        <Link to="/logs">
          <MenuItem>
            <FontAwesomeIcon icon={faInfoCircle} size="2x" color="#FFF" />
          </MenuItem>
        </Link>
      </MenuContent>
    </MenuStyle>
  );
};

const IconStyle = styled.img`
  height: 55px;
  width: 55px;
  background-color: ${(props) => props.theme.base.menuHover};
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
  background-color: ${(props) => props.theme.base.menu};
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
  height: ${(props) => props.theme.height.topContent};
`;

const MenuContent = styled.div`
  box-sizing: border-box;
  #noLink {
  }
  a {
  }
`;

const MenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  transition: 0.5s all;
  :hover {
    background-color: ${(props) => props.theme.base.menuHover};
    cursor: pointer;
  }
`;
