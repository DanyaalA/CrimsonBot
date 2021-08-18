import { InputBox } from '../components/Inputs/InputBox';
import styled from 'styled-components';
import { Payments } from '../utils/APIHelper';
import { PaymentDto } from '../utils/data/types';

interface PaymentProps {
  payment: PaymentDto;
  payments: PaymentDto[];
  setPayments: any;
}
enum InputType {
  Name,
  Value,
  Type,
}

export const Payment = ({ payments, payment, setPayments }: PaymentProps) => {
  const removeItem = () => {
    payment.deletedPayment = true;

    const updatedPayments = payments.map((item: PaymentDto) => {
      if (item._id === payment._id) {
        payment.deletedPayment = true;
        return payment;
      } else {
        return item;
      }
    });

    setPayments(updatedPayments);
  };

  const updatePayments = (e: any, inputType: InputType) => {
    if (inputType === InputType.Name) {
      payment.name = e.target.value;
    } else if (inputType === InputType.Value) {
      payment.value = e.target.value;
    } else if (inputType === InputType.Type) {
      payment.type = e.target.value;
    }

    const updatedPayments = payments.map((item: PaymentDto) => {
      if (item._id === payment._id) {
        return payment;
      } else {
        return item;
      }
    });

    setPayments(updatedPayments);
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
