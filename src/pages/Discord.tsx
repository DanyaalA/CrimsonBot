import { useEffect } from 'react';
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
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addPayment, updatePayemnts } from '../utils/slices/paymentSlice';
import { updateDiscord } from '../utils/slices/configSlices';
import { PaymentDto } from 'labmaker-api-wrapper';
import { Spinner } from '../components/Spinner';
import { Labmaker } from '../utils/APIHandler';

export const Discord = () => {
  const dispatch = useDispatch();
  const discordConfig = useSelector(
    (state: RootState) => state.discordConfig.value
  );
  const payments = useSelector((state: RootState) => state.payments.value);

  useEffect(() => {
    const loadConfig = async () => {
      const dc = await Labmaker.Discord.getOne('869998649952833578');
      const payments = await Labmaker.Discord.getPayments(dc.paymentConfigId);

      dispatch(updateDiscord(dc));
      dispatch(updatePayemnts(payments));
    };
    loadConfig();
  }, [dispatch]);

  const saveData = async () => {
    await Labmaker.Discord.update(discordConfig);
  };

  const createPayment = async () => {
    const newPayment: PaymentDto = {
      _id: '0',
      name: 'Payment Name',
      value: 'Payment Value',
      type: 'FIAT',
      nodeId: discordConfig.paymentConfigId,
      newPayment: true,
    };

    const savedPayment = await Labmaker.Discord.createPayments([newPayment]);
    console.log(savedPayment);

    dispatch(addPayment(savedPayment[0]));
  };

  const savePayments = async () => {
    await Labmaker.Discord.updatePayments(payments);

    const deletedIds: string[] = [];
    await Promise.all(
      payments
        .filter((payment) => payment.deletedPayment)
        .map((payment) => {
          if (payment.deletedPayment && payment._id) {
            deletedIds.push(payment._id);
          }

          return payment;
        })
    );

    if (deletedIds.length > 0)
      await Labmaker.Discord.deletePayments(deletedIds);
  };

  return (
    <HomeStyle>
      <Spinner
        loading={discordConfig.loading}
        message={'Loading Discord Config'}
      />
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
                dispatch(
                  updateDiscord({
                    ...discordConfig,
                    paymentConfigId: e.target.value,
                  })
                );
              }}
            />
            <InputBox
              message="Bot Image URL"
              value={discordConfig.embedImageUrl}
              onChange={(e: any) => {
                dispatch(
                  updateDiscord({
                    ...discordConfig,
                    embedImageUrl: e.target.value,
                  })
                );
              }}
            />
            <Switch
              message="Advance User Switcher"
              isToggled={discordConfig.autoSwitcher}
              onToggle={(e: any) => {
                dispatch(
                  updateDiscord({
                    ...discordConfig,
                    autoSwitcher: !discordConfig.autoSwitcher,
                  })
                );
              }}
            />
            <Switch
              message="Auto Creete Ticket"
              isToggled={discordConfig.autoTicket}
              onToggle={(e: any) => {
                dispatch(
                  updateDiscord({
                    ...discordConfig,
                    autoTicket: !discordConfig.autoTicket,
                  })
                );
              }}
            />
            <Switch
              message="Auto Reacter"
              isToggled={discordConfig.autoReact}
              onToggle={(e: any) => {
                dispatch(
                  updateDiscord({
                    ...discordConfig,
                    autoReact: !discordConfig.autoReact,
                  })
                );
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
                  return <Payment payment={payment} key={index} />;
                } else {
                  return <div></div>;
                }
              })}
            </div>

            <CenterDiv>
              <CustomButton onClick={createPayment}>Add</CustomButton>
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
