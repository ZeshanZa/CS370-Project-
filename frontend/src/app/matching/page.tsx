"use client";

import React, { useState, useEffect } from "react";
import { Tab, Tabs } from "@mui/material";
import Layout from "../Layouts/Layout";
import MatchRequestsPageComponent from "../match-requests/MatchRequestsPageComponent";
import StartMatchingPageComponent from "../startMatching/StartMatchingPageComponent";
import MatchesPageComponent from "../matches/MatchesPageComponent";
import { useRouter } from "next/navigation";

function MatchingPage() {
  const [tabValue, setTabValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <Layout>
      <div className="w-full h-full">
        <Tabs
          centered
          value={tabValue}
          indicatorColor="primary"
          variant="fullWidth"
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setTabValue(newValue);
          }}
        >
          <Tab label="Find Matches" />
          <Tab label="Pending Matches" />
          <Tab label="Matched Profiles" />
        </Tabs>
        {tabValue == 0 ? (
          <div className="w-full h-full mt-10 flex justify-center flex-col">
            <StartMatchingPageComponent />
          </div>
        ) : (
          ""
        )}
        {tabValue == 1 ? (
          <div className="w-full h-full mt-10 flex justify-center flex-col">
            <MatchRequestsPageComponent />
          </div>
        ) : (
          ""
        )}
        {tabValue == 2 ? (
          <div className="w-full h-full mt-10 flex justify-center flex-col">
            <MatchesPageComponent />
          </div>
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export default MatchingPage;
