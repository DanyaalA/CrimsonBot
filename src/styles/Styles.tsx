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
  transition: all 4.5s ease;
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

export const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    margin-right: 25px;
  }
`;

export const CustomButton = styled.button`
  width: 50%;
  height: 28px;
  border: none;
  background-color: #313c4b;
  border-radius: 5px;
  justify-content: center;
  color: white;
  font-family: "Lexend Deca";
  font-size: 18px;
  outline: none;

  :active {
    border: none;
  }

  :hover {
    background-color: #455366;
    transition: 0.5s;
    cursor: pointer;
  }
  transition: 0.5s;
`;
