import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Dashboard.css";
import "react-toastify/dist/ReactToastify.css";
import Recents from "../../components/Recents/Recents";
import Drafts from "../../components/Drafts/Drafts";
import GradientBtn from "../../components/ButtonsE/GradientBtn";

function Dashboard() {
  return (
    <div id="dashboard">
      <div className="left">
        <section id="side-panel">
          <div className="panel-container">
            <Link className="panel-nav-link" to="editor">
              <GradientBtn text={"New Blog"} icon={"add"} />
            </Link>
            <br />
            <hr width="100%" color="#BAB8DD" />
            <div className="navigation">
              <NavLink
                activeClassName="active"
                to="/"
                className="panel-nav-link"
              >
                Dashboard
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/Home"
                className="panel-nav-link"
              >
                Home
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/Services"
                className="panel-nav-link"
              >
                Services
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/Blogs"
                className="panel-nav-link"
              >
                Blogs
              </NavLink>
            </div>
            <hr width="100%" color="#BAB8DD" />
            <div className="options">
              <NavLink
                activeClassName="active"
                to="/Account-settings"
                className="panel-nav-link"
              >
                <span className="material-symbols-outlined btn-icon">
                  settings
                </span>
                <span>Account Settings</span>
              </NavLink>
              <NavLink
                activeClassName="active"
                to="/Account-settings"
                className="panel-nav-link"
              >
                <span className="material-symbols-outlined btn-icon">
                  logout
                </span>
                <span>log Out</span>
              </NavLink>
            </div>
          </div>
        </section>
      </div>
      <div className="right">
        <Recents />
        <Drafts />
      </div>
    </div>
  );
}

export default Dashboard;
