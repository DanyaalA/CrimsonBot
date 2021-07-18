import { useEffect, useState } from "react";
import {
  ContainerStyle,
  BasePageStyle,
  CenterDiv,
  CustomButton,
} from "../styles/Styles";
import { PageHeader } from "../components/PageHeader";
import { Switch } from "../components/Inputs/Switch";
import { InputBox } from "../components/Inputs/InputBox";
import APIHelper, { Config } from "../utils/APIHelper";

import styled from "styled-components";

export const Discord = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [config, setConfig] = useState(new Config({}));

  const json = async () => {
    let data = await APIHelper.GetConfig();
    setConfig(data);
    console.log(data.title);
  };

  useEffect(() => {
    json();
  }, []);

  /*
  const boxTogle = () => {
    const newToggle = !isToggled;
    setIsToggled(newToggle);
    console.log("New Toggle: " + newToggle);
  }; */
  const saveData = () => {
    APIHelper.PostConfig(config);
  };

  return (
    <HomeStyle>
      <PageHeader title="" subtitle="" />
      <BasePageStyle>
        <StatsContainer>
          <h2>
            Users <span>500</span>
          </h2>
          <h2>
            Online <span>800</span>
          </h2>
          <h2>
            Open Tickets <span>600</span>
          </h2>
        </StatsContainer>
        <ComboContainer>
          <GeneralSettingContainer id="comboContainer">
            <h1>General</h1>
            <InputBox
              message="Activity"
              value={config.activity}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  activity: e.target.value,
                });
              }}
            />
            <InputBox
              message="Type"
              value={config.type}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  type: e.target.value,
                });
              }}
            />
            <InputBox
              message="status"
              value={config.status}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  status: e.target.value,
                });
              }}
            />
            <InputBox
              message="Bot Image URL"
              value={config.imageUrl}
              onChange={(e: any) => {
                setConfig({
                  ...config,
                  imageUrl: e.target.value,
                });
              }}
            />
            <Switch
              message="Advance User Switcher"
              isToggled={config.autoSwitch}
              onToggle={(e: any) => {
                setConfig({
                  ...config,
                  autoSwitch: !config.autoSwitch,
                });
              }}
            />
            <Switch
              message="Auto Create Ticket"
              isToggled={config.autoTicket}
              onToggle={(e: any) => {
                setConfig({
                  ...config,
                  autoTicket: !config.autoTicket,
                });
              }}
            />
            <Switch
              message="Auto Reacter"
              isToggled={config.autoReact}
              onToggle={(e: any) => {
                setConfig({
                  ...config,
                  autoReact: !config.autoReact,
                });
              }}
            />
            <CenterDiv>
              <CustomButton onClick={saveData}>Save</CustomButton>
            </CenterDiv>
          </GeneralSettingContainer>
          <GeneralSettingContainer id="comboContainer">
            <h1>Payment</h1>
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
`;

const StatsContainer = styled(ContainerStyle)`
  display: flex;
  justify-content: space-between;
  width: 100%;

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
