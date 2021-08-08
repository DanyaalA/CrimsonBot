import { useEffect, useState } from 'react';
import {
  ContainerStyle,
  BasePageStyle,
  CenterDiv,
  CustomButton,
} from '../styles/Styles';
import { PageHeader } from '../components/PageHeader';
import { Switch } from '../components/Inputs/Switch';
import { InputBox } from '../components/Inputs/InputBox';
import { Payment } from '../components/Payment';
import APIHelper, { Config, Payments } from '../utils/APIHelper';
import styled from 'styled-components';

export const Discord = () => {
  const [config, setConfig] = useState(new Config({}));
  const [payments, setPayments] = useState([new Payments({})]);
  const json = async () => {
    let config = await APIHelper.GetConfig();
    let payments = await APIHelper.GetPayments();
    setConfig(config);
    setPayments(payments);
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

  const addPayment = () => {
    let newId = 0;
    if (payments.length > 0) {
      newId = payments[payments.length - 1].id + 1;
    }

    setPayments([
      ...payments,
      { id: newId, name: '', value: '', type: 'FIAT' },
    ]);
  };

  const savePayments = () => {
    APIHelper.PostPayments(payments);
  };

  return (
    <HomeStyle>
      <PageHeader title="" subtitle="" />
      <PageHeader
        title="LabMaker Discord Settings"
        subtitle={`/u/${config.username}`}
      />
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
              message="Auto Creete Ticket"
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
            <div>
              {payments.map((payment, index) => (
                <Payment
                  payments={payments}
                  payment={payment}
                  setPayments={setPayments}
                  key={index}
                />
              ))}
            </div>

            <CenterDiv>
              <CustomButton onClick={addPayment}>Add</CustomButton>
              <CustomButton onClick={savePayments}>Save</CustomButton>
            </CenterDiv>
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
    padding-bottom: 10px;
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
