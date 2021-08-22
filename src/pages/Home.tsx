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
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateReddit } from '../utils/slices/configSlices';
import { TagInputBox } from '../components/Inputs/TagInput';
import LabmakerAPI from '../utils/APIHandler';
import { RedditConfigDto } from 'labmaker-api-wrapper';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { InputBoxToggle } from '../components/Inputs/InputBoxToggle';

export const Home = () => {
  const dispatch = useDispatch();
  const [isLogging, setIsLogging] = useState(false);

  const redditConfig = useSelector(
    (state: RootState) => state.redditConfig.value
  );

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  useEffect(() => {
    const loadConfig = async () => {
      const config: RedditConfigDto = await LabmakerAPI.Reddit.getOne(
        '3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0'
      );

      if (!config) return;
      dispatch(updateReddit(config));
    };
    loadConfig();
  }, [dispatch]);

  const saveData = async () => {
    await LabmakerAPI.Reddit.update(redditConfig);
  };

  return (
    <HomeStyle>
      <PageHeader
        title="LabMaker Reddit Settings"
        subtitle={`/u/${redditConfig.username}`}
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
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    clientId: e.target.value,
                  })
                );
              }}
            />
            <InputBox
              message="Client Secret"
              value={redditConfig.clientSecret}
              onChange={(e: any) => {
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    clientSecret: e.target.value,
                  })
                );
              }}
            />
            <InputBox
              message="Username"
              value={redditConfig.username}
              onChange={(e: any) => {
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    username: e.target.value,
                  })
                );
              }}
            />
            <InputBoxToggle
              message="Password"
              value={redditConfig.password}
              visibleIcon={faEye}
              hiddenIcon={faEyeSlash}
              onChange={(e: any) => {
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    password: e.target.value,
                  })
                );
              }}
            />
            <InputBox
              message="User Agent"
              value={redditConfig.userAgent}
              onChange={(e: any) => {
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    userAgent: e.target.value,
                  })
                );
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
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    title: e.target.value,
                  })
                );
              }}
            />
            <InputBox
              message="Body"
              value={redditConfig.pmBody}
              onChange={(e: any) => {
                dispatch(
                  updateReddit({
                    ...redditConfig,
                    pmBody: e.target.value,
                  })
                );
              }}
            />
            <TagBoxMiniContainer>
              <TagInputBox
                message="Subreddits"
                items={redditConfig.subreddits}
                onChange={(updatedValues: any) => {
                  dispatch(
                    updateReddit({
                      ...redditConfig,
                      subreddits: updatedValues,
                    })
                  );
                }}
              />

              <TagInputBox
                message="Forbidden Words"
                items={redditConfig.forbiddenWords}
                onChange={(updatedValues: any) => {
                  dispatch(
                    updateReddit({
                      ...redditConfig,
                      forbiddenWords: updatedValues,
                    })
                  );
                }}
              />

              <TagInputBox
                message="Blocked Users"
                items={redditConfig.blockedUsers}
                onChange={(updatedValues: any) => {
                  dispatch(
                    updateReddit({
                      ...redditConfig,
                      blockedUsers: updatedValues,
                    })
                  );
                }}
              />
            </TagBoxMiniContainer>

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

const TagBoxMiniContainer = styled.div`
  * {
    /* transition: all 0.35s; */
    transition: all 350ms ease-out;
  }
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
