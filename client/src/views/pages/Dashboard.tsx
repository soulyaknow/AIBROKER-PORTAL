import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* 1st Section - Dashboard Overview */}
        <div className="h-[30vh] flex flex-col" id="dashboard-bg">
          {/* Top Section - Market Trends */}
          <div className="flex-grow p-4 flex items-center justify-center text-white text-center">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full max-w-2xl">
              {[
                {
                  img: "/Market Trends-Icon.svg",
                  text: "Market Trends",
                  value: "5.2% Avg.",
                },
                {
                  img: "/Market Shift-Icon.svg",
                  text: "Market Shift",
                  value: "+0.3%",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] p-6 rounded-xl bg-white flex h-12 items-center justify-between w-full"
                >
                  <img src={item.img} alt={item.text} className="h-10 w-10" />
                  <h3 className="text-black font-bold text-[16px] flex-1 text-center">
                    {item.text}
                  </h3>
                  <span className="bg-gradient-to-r from-pink-300 to-violet-600 text-2xl bg-clip-text text-transparent font-bold">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section - Fixed at the bottom */}
          <div
            className="h-24 flex items-center justify-center text-white text-center p-4 w-full"
            id="dashboard-header-bg"
          >
            <div className="flex flex-col items-center space-y-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-300 to-violet-600 bg-clip-text text-transparent">
                Your Day, Simplified
              </h2>
              <p className="text-2xl text-white">
                AI-Powered Insights at Your Fingertips
              </p>
            </div>
          </div>
        </div>

        {/* 2nd Section - Application Insights */}
        <div className="flex-1 bg-white p-6 sm:p-8 md:p-10 flex flex-col justify-center items-center">
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 w-full max-w-6xl">
            {[
              { img: "/Pie-Chart-Icon.svg", text: "Application Summary" },
              { img: "/Bar-Graph-Icon.svg", text: "Pipeline Value" },
              { img: "/Cards-Icon.svg", text: "Quick Stats" },
            ].map((item, index) => (
              <div
                key={index}
                className="border-2 border-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.3)] rounded-lg flex flex-col justify-center items-center h-[50vh] p-6"
              >
                <img
                  src={item.img}
                  alt="icon"
                  className="h-60 w-60 px-4 pt-4"
                />
                <div className="w-full flex flex-col items-center pt-2">
                  <h2 className="text-violet-900 font-bold text-3xl uppercase text-center max-w-xs break-words">
                    {item.text}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;
