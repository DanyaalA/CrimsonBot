import styled from "styled-components";

export const BasePageStyle = styled.div`
  padding: 0px 50px;
  height: 100%;
  width: calc(100% - 85px);
  margin-left: 85px;
  margin-top: 85px;
  color: white;
  position: absolute;
  box-sizing: border-box;
`;

export const ContainerStyle = styled.div`
  margin-top: 15px;
  //box-shadow: 5px 1px 35px 5px rgba(0, 0, 0, 0.35);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  /* box-shadow: 0px 3px 19px 6px rgba(0, 0, 0, 0.33);
  -webkit-box-shadow: 0px 3px 19px 6px rgba(0, 0, 0, 0.33);
  -moz-box-shadow: 0px 3px 19px 6px rgba(0, 0, 0, 0.33); */
  padding: 20px 0px 20px 15px;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.base.container};
  //141617
`;
