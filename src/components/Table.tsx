import React from "react";
import styled from "styled-components";
import { LogsDto } from "../utils/APIHelper";

type LogProps = {
  logs: LogsDto[];
};

export const Table = ({ logs }: LogProps) => {
  return (
    <StyledTable>
      <tr>
        <th>User</th>
        <th>Message</th>
        <th>Subreddit</th>
        <th>Post</th>
        <th>Time</th>
      </tr>
      {logs.map((log) => (
        <tr>
          <td>
            <a href={`https://reddit.com/u/${log.username}/`}>{log.username}</a>
          </td>
          <td>{log.message}</td>
          <td>{log.subreddit}</td>
          <td>
            <a
              href={`https://reddit.com/r/${log.subreddit}/comments/${log.subId}`}
            >
              Here
            </a>
          </td>
          <td>{log.time}</td>
        </tr>
      ))}
    </StyledTable>
  );
};
const StyledTable = styled.table`
  a {
    text-decoration: none;
    color: #0e48e9;
    transition: all 0.2s;
  }

  a:hover {
    color: #0ea4e9;
  }
`;
