import { useEffect, useState } from 'react';
import {
  ContainerStyle,
  BasePageStyle,
  CenterDiv,
  CustomButton,
  SelectorContainer,
} from 'styles/Styles';
import { PageHeader } from 'components/PageHeader';
import { Payment } from 'pages/Discord/Payment';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { updateDiscord } from 'utils/slices/configSlices';
import { Guild, PaymentDto } from 'labmaker-api-wrapper';
import { Spinner } from 'components/Spinner';
import { Labmaker } from 'utils/APIHandler';
import { Selector } from 'components/Selector';
import 'react-dropdown/style.css';
import { GeneralSettings } from 'pages/Discord/GeneralSettings';
import { loadingPayment } from 'utils/LoadingTypes';

type DDProps = {
  value: string;
  label: string;
};

function useGuildLogic() {
  const dispatch = useDispatch();
  const discordConfig = useSelector(
    (state: RootState) => state.discordConfig.value
  );

  const loadingServer: Guild = {
    id: '0',
    name: 'Name',
    icon: 'Icon',
    owner: false,
    permissions: '1234',
    features: [],
    joined: false,
  };

  const [guilds, setGuilds] = useState([loadingServer]);
  const [parsedGuilds, setParsedGuilds] = useState([
    { value: 'Loading...', label: 'Loading' },
  ]);
  const [reload, setReload] = useState(true);
  const [payments, setPayments] = useState([loadingPayment]);

  // const user = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    const loadConfig = async () => {
      setReload(false);
      dispatch(updateDiscord({ ...discordConfig, loading: true }));

      const fetchedGuilds = await Labmaker.Guild.Guilds();
      if (!fetchedGuilds) return;

      setGuilds(fetchedGuilds);
      setParsedGuilds(parseGuilds(fetchedGuilds));

      const dc = await Labmaker.Discord.getOne(fetchedGuilds[0].id);
      const fetchedPayments = await Labmaker.Discord.getPayments(
        dc.paymentConfigId
      );

      if (!dc) return;
      dispatch(updateDiscord(dc));

      if (!payments) return;

      setPayments(fetchedPayments);
    };

    if (reload) {
      loadConfig();
    }
  }, [dispatch, discordConfig, reload]);

  const saveData = async () => {
    await savePayments();
    await Labmaker.Discord.update(discordConfig);
  };

  const handleClick = async (server: string) => {
    const dc = await Labmaker.Discord.getOne(server);

    if (dc) {
      const payments = await Labmaker.Discord.getPayments(dc.paymentConfigId);

      dispatch(updateDiscord(dc));
      setPayments(payments);
    } else {
      window.open(
        'https://discord.com/api/oauth2/authorize?client_id=863403711422660648&permissions=8&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Fredirect&scope=bot'
      );
    }
  };

  const createPayment = async () => {
    const newPayment: PaymentDto = {
      _id: '0',
      name: 'Payment Name',
      value: 'Payment Value',
      type: 'FIAT',
      nodeId: discordConfig._id,
      newPayment: true,
    };

    const savedPayment = await Labmaker.Discord.createPayments([newPayment]);
    console.log(savedPayment);

    const _payments = [...payments];
    _payments.push(savedPayment[0]);
    console.log(savedPayment);
    setPayments(_payments);
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

  const parseGuilds = (guilds: Guild[]) => {
    let parsedGuilds: string[] = [];
    let parsed: DDProps[] = [];

    if (!guilds) return parsed;

    guilds.forEach((guild: Guild) => {
      if (guild.joined) {
        parsedGuilds.push(guild.name);
        parsed.push({ value: guild.id, label: guild.name });
      }
    });
    return parsed;
  };

  const handleChange = async (item: any) => {
    const fetchedPayments = await Labmaker.Discord.getPayments(item.value);

    setPayments(fetchedPayments);
    dispatch(updateDiscord({ ...discordConfig, paymentConfigId: item.value }));
  };

  return {
    guilds,
    parsedGuilds,
    saveData,
    handleClick,
    createPayment,
    handleChange,
    discordConfig,
    payments,
    setPayments,
  };
}

export const Discord = () => {
  const {
    guilds,
    parsedGuilds,
    saveData,
    handleClick,
    createPayment,
    handleChange,
    discordConfig,
    payments,
    setPayments,
  } = useGuildLogic();

  const GenerateGuilds = () => {
    if (!guilds) return <div></div>;

    return guilds.map((guild) => {
      return (
        <Selector
          key={guild.id}
          clickEvent={() => handleClick(guild.id)}
          message={guild.joined ? guild.name : `${guild.name} - Invite`}
          imageUrl={
            guild.icon
              ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
              : `https://i.imgur.com/t5JIZ1M.png`
          }
        />
      );
    });
  };

  const renderPayments = (payments: PaymentDto[]) => {
    if (discordConfig._id === discordConfig.paymentConfigId) {
      return payments.map((payment: PaymentDto, index) => {
        if (!payment.deletedPayment) {
          return (
            <Payment
              payment={payment}
              setPayment={setPayments}
              payments={payments}
              key={index}
            />
          );
        } else {
          return <div></div>;
        }
      });
    } else {
      return (
        <p>
          To edit payments go to the correct server settings or change the
          payment config to use your own payments.
        </p>
      );
    }
  };

  return (
    <HomeStyle>
      <Spinner
        loading={discordConfig.loading}
        message={'Loading Discord Config'}
      />
      <PageHeader
        title="LabMaker Discord Settings"
        subtitle={discordConfig.name}
      />
      <BasePageStyle>
        <SelectorContainer>{GenerateGuilds()}</SelectorContainer>
        <ComboContainer>
          <GeneralSettings
            config={discordConfig}
            parsedGuilds={parsedGuilds}
            changeEvent={handleChange}
          />
          <GeneralSettingContainer id="comboContainer">
            <h1>Payment</h1>
            <div>{renderPayments(payments)}</div>

            <CenterDiv>
              <CustomButton onClick={createPayment}>Add</CustomButton>
            </CenterDiv>
          </GeneralSettingContainer>
        </ComboContainer>

        <ButtonContainer>
          <CenterDiv>
            <CustomButton onClick={saveData}>Save</CustomButton>
          </CenterDiv>
        </ButtonContainer>
      </BasePageStyle>
    </HomeStyle>
  );
};

const ButtonContainer = styled.div`
  /* padding: 25px; */
  padding-top: 15px;

  button {
    margin-left: 35px;
  }
`;

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

const ComboContainer = styled.div`
  display: flex;
  margin-left: 5px;
  #comboContainer {
    margin-left: 15px;
  }
`;
