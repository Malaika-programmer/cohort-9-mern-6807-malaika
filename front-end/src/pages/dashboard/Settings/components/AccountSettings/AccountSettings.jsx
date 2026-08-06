import { useState } from "react";

import {
  Card,
  Input,
  Button,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./AccountSettings.module.css";

function AccountSettings() {
  const [account, setAccount] = useState({
    username: "malaikaazam",
    email: "malaika@example.com",
    defaultDashboard: "Dashboard",
    autoSave: true,
    autoLogout: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setAccount((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const toggle = (key) => {
    setAccount((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow="Account"
        title="Account Settings"
        description="Manage your account preferences."
        align="left"
      />

      <Input
        label="Username"
        name="username"
        value={account.username}
        onChange={handleChange}
      />

      <Input
        label="Email"
        name="email"
        value={account.email}
        onChange={handleChange}
      />

      <div className={styles.switch}>
        <span>Auto Save</span>

        <Button
          variant={account.autoSave ? "primary" : "outline"}
          onClick={() => toggle("autoSave")}
        >
          {account.autoSave ? "Enabled" : "Disabled"}
        </Button>
      </div>

      <div className={styles.switch}>
        <span>Auto Logout</span>

        <Button
          variant={account.autoLogout ? "primary" : "outline"}
          onClick={() => toggle("autoLogout")}
        >
          {account.autoLogout ? "Enabled" : "Disabled"}
        </Button>
      </div>

      <Button>Save Changes</Button>
    </Card>
  );
}

export default AccountSettings;