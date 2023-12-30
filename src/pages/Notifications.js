import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showLoading , hideLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";

function Notifications() {

 const {user} = useSelector((state) => state.user);
 const navigate = useNavigate();
 const dispatch = useDispatch();

 const markAllAsSeen= async()=>{
    try {
        dispatch(showLoading());
        const response = await axios.post('/api/user/mark-all-notifications-as-seen', {userId : user._id});
        dispatch(hideLoading());
        if(response.data.success){  
        console.log(response.data.message);
         toast.success(response.data.message);
        }else {
          toast.error(response.data.message);
  
        }
      } catch (error) {
        dispatch(hideLoading());
        toast.error('something went wrong!');
      }

 }
  return (
    <Layout>
      <h1 className="page-title"> Notify </h1>
      <Tabs>
        <Tabs.TabPane tab="Unseen" key={1}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor" onClick={() => markAllAsSeen}> Mark all as seen</h1>
          </div>

          {user.unseenNotifications.map((notification) => 
           <div className="card p-2" onClick={() => navigate(notification.onClickPath)}>
            <div className="card-text">{notification.message}</div>
           </div>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={2}>
          <div className="d-flex justify-content-end">
            <h1 className="anchor"> Delete All</h1>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notifications;
