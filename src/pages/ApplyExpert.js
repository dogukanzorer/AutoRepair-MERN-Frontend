import React from "react";
import Layout from "../components/Layout";
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApplyExpert() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-expert-account",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        console.log(response.data.message);
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong!");
    }
  };

  return (
    <Layout>
      <h1 className="page-title"> Apply Expert </h1>
      <hr />

      <Form layout="vertical" onFinish={onFinish}>
        <h1 className="card-title mt-3"> Personal Information </h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="First Name"
              name="firstName"
              rules={[{ required: true }]}
            >
              <Input placeholder="First Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Last Name"
              name="lastName"
              rules={[{ required: true }]}
            >
              <Input placeholder="Last Name"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="E-Mail"
              name="email"
              rules={[{ required: true }]}
            >
              <Input placeholder="E-mail"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Website"
              name="website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Website"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Address"
              name="adress"
              rules={[{ required: true }]}
            >
              <Input placeholder="Adress"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true }]}
            >
              <Input placeholder="phone Number"></Input>
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h1 className="card-title mt-3"> Professional Information </h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Specialization"
              name="specialization"
              rules={[{ required: true }]}
            >
              <Input placeholder="specialization"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Experience"
              name="experience"
              rules={[{ required: true }]}
            >
              <Input placeholder="experience" type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Fee Per Cunsultation"
              name="feePerCunsultation"
              rules={[{ required: true }]}
            >
              <Input placeholder="feePerCunsultation" type="number"></Input>
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item
              required
              label="Timings"
              name="timings"
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker></TimePicker.RangePicker>
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex">
          <Button
            className="primary-button primary-button-blue"
            htmlType="submit"
          >
            Submit
          </Button>
        </div>
      </Form>
    </Layout>
  );
}

export default ApplyExpert;
