import React from "react";
import { BasePageStyle, ContainerStyle } from "../styles";
import { PageHeader } from "../components/PageHeader";
import styled from "styled-components";

export const Home = () => {
  return (
    <>
      <PageHeader />
      <BasePageStyle>
        <StatsContainer>
          <h2>DM's: 500</h2>
          <h2>Posts: 600</h2>
          <h2>Student Posts: 500</h2>
        </StatsContainer>
      </BasePageStyle>
    </>
  );
};

const StatsContainer = styled(ContainerStyle)`
  display: flex;
  text-align: right;
  align-content: right;
  justify-content: right;
  width: 100%;
  h2 {
    padding-left: 18%;
    align-content: left;
    text-align: right;
  }
`;
