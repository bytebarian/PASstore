const sstore = {
  state:{
      username:'',
      password:'',
      private_key:'',
      authed:false,
      show:false,
      msg:'Please wait ...',
      kt:''
  },
  mutations:{
      set_auth(state:any, auth:any){
          state.username = auth.username,
          state.password = auth.password,
          state.private_key = auth.private_key
          state.authed = true;
      }
  },
  getters:{
      address(state:any){
          if (state.kt) {
              return state.kt;
          }

          return localStorage.getItem('KTAddress');
      }
  }
};

export default sstore;
