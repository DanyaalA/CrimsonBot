import { useEffect } from 'react';
import { ContainerStyle, BasePageStyle } from '../styles/Styles';
import { PageHeader } from '../components/PageHeader';
import styled from 'styled-components';
import { Table } from '../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { LogAPI } from '../utils/data/Log';
import { updateLogs } from '../utils/slices/logsSlice';

export const Logs = () => {
  const dispatch = useDispatch();
  const logAPI = new LogAPI();
  const logs = useSelector((state: RootState) => state.logs.value);
  const redditConfig = useSelector(
    (state: RootState) => state.redditConfig.value
  );

  const loadLogs = async () => {
    let id = '0';
    if (redditConfig._id === '0') {
      id = '3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0';
    }
    const data = await logAPI.getLogs(id);
    console.log(data);
    dispatch(updateLogs(data));
  };

  useEffect(() => {
    loadLogs();
  }, []);

  return (
    <HomeStyle>
      <PageHeader title="LabMaker Logs" subtitle="/u/HomeworkHelperr" />

      <BasePageStyle>
        <GeneralSettingContainer id="comboContainer">
          <h1>Logs</h1>
          <Table logs={logs}></Table>
        </GeneralSettingContainer>
      </BasePageStyle>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  transition: all 5s ease-in-out;

  table {
    width: 100%;
    text-align: center;
  }
`;

const GeneralSettingContainer = styled(ContainerStyle)`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  padding-left: 25px;

  h1 {
    text-align: center;
    border-radius: 5px;
    width: 100%;
  }
`;
