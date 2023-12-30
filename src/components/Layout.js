import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import { GiAutoRepair } from "react-icons/gi";
import { useSelector } from "react-redux";
import {  Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "appointments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Apply Expert",
      path: "/apply-expert",
      icon: "ri-tools-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-line",
    },
    {
      name: "Experts",
      path: "/experts",
      icon: "ri-tools-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const ar = <h1 className="ar-custom"> AR </h1>;
  const autoRepair = (
    <h1 className="ar-custom">
      {" "}
      Auto Repair <GiAutoRepair className="icon-custom" />
    </h1>
  );
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1>{collapsed ? ar : autoRepair}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  } `}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className={"ri-logout-circle-line"}></i>
              {!collapsed && <Link to="/login">Log out</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                class="ri-menu-2-fill header-action-icons"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                class="ri-close-fill header-action-icons"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-2">
              <Badge count={user?.unseenNotifications.length} onClick={() => navigate('/notifications')}>
                <i className="ri-notification-line header-action-icons px-3"></i>
              </Badge>
              <Link className="anchor mx-2 no-underline" to="/profile">
                {" "}
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
