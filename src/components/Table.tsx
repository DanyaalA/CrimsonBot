import React from "react";
import styled from "styled-components";
import { LogsDto } from "../utils/APIHelper";

type LogProps = {
  logs: LogsDto[];
};

export const Table = ({ logs }: LogProps) => {
  return (
    <TableStyle>
      <Header>
        <p>User</p>
        <p>Message</p>
        <p>Subreddit</p>
        <p>Post</p>
        <p>Time</p>
      </Header>

      <Content>
        {logs.map((log) => (
          <TableItem>
            <a href={`https://reddit.com/u/${log.username}/`}>{log.username}</a>
            <p>{log.message}</p>
            <p>{log.subreddit}</p>
            <a
              href={`https://reddit.com/r/${log.subreddit}/comments/${log.subId}`}
            >
              Link Here
            </a>
            <p>{log.time}</p>
          </TableItem>
        ))}
      </Content>
    </TableStyle>
  );
};

const TableStyle = styled.div``;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid rgba(61, 55, 95, 0.3);
  justify-content: space-between;
  padding-right: 130px;
  margin-right: 30px;
  p {
    //margin-right: 20rem;
    font-size: 23px;
  }
`;

const Content = styled.div``;

const TableItem = styled.div`
  display: flex;
  margin-bottom: 5px;
  justify-content: space-between;
  padding-right: 130px;
  p {
    //margin: 0 18rem 0 0;
    //margin-right: 20%;
  }
  a {
    text-decoration: none;
    color: #0e48e9;
    transition: all 0.2s;
  }

  a:hover {
    color: #0ea4e9;
  }
`;
