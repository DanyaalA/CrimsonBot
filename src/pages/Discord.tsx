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
import { RedditConfigAPI } from '../utils/data/RedditConfig';
import { DiscordConfigAPI } from '../utils/data/DiscordConfig';
import {
  GuildConfigDto,
  PaymentDto,
  RedditConfigDto,
} from '../utils/data/types';
import { faSmileBeam } from '@fortawesome/free-regular-svg-icons';

export const Discord = () => {
  const loadingTemplate: RedditConfigDto = {
    _id: '0',
    clientId: '0',
    clientSecret: 'Client Secret',
    username: 'Username',
    password: 'Password',
    userAgent: 'Firefox',
    title: 'Hey',
    pmBody: 'I Saw Your Post...',
    delay: 0,
    subreddits: ['Subreddit1', 'Subreddit2'],
    forbiddenWords: ['ForbiddenWord1', 'Forbidden String 1'],
  };

  const loadingDiscordConfig: GuildConfigDto = {
    _id: '0',
    paymentConfigId: '0',
    prefix: '?',
    embedImageUrl: 'http://www.image.com/image.png',
    autoSwitcher: false,
    autoReact: false,
    autoTicket: false,
  };

  const loadingPayment: PaymentDto = {
    _id: '0',
    nodeId: '0',
    name: 'Loading Payments...',
    value: 'Loading...',
    type: 'Loading...',
  };

  const [payments, setPayments] = useState([loadingPayment]);
  const [discordConfig, setDiscordConfig] = useState(loadingDiscordConfig);

  const discordAPI = new DiscordConfigAPI();

  const loadConfig = async () => {
    const discordConfig = await discordAPI.getOne('869998649952833578');

    const payments = await discordAPI.getPayments(
      discordConfig.paymentConfigId
    );

    setPayments(payments);
    setDiscordConfig(discordConfig);

    console.log(payments);
    console.log(discordConfig);
  };

  useEffect(() => {
    loadConfig();
  }, []);

  const saveData = async () => {
    await discordAPI.update(discordConfig);
  };

  const addPayment = async () => {
    const newPayment: PaymentDto = {
      _id: '0',
      name: 'Payment Name',
      value: 'Payment Value',
      type: 'FIAT',
      nodeId: discordConfig.paymentConfigId,
      newPayment: true,
    };

    const savedPayment = await discordAPI.createPayments([newPayment]);

    setPayments([...payments, savedPayment[0]]);
  };

  const savePayments = async () => {
    const updatedPayments = await discordAPI.updatePayments(payments);
    const deletedIds: string[] = [];
    const newPayments = await Promise.all(
      payments.map((payment) => {
        if (payment.deletedPayment && payment._id) {
          deletedIds.push(payment._id);
        } else {
          return payment;
        }
      })
    );

    if (deletedIds.length > 0) await discordAPI.deletePayments(deletedIds);

    if (updatedPayments.status != 200) {
      setPayments(updatedPayments);
    }

    console.log(newPayments);
  };

  return (
    <HomeStyle>
      <PageHeader
        title="LabMaker Discord Settings"
        subtitle={`Server/${discordConfig._id}`}
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
              message="Payment Config"
              value={discordConfig.paymentConfigId}
              onChange={(e: any) => {
                setDiscordConfig({
                  ...discordConfig,
                  paymentConfigId: e.target.value,
                });
              }}
            />
            <InputBox
              message="Bot Image URL"
              value={discordConfig.embedImageUrl}
              onChange={(e: any) => {
                setDiscordConfig({
                  ...discordConfig,
                  embedImageUrl: e.target.value,
                });
              }}
            />
            <Switch
              message="Advance User Switcher"
              isToggled={discordConfig.autoSwitcher}
              onToggle={(e: any) => {
                setDiscordConfig({
                  ...discordConfig,
                  autoSwitcher: !discordConfig.autoSwitcher,
                });
              }}
            />
            <Switch
              message="Auto Creete Ticket"
              isToggled={discordConfig.autoTicket}
              onToggle={(e: any) => {
                setDiscordConfig({
                  ...discordConfig,
                  autoTicket: !discordConfig.autoTicket,
                });
              }}
            />
            <Switch
              message="Auto Reacter"
              isToggled={discordConfig.autoReact}
              onToggle={(e: any) => {
                setDiscordConfig({
                  ...discordConfig,
                  autoReact: !discordConfig.autoReact,
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
              {payments.map((payment: PaymentDto, index) => {
                if (!payment.deletedPayment) {
                  return (
                    <Payment
                      payments={payments}
                      payment={payment}
                      setPayments={setPayments}
                      key={index}
                    />
                  );
                }
              })}
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
  margin-top: 100px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    font-weight: normal;
    font-size: 15px;
  }

  @media (max-width: 812px) {
    width: 110%;
    margin-top: 50px;
  }
`;

const ComboContainer = styled.div`
  display: flex;
  margin-left: 5px;
  #comboContainer {
    margin-left: 15px;
  }
`;
