import { useEffect, useState } from 'react';
import {
  ContainerStyle,
  BasePageStyle,
  CenterDiv,
  CustomButton,
} from '../styles/Styles';
import { PageHeader } from '../components/PageHeader';
import { Switch } from '../components/Inputs/Switch';
import { InputBox } from '../components/Inputs/InputBox';
import APIHelper, { Config } from '../utils/APIHelper';

import styled from 'styled-components';

export const Home = () => {
  const [isLogging, setIsLogging] = useState(false);
  const [config, setConfig] = useState(new Config({}));

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  const json = async () => {
    let data = await APIHelper.GetConfig();
    setConfig(data);
  };

  useEffect(() => {
    json();
  }, []);

  const saveData = () => {
    APIHelper.PostConfig(config);
  };

  return (
    <HomeStyle>
      <PageHeader
        title="LabMaker Reddit Settings"
        subtitle={`/u/${config.username}`}
      />
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
            <InputBox
              message="Client ID"
              value={config.clientId}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  clientId: e.target.value,
                });
              }}
            />
            <InputBox
              message="Client Secret"
              value={config.clientSecret}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  clientSecret: e.target.value,
                });
              }}
            />
            <InputBox
              message="Username"
              value={config.username}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  username: e.target.value,
                });
              }}
            />
            <InputBox
              message="Password"
              value={config.password}
              type="password"
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  password: e.target.value,
                });
              }}
            />
            <InputBox
              message="User Agent"
              value={config.userAgent}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  userAgent: e.target.value,
                });
              }}
            />
            <CenterDiv>
              <CustomButton onClick={saveData}>Save</CustomButton>
            </CenterDiv>
          </GeneralSettingContainer>
          <GeneralSettingContainer id="comboContainer">
            <h1>Main</h1>
            <InputBox
              message="Title"
              value={config.title}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  title: e.target.value,
                });
              }}
            />
            <InputBox
              message="Body"
              value={config.pmBody}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  pmBody: e.target.value,
                });
              }}
            />
            <InputBox
              message="Subreddits"
              value={config.subreddits}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  subreddits: e.target.value.split(','),
                });
              }}
            />
            <InputBox
              message="Forbidden Words"
              value={config.forbiddenWords}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  forbiddenWords: e.target.value.split(','),
                });
              }}
            />
            <Switch
              message="Log Bot Activity"
              isToggled={isLogging}
              onToggle={() => setIsLogging(!isLogging)}
            />
            <CenterDiv>
              <CustomButton onClick={saveData}>Save</CustomButton>
            </CenterDiv>
          </GeneralSettingContainer>
        </ComboContainer>
      </BasePageStyle>
    </HomeStyle>
  );
};

export default Home;

const HomeStyle = styled.div`
  transition: all 5s ease-in-out;
`;

const GeneralSettingContainer = styled(ContainerStyle)`
  display: flex;
  flex-direction: column;
  padding: 25px;

  h1 {
    text-align: center;
    border-radius: 5px;
    width: 100%;
  }

  .inputBox {
    width: 100%;
    padding-bottom: 10px;
  }
  @media (max-width: 812px) {
    display: block;
  }
`;

const StatsContainer = styled(ContainerStyle)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-weight: normal;
    font-size: 15px;
  }

  @media (max-width: 812px) {
    width: 110%;
  }
`;

const ComboContainer = styled.div`
  display: flex;
  margin-left: 5px;

  #comboContainer {
    margin-left: 15px;
  }

  @media (max-width: 812px) {
    display: inline;
  }
`;
