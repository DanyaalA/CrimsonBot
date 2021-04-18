import { useState } from "react";
import { ContainerStyle, BasePageStyle } from "../styles/Styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Inputs/Switch";
import { InputBox } from "../components/Inputs/InputBox";

import styled from "styled-components";

export const Discord = () => {
  const [isToggled, setIsToggled] = useState(false);

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */

  return (
    <HomeStyle>
      <PageHeader title="" subtitle="" />
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
            <h1>General</h1>
            <InputBox
              message="Discord Bot Token"
              value="7PsadJasKWdfgEhhjPtyOAWEIA94fsd"
            />
            <InputBox message="Discord Server ID" value="Work Lab" />
            <InputBox
              message="Auto Respond Message"
              value="Please Join My server and create a ticket a tutor will contact you shortly and help you with your message"
            />
            <Switch
              message="Auto Log"
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
            <Switch
              message="Auto DM"
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </GeneralSettingContainer>
          <GeneralSettingContainer id="comboContainer">
            <h1>Logs</h1>
            <InputBox message="Log Server" value="Talk here" />
            <InputBox message="New Ticket Channel" value="Updates" />
            <Switch
              message="DM Dan"
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
            <Switch
              message="DM Aroma"
              isToggled={isToggled}
              onToggle={() => setIsToggled(!isToggled)}
            />
          </GeneralSettingContainer>
        </ComboContainer>
      </BasePageStyle>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  transition: all 5s ease-in-out;
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
