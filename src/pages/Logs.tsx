import { useEffect } from 'react';
import { ContainerStyle, BasePageStyle } from '../styles/Styles';
import { PageHeader } from '../components/PageHeader';
import styled from 'styled-components';
import { Table } from '../components/Table';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { updateLogs } from '../utils/slices/logsSlice';
import { Labmaker } from '../utils/APIHandler';
import { Spinner } from '../components/Spinner';

export const Logs = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state: RootState) => state.logs.value);

  useEffect(() => {
    const loadLogs = async () => {
      let id = '3630aeb2-38c5-4c36-a0d5-5c2d95fa35b0';
      const data = await Labmaker.Log.getLogs(id);

      dispatch(updateLogs(data));
    };

    loadLogs();
  }, [dispatch]);

  return (
    <HomeStyle>
      <Spinner
        loading={logs.length > 0 ? logs[0].loading : false}
        message={'Loading Logs'}
      />

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
