const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  name: '',
  phone: '',
};
const dataSlicer = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setData: (state, action) => {
      return { ...state, ...action.payload };
    },
    setDataInitialState: () => {
      return { ...initialState };
    },
  },
});
export const { setData, setDataInitialState } = dataSlicer.actions;
export const dataReducer = dataSlicer.reducer;
