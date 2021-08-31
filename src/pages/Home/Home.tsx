import { useEffect, useState } from 'react';
import { BasePageStyle, CenterDiv, CustomButton } from 'styles/Styles';
import { PageHeader } from 'components/PageHeader';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { Node, updateReddit } from 'utils/slices/configSlices';
import { Labmaker } from 'utils/APIHandler';
import { Spinner } from 'components/Spinner';
import { updateUser } from 'utils/slices/userSlice';
import { AccountSettings } from './AccountSettings';
import { MainSettings } from 'pages/Home/MainSettings';
import { NodeConfigList } from 'components/NodeConfigList';

function useNodeLogic() {
  const dispatch = useDispatch();
  const [reload, setReload] = useState(true);
  const user = useSelector((state: RootState) => state.user.value);
  const redditConfig = useSelector(
    (state: RootState) => state.redditConfig.value
  );

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
  });

  const saveNode = async () => {
    if (!redditConfig.newNode) return Labmaker.Reddit.update(redditConfig);

    const newNode = await Labmaker.Reddit.create(redditConfig);

    if (newNode) {
      dispatch(updateReddit(newNode));
      dispatch(updateUser({ ...user, nodes: [...user.nodes, newNode._id] }));
      setReload(true);
    }
  };

  const deleteNode = async () => {
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

  return { redditConfig, handleClick, saveNode, deleteNode };
}

export const Home = () => {
  const { redditConfig, handleClick, saveNode, deleteNode } = useNodeLogic();

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
        <NodeConfigList onClick={handleClick} />

        <CenterDiv>
          <CustomButton onClick={deleteNode}>Delete</CustomButton>
        </CenterDiv>

        <ComboContainer>
          <AccountSettings config={redditConfig} />
          <MainSettings config={redditConfig} />
        </ComboContainer>

        <ButtonContainer>
          <CenterDiv>
            <CustomButton onClick={saveNode}>Save</CustomButton>
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

const ButtonContainer = styled.div`
  /* padding: 25px; */
  padding-top: 15px;

  button {
    margin-left: 35px;
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
