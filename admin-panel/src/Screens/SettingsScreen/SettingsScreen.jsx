import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import Accounts from "../../Components/Accounts/Accounts";

function SettingsScreen() {
  return (
    <div>
      <div className="container">
        <h2>Settings</h2>
        <div className="mt-5">
          <Tabs>
            <TabList>
              <Tab>General Settings</Tab>
              <Tab>Accounts</Tab>
            </TabList>

            <TabPanel>
              <GeneralSettings />
            </TabPanel>
            <TabPanel>
              <Accounts />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default SettingsScreen;
