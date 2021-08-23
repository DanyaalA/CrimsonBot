import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentDto } from 'labmaker-api-wrapper';

const loadingPayment: PaymentDto & { loading?: boolean } = {
  _id: '0',
  nodeId: '0',
  name: 'Loading Payments...',
  value: 'Loading...',
  type: 'Loading...',
  loading: true,
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    value: [loadingPayment],
  },
  reducers: {
    updatePayemnts: (state, action: PayloadAction<PaymentDto[]>) => {
      state.value = action.payload;
    },
    addPayment: (state, action: PayloadAction<PaymentDto>) => {
      state.value.push(action.payload);
    },
    removePayment: (state, action: PayloadAction<PaymentDto>) => {
      const index = state.value.findIndex((x) => x._id === action.payload._id);

      if (index > -1) {
        state.value.splice(index, 1);
      }
    },
    editPayment: (state, action: PayloadAction<PaymentDto>) => {
      const index = state.value.findIndex((x) => x._id === action.payload._id);

      if (index > -1) {
        state.value[index] = action.payload;
      }
    },
  },
});

export const { updatePayemnts, addPayment, removePayment, editPayment } =
  paymentsSlice.actions;
