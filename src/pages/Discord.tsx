import React, { useState } from "react";
import { ContainerStyle, BasePageStyle } from "../styles/Styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Inputs/Switch";
import { InputBox } from "../components/Inputs/InputBox";

import styled from "styled-components";

export const Discord = () => {
  const [isToggled, setIsToggled] = useState(false);

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  return (
    <HomeStyle>
      <PageHeader title="" subtitle="" />
      <BasePageStyle>
        <StatsContainer>
          <h2>
            DM's <span>500</span>
          </h2>
          <h2>
            Posts <span>800</span>
          </h2>
          <h2>
            Filtered Posts <span>600</span>
          </h2>
        </StatsContainer>
        <ComboContainer>
          <GeneralSettingContainer id="comboContainer">
            <h1>Account</h1>
            <InputBox message="Client ID" value="3QKdFMXaCZg" />
            <InputBox
              message="Client Secret"
              value="7PsadJasKWdfgEhhjPtyOAWEIA94fsd"
            />
            <InputBox message="Username" value="3Q99CZASKD" />
            <InputBox message="Password" value="ThisIsAPassword" />
            <InputBox
              message="User Agent"
              value="platform:Firefox:0.0.1 (by /Dan/"
            />
            <Switch
              message="Validate On Submit"
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </GeneralSettingContainer>
        </ComboContainer>
      </BasePageStyle>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  transition: all 5s ease-in-out;
`;

const GeneralSettingContainer = styled(ContainerStyle)`
  display: flex;
  flex-direction: column;
  padding-left: 25px;

  h1 {
    text-align: center;
    border-radius: 5px;
    width: 100%;
  }
`;

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
  span {
    font-weight: normal;
    font-size: 15px;
  }
`;

const ComboContainer = styled.div`
  display: flex;
  margin-left: 5px;
  #comboContainer {
    margin-left: 15px;
  }
`;
