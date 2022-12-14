import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";
import { AppContext } from "./../../App";
import { getAuthData } from "../../services/auth/auth";
import { clearLocalStorage } from "./../../services/auth/auth";

const Layout = ({ children }) => {
  const history = useHistory();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AppContext);
  const { user } = getAuthData();

  const sidebarItemList = [
    {
      id: 1,
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          version="1.1"
          viewBox="0 0 16 16"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M6 1h10v2h-10v-2zM6 7h10v2h-10v-2zM6 13h10v2h-10v-2zM0 2c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM0 8c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2zM0 14c0-1.105 0.895-2 2-2s2 0.895 2 2c0 1.105-0.895 2-2 2s-2-0.895-2-2z"></path>
        </svg>
      ),
      title: "Statistics/Report",
      permission: ["role_admin", "role_test123"],
      url: "/",
    },
    {
      id: 2,
      icon: (
        <svg
          stroke="currentColor"
          fill="currentColor"
          stroke-width="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h3v3.767L13.277 18H20c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm0 14h-7.277L9 18.233V16H4V4h16v12z"></path>
          <path d="M7 7h10v2H7zm0 4h7v2H7z"></path>
        </svg>
      ),
      title: "Message Tracking",
      permission: ["role_admin"],
      url: "/message-tracking",
    },
  ];

  const handleLogout = () => {
    clearLocalStorage();
    history.push("/");
  };

  return (
    <div className="h-screen w-screen layout-container">
      <div
        className={`h-full w-full flex ${
          isSidebarOpen ? "expanded" : "collpsed"
        }`}
      >
        {/* sidebar */}
        <div className={`h-full left-container py-10`}>
          <div className="flex items-center p-3">
            {isSidebarOpen ? (
              <svg
                onClick={() => setIsSidebarOpen(false)}
                className="text-lg font-bold cursor-pointer text-white"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 0 0 0 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
              </svg>
            ) : (
              <svg
                onClick={() => setIsSidebarOpen(true)}
                className="text-lg font-bold cursor-pointer text-white"
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
              </svg>
            )}
          </div>
          {sidebarItemList.map(
            (item) =>
              item.permission.filter((inner) => user.userRole.includes(inner))
                .length > 0 && (
                <Link
                  to={item.url}
                  className={`sidebar-item flex items-center text-white hover:bg-[#EAA273] cursor-pointer p-3 text-lg ${
                    history.location.pathname === item.url ? "bg-[#EAA273]" : ""
                  }`}
                >
                  {item.icon}
                  {isSidebarOpen && <p className="ml-2">{item.title}</p>}
                </Link>
              )
          )}
        </div>
        <div className={`h-full right-container`}>
          <div className="w-full h-[60px] shadow-md flex align-items justify-end pr-10">
            <button
              onClick={handleLogout}
              className="bg-[#F05D23] hover:bg-[#EAA273] py-2 px-6 rounded-md h-[40px] my-auto mr-5 text-white font-bold"
            >
              Logout
            </button>
            <div className="flex items-center">
              <p className="text-lg cursor-pointer">EN</p>
              <p className="ml-2 text-lg cursor-pointer">DE</p>
            </div>
          </div>
          <div className="main-content overflow-auto p-10 h-[90vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
