import React from "react";
import styled from "styled-components";

export const PageHeader = () => {
  return (
    <PageHeaderStyle>
      <div>
        <h2>
          CrimsonBot/Reddit Settings - /<span>u/CrismonUser</span>
        </h2>
      </div>
    </PageHeaderStyle>
  );
};

const PageHeaderStyle = styled.header`
  box-sizing: border-box;
  box-shadow: 0px 1px 25px 0px rgba(0, 0, 0, 0.25);
  width: 100%;
  padding: 15px;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #202225;
  margin-left: 85px;
  width: calc(100% - 85px);
  z-index: 10;
  height: 85px;
  h2 {
    font-family: "Lobster";
  }
`;
