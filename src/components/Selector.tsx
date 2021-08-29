import styled from 'styled-components';
import { DisableDrag } from '../styles/Styles';

type SelectorProps = {
  message?: string;
  clickEvent: any;
  imageUrl?: string;
};

export const Selector = ({ message, clickEvent, imageUrl }: SelectorProps) => {
  if (!imageUrl) {
    imageUrl = `https://avatars.dicebear.com/api/micah/${message}.svg`;
  }

  if (message === 'Create') {
    imageUrl = 'https://i.imgur.com/lHnsAwX.png';
  }

  return (
    <SelectorStyle className="selector" onClick={clickEvent}>
      <img src={imageUrl} alt="Node Avatar" />
      <div>
        <span>{message}</span>
      </div>
    </SelectorStyle>
  );
};

const SelectorStyle = styled(DisableDrag)`
  width: 100px;
  height: 150px;
  border: 2px solid black;
  img {
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    /* background: rgba(0, 0, 0, 0.3); */
    width: 100px;
    height: 100px;
  }
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    vertical-align: middle;
    width: 100%;
  }

  div {
    border-top: 2px solid black;
    text-align: center;
    vertical-align: middle;
    font-size: 12px;
    /* background-color: black; */
  }

  :hover {
    background-color: #141617;
    div {
      background-color: #1f1f1f;
    }
  }

  cursor: pointer;
`;
