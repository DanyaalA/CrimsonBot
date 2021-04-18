import React, { useEffect, useState } from "react";
import { ContainerStyle, BasePageStyle } from "../styles/Styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Inputs/Switch";
import { InputBox } from "../components/Inputs/InputBox";

import styled from "styled-components";
import { Table } from "../components/Table";
import { GetLogs, LogsDto } from "../utils/APIHelper";

export const Logs = () => {
  const [logs, setLogs] = useState([new LogsDto({})]);

  const json = async () => {
    let data = await GetLogs();
    setLogs(data);
  };

  useEffect(() => {
    json();
  }, []);

  return (
    <HomeStyle>
      <PageHeader title="Crimson Reddit Logs" subtitle="/u/HomeworkHelperr" />

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
