import React from "react";
import { BasePageStyle, ContainerStyle } from "../styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Switch";
import styled from "styled-components";

export const Home = () => {
  return (
    <>
      <PageHeader />
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
          <Setting>
            <Switch rounded={true} isToggled={true} onToggle={false} />
          </Setting>
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
            Validate On Submit:
            <input type="checkbox" value="Car" />
          </Setting>
        </MainSettingsContainer>
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

const Setting = styled.div``;
