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
import { RedditConfigDto } from '../utils/data/types';

import styled from 'styled-components';
import { RedditConfigAPI } from '../utils/data/RedditConfig';
import { config } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, update } from '../store';

export const Home = () => {
  const loadingTemplate: RedditConfigDto = {
    _id: '0',
    clientId: '0',
    clientSecret: 'Client Secret',
    username: 'Username',
    password: 'Password',
    userAgent: 'Firefox',
    title: 'Hey',
    pmBody: 'I Saw Your Post...',
    delay: 0,
    subreddits: ['Subreddit1', 'Subreddit2'],
    forbiddenWords: ['ForbiddenWord1', 'Forbidden String 1'],
  };
  const dispatch = useDispatch();

  const [isLogging, setIsLogging] = useState(false);
  const [config, setConfig] = useState(new Config({}));
  const [redditConfig, setRedditConfig] = useState(loadingTemplate);
  const redditAPI = new RedditConfigAPI();

  const getConfig = useSelector((state: RootState) => state.redditConfig.value);

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

  const loadConfig = async () => {
    const config: RedditConfigDto = await redditAPI.getOne(
      '3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0'
    );

    setRedditConfig(config);
    dispatch(update(config));

    console.log(config);
    console.log(getConfig);
  };

  useEffect(() => {
    json();
    loadConfig();
  }, []);

  const saveData = async () => {
    await redditAPI.update(redditConfig);
    //APIHelper.PostConfig(config);
  };

  return (
    <HomeStyle>
      <PageHeader
        title="LabMaker Reddit Settings"
        subtitle={`/u/${getConfig.username}`}
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
              value={redditConfig.clientId}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
                  clientId: e.target.value,
                });
              }}
            />
            <InputBox
              message="Client Secret"
              value={redditConfig.clientSecret}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
                  clientSecret: e.target.value,
                });
              }}
            />
            <InputBox
              message="Username"
              value={redditConfig.username}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
                  username: e.target.value,
                });
              }}
            />
            <InputBox
              message="Password"
              value={redditConfig.password}
              type="password"
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
                  password: e.target.value,
                });
              }}
            />
            <InputBox
              message="User Agent"
              value={redditConfig.userAgent}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
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
              value={redditConfig.title}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
                  title: e.target.value,
                });
              }}
            />
            <InputBox
              message="Body"
              value={redditConfig.pmBody}
              onChange={(e: any) => {
                setRedditConfig({
                  ...redditConfig,
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
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-weight: normal;
    font-size: 15px;
  }

  @media (max-width: 812px) {
    width: 110%;
    margin-top: 50px;
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
