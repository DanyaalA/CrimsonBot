import { InputBox } from "../components/Inputs/InputBox";
import styled from "styled-components";
import { Payments } from "../utils/APIHelper";
import { v4 as uuidv4 } from "uuid";

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
`;
