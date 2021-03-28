import React from "react";
import styled from "styled-components";
import { ContainerStyle } from "../styles";

export const Container = () => {
  return (
    <ContainerStyle>
      <div>
        <h4>DM's: 100</h4>
      </div>
      <div>
        <h4>Posts: 100</h4>
      </div>
      <div>
        <h4>Student Posts: 50</h4>
      </div>
    </ContainerStyle>
  );
};
