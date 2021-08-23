import { LogDto } from 'labmaker-api-wrapper';
import { useState } from 'react';
import styled from 'styled-components';

type LogProps = {
  logs: LogDto[];
};

export const Table = ({ logs }: LogProps) => {
  const [isHidden, setIsHidden] = useState(true);
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>User</th>
          <th>
            <span onClick={() => setIsHidden(!isHidden)}>Message</span>
          </th>
          <th>Subreddit</th>
          <th>Post</th>
          <th>Time</th>
        </tr>
        {logs.map((log) => (
          <tr key={log._id}>
            <td>
              <a href={`https://reddit.com/u/${log.username}/`}>
                {log.username}
              </a>
            </td>
            <td>
              {isHidden ? (
                <span onClick={() => setIsHidden(!isHidden)}>
                  Click To View
                </span>
              ) : (
                <span onClick={() => setIsHidden(!isHidden)}>
                  {log.message}
                </span>
              )}
            </td>
            <td>
              <a href={`https://reddit.com/r/${log.subreddit}`}>
                {log.subreddit}
              </a>
            </td>
            <td>
              <a
                href={`https://reddit.com/r/${log.subreddit}/comments/${log.subId}`}
              >
                Here
              </a>
            </td>
            <td>{log.createdAt}</td>
          </tr>
        ))}
      </tbody>
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
  span {
    :hover {
      cursor: pointer;
    }
  }
  transition: all 1.5s ease-in-out;
`;
