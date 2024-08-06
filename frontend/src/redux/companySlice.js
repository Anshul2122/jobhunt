import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:"companyId",
    initialState:{
      companies:[],
      singleCompany:null,
      searchCompanyByText:"",
    },
    reducers:{
      // actions :
      setCompanies: (state, action) => {
        state.allCompanys = action.payload;
      },
      setSingleCompany: (state, action) => {
        state.singleCompany = action.payload;
      },
      setSearchCompanyByText: (state, action) => {
        state.searchCompanyByText = action.payload;
      }
    }
});

export const {setSingleCompany, setCompanies, setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;