import { InputBox } from '../components/Inputs/InputBox';
import styled from 'styled-components';
import { PaymentDto } from '../utils/data/types';
import { useDispatch } from 'react-redux';
import { editPayment } from '../utils/slices/paymentSlice';

interface PaymentProps {
  payment: PaymentDto;
}
enum InputType {
  Name,
  Value,
  Type,
}

export const Payment = ({ payment }: PaymentProps) => {
  const dispatch = useDispatch();

  const updatePayments = (e: any, inputType: InputType) => {
    let newName = payment.name;
    let newValue = payment.value;
    let newType = payment.type;

    if (inputType === InputType.Name) {
      newName = e.target.value;
    } else if (inputType === InputType.Value) {
      newValue = e.target.value;
    } else if (inputType === InputType.Type) {
      newType = e.target.value;
    }

    dispatch(
      editPayment({ ...payment, name: newName, value: newValue, type: newType })
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

      <button
        onClick={() =>
          dispatch(editPayment({ ...payment, deletedPayment: true }))
        }
      >
        X
      </button>
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
