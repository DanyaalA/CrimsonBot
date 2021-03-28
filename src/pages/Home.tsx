import React, { useState } from "react";
import { BasePageStyle, ContainerStyle } from "../styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Inputs/Switch";
import { InputBox } from "../components/Inputs/InputBox";

import styled from "styled-components";

export const Home = () => {
  const [isToggled, setIsToggled] = useState(false);

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  return (
    <>
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
        <MainSettingsContainer>
          <h1>General Settings</h1>
          <SettingContainer>
            <Setting>
              <InputBox
                message="User Agent:"
                value="7PsadJasKWdfgEhhjPtyOAWEIA94fsd"
              />
            </Setting>
            <Setting>
              <InputBox message="Username:" value="3Q99CZASKD" />
            </Setting>
            <Setting>
              <InputBox message="Client Secret: " value="3Q99CZASKD" />
            </Setting>
          </SettingContainer>

          <Setting>
            Client Secret: <input value="3Q99CZASKD" />
          </Setting>
          <Setting>
            User Agent: <input value="7PsadJasKWdfgEhhjPtyOAWEIA94fsd" />
          </Setting>
          <Setting>
            Username: <input value="CrimsonUser" />
          </Setting>
          <Setting>
            Password: <input value="ThisIsAPassword" type="password" />
          </Setting>
          <Setting>
            <Switch
              message="Validate On Submit  "
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </Setting>
        </MainSettingsContainer>
      </BasePageStyle>
    </>
  );
};

const SettingContainer = styled.div`
  display: flex;
  flex-direction: column;
  input {
  }
  span {
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

const MainSettingsContainer = styled(ContainerStyle)`
  padding-left: 25px;
  h1 {
    text-align: center;
    border-radius: 5px;
    width: 100%;
  }
`;

const Setting = styled.div`
  margin-top: 10px;
`;
