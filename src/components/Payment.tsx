import { InputBox } from '../components/Inputs/InputBox';
import styled from 'styled-components';
import { Payments } from '../utils/APIHelper';

interface PaymentProps {
  payment: any;
  payments: any;
  setPayments: any;
}
enum InputType {
  Name,
  Value,
  Type,
}

export const Payment = ({ payments, payment, setPayments }: PaymentProps) => {
  const removeItem = () => {
    setPayments(payments.filter((item: any) => item !== payment));
  };

  const updatePayments = (e: any, inputType: InputType) => {
    if (inputType == InputType.Name) {
      payment.name = e.target.value;
    } else if (inputType == InputType.Value) {
      payment.value = e.target.value;
    } else if (inputType == InputType.Type) {
      payment.type = e.target.value;
    }

    setPayments(
      payments.map((item: Payments) => {
        if (item.id == payment.id) {
          return payment;
        } else {
          return item;
        }
      })
    );
  };

  return (
    <PaymentStyle>
      <InputBox
        message="Name"
        value={payment.name}
        onChange={(e: any) => updatePayments(e, InputType.Name)}
      />
      <InputBox
        message="Value"
        value={payment.value}
        onChange={(e: any) => updatePayments(e, InputType.Value)}
      />
      <InputBox
        message="Type"
        value={payment.type}
        onChange={(e: any) => updatePayments(e, InputType.Type)}
      />

      <button onClick={removeItem}>X</button>
    </PaymentStyle>
  );
};

const PaymentStyle = styled.div`
  display: flex;

  padding-right: 20px;
  div {
    margin-right: 5px;

    span {
    }
  }

  button {
    color: white;
    border: none;
    border-radius: 15%;
    background-color: #8d121c;
    height: 25px;
    width: 15px;
    padding-right: 10px;
    padding-left: 3px;
    margin-top: 27px;
    transition: all 0.6s ease-in-out;
  }

  button:hover {
    cursor: pointer;
    background-color: #e32132;
    transition: all 0.3s ease-in-out;
  }
`;
