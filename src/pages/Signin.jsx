import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import {auth ,provider } from "../firebase"

import { signInWithPopup } from "firebase/auth";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {
  const [email,setEmail]=useState();
  const [password, setPassword]=useState();
  const [name,setName]=useState();
  const dispatch = useDispatch();
  const handleLogin=async(e)=>{
    e.preventDefault();
    dispatch(loginStart())
    try{
      const res = await axios.post("/auth/signin",{name,password},{withCredentials:true});
      dispatch(loginSuccess(res.data))
      
    }catch(err){
      dispatch(loginFailure())
    }
  }
  const signInWithGoogle=()=>{
    loginStart();
    signInWithPopup(auth ,provider).then((result)=>{
      console.log(result.user.photoURL)
      axios.post("/auth/google",{
        name:result.user.displayName,
        email:result.user.email,
        img:result.user.photoURL,
      }).then((res)=>{
        console.log(res.data);
        dispatch(loginSuccess(res.data));
      })

    }).catch((err)=>{
      dispatch(loginFailure());
    })
  }
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <SubTitle>to continue to </SubTitle>
        <Input placeholder="username" onChange={(e)=>setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick ={signInWithGoogle}>Sign In With Google</Button>
        <Title>or</Title>
        <Input placeholder="username" />
        <Input placeholder="email" />
        <Input type="password" placeholder="password" />
        <Button>Sign up</Button>
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default SignIn;