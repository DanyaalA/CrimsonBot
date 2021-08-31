import { useEffect, useState } from 'react';
import {
  ContainerStyle,
  BasePageStyle,
  CenterDiv,
  CustomButton,
  SelectorContainer,
} from '../styles/Styles';
import { PageHeader } from '../components/PageHeader';
import { Switch } from '../components/Inputs/Switch';
import { InputBox } from '../components/Inputs/InputBox';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Node, updateReddit } from '../utils/slices/configSlices';
import { TagInputBox } from '../components/Inputs/TagInput';
import { Labmaker } from '../utils/APIHandler';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Toggle } from '../components/Toggle';
import { Spinner } from '../components/Spinner';
import { Selector } from '../components/Selector';
import { updateUser } from '../utils/slices/userSlice';

export const Home = () => {
  const dispatch = useDispatch();
  const [isLogging, setIsLogging] = useState(false);
  const [reload, setReload] = useState(true);

  const user = useSelector((state: RootState) => state.user.value);
  const redditConfig = useSelector(
    (state: RootState) => state.redditConfig.value
  );

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  const handleClick = async (node: string) => {
    if (node === redditConfig._id) {
      return;
    }

    if (node === 'Create') {
      const newNode: Node = {
        _id: '0',
        clientId: '',
        clientSecret: '',
        username: '',
        password: '',
        userAgent: '',
        title: '',
        pmBody: '',
        delay: 5000,
        subreddits: ['Subreddit'],
        forbiddenWords: [],
        blockedUsers: [],
        newNode: true,
      };

      dispatch(updateReddit(newNode));

      // await Labmaker.Reddit.create(loadingRedditConfig);
    } else {
      const config: Node = await Labmaker.Reddit.getOne(node);

      if (!config) {
        console.log('Invalid Id');
        return;
      }
      dispatch(updateReddit(config));
    }
  };

  useEffect(() => {
    const loadConfig = async () => {
      if (user.nodes.length === 0) {
        dispatch(updateReddit({ ...redditConfig, loading: false }));
        return;
      }

      const config: Node = await Labmaker.Reddit.getOne(user.nodes[0]);

      const hasCreate = user.nodes.find((n) => n === 'Create');

      if (!hasCreate) {
        const nodes = [...user.nodes, 'Create'];
        dispatch(updateUser({ ...user, nodes: nodes }));
      } else {
        const nodes = [...user.nodes];
        nodes.push(nodes.splice(nodes.indexOf(hasCreate), 1)[0]);
        dispatch(updateUser({ ...user, nodes }));
      }

      if (!config) return;
      dispatch(updateReddit(config));

      setReload(false);
    };
    if (reload) {
      loadConfig();
    }
  }, [dispatch, reload, redditConfig, user]);

  const saveData = async () => {
    if (redditConfig.newNode) {
      const newNode = await Labmaker.Reddit.create(redditConfig);
      console.log(newNode);
      if (newNode) {
        dispatch(updateReddit(newNode));
        dispatch(updateUser({ ...user, nodes: [...user.nodes, newNode._id] }));
        setReload(true);
      }
    } else {
      await Labmaker.Reddit.update(redditConfig);
    }
  };

  const deleteData = async () => {
    if (redditConfig._id === '3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0') return;

    await Labmaker.Reddit.deleteConfig(redditConfig._id);
    const nodes = [...user.nodes];
    const index = nodes.indexOf(redditConfig._id);

    if (index > -1) {
      nodes.splice(index, 1);
      dispatch(updateUser({ ...user, nodes }));
      setReload(true);
    }
  };

  return (
    <HomeStyle>
      <Spinner
        loading={redditConfig.loading}
        message={'Loading Reddit Config'}
      />
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

        <SelectorContainer>
          {user.nodes.map((node) => {
            return (
              <Selector
                key={node}
                clickEvent={() => handleClick(node)}
                message={node}
              />
            );
          })}
        </SelectorContainer>
        <CenterDiv>
          <CustomButton onClick={deleteData}>Delete</CustomButton>
        </CenterDiv>
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
            <Toggle
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
              toggled={isLogging}
              onToggle={() => setIsLogging(!isLogging)}
            />
          </GeneralSettingContainer>
        </ComboContainer>
        <ButtonContainer>
          <CenterDiv>
            <CustomButton onClick={saveData}>Save</CustomButton>
          </CenterDiv>
        </ButtonContainer>
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

const ButtonContainer = styled.div`
  /* padding: 25px; */
  padding-top: 15px;

  button {
    margin-left: 35px;
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
