import React from "react";
import Layout from "./Layout";
import Welcome from "../components/Welcome";

const Dashboard = () => {
  return (
    <Layout>
        <div className="mt-2">
            <Welcome/>
        </div>
    </Layout>
  );
};

export default Dashboard;
