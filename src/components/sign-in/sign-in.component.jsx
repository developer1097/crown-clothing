// import { ReactComponent } from '*.svg';
import React from 'react';
// import Name from '../../App';

import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../button/button.component';
import {auth, SignInWithGoogle} from '../../firebase/firebase.utils';

class SignIn extends React.Component{
  constructor(props){
    super(props);

    this.state={
      email:'',
      password:''
    }
  }

  handleSubmit =async event => {
    event.preventDefault();

    const {email,password} = this.state;

    try{
      await auth.signInWithEmailAndPassword(email,password);
      this.setState({ email:'', password:'' });
    }
    catch(error){
      console.log(error);
    }

    this.setState({ email:'' , password:'' })
  };

  handleChange = event => {
    const { value , name } = event.target;

    this.setState({[ name ]:value});
  };

  

  render(){
    return(
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign In with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput 
          name="email" 
          type="email"
          label="email"
          handleChange={this.handleChange}
          value={this.state.email} 
          required />

          <FormInput 
          type="password" 
          name="password"
          label="password"
          value={this.state.password} 
          handleChange={this.handleChange}
          required />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton onClick={SignInWithGoogle}  isGoogleSignIn>
              Sign In with Google</CustomButton>
          </div>

        </form>
      </div>
    )
  }
}

export default SignIn;