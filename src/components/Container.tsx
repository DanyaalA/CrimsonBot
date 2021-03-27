import React from "react";
import styled from "styled-components";

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

const ContainerStyle = styled.div`
  margin-top: 15px;
  width: 100%;
  padding: 20px 0;
  border-radius: 10px;
  background-color: #161c1f;
  //141617
`;
