import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { GiAutoRepair } from "react-icons/gi";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector , useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";

function Login() {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async(values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/login',values);
      dispatch(hideLoading());
      if(response.data.success){
      console.log(response.data.message);
       toast.success(response.data.message);
       toast("Redirecting to Home page");
       localStorage.setItem("token",response.data.data);
       navigate("/");
      }else {
        toast.error(response.data.message);

      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong!');
    }
  };

  
  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <h1 className="card-title"> Auto Repair <GiAutoRepair /></h1>
        <Form layout="vertical" onFinish={onFinish}>
           <Form.Item label="Email" name="email">
            <Input placeholder="E-mail" type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          <Button className="primary-button primary-button-black my-2" htmlType="submit">Login</Button>
          <Link to="/register" className="anchor mt-2">
            CLİCK HERE TO REGİSTER
          </Link>
        </Form>

       
      </div>
    </div>
  );
}

export default Login;
