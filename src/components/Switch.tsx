import React from "react";
import styled, { css } from "styled-components";
import { ContainerStyle } from "../styles";

type RadioProps = {
  rounded: boolean;
  isToggled: boolean;
  onToggle: any;
};

export const Switch = (props: RadioProps) => {
  return (
    <SwitchStyle>
      <input type="checkbox" />
      <Slider
        rounded={props.rounded}
        checked={props.isToggled}
        onChange={props.onToggle}
      />
    </SwitchStyle>
  );
};

const SwitchStyle = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  input:checked + span:before {
    transform: translatex(20px);
  }
  input:checked + span {
    background-color: #2196f3;
  }
`;

const Slider = styled.span<any>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.4s;
  background-color: #ccc;
  ${(props) =>
    props.rounded
      ? css`
          border-radius: 34px;
        `
      : css`
          border-radius: 0px;
        `}
  :before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    ${(props) =>
      props.rounded
        ? css`
            border-radius: 50%;
          `
        : css`
            border-radius: 0px;
          `}
  }
`;
