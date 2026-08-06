import { useState } from "react";

import {
  Card,
  SectionHeading,
  Button,
} from "../../../../../components/ui";

import styles from "./SecuritySettings.module.css";

function SecuritySettings() {
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    trustedDevices: true,
    autoLogout: false,
    passwordReminder: true,
  });

  const toggle = (key) => {
    setSecurity((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));

    /*
      Backend

      await settingsService.updateSecurity({
          [key]: !security[key]
      });

    */
  };

  const options = [
    {
      key: "twoFactor",
      title: "Two Factor Authentication",
      description:
        "Increase your account security using OTP verification.",
    },

    {
      key: "loginAlerts",
      title: "Login Alerts",
      description:
        "Receive alerts whenever a new login is detected.",
    },

    {
      key: "trustedDevices",
      title: "Trusted Devices",
      description:
        "Remember trusted devices after successful login.",
    },

    {
      key: "autoLogout",
      title: "Auto Logout",
      description:
        "Automatically logout after inactivity.",
    },

    {
      key: "passwordReminder",
      title: "Password Expiry Reminder",
      description:
        "Receive reminders to update your password.",
    },
  ];

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow="Security"
        title="Security Preferences"
        description="Manage account security and login preferences."
        align="left"
      />

      {options.map((item) => (
        <div
          key={item.key}
          className={styles.row}
        >
          <div>
            <h4>{item.title}</h4>

            <p>{item.description}</p>
          </div>

          <Button
            variant={
              security[item.key]
                ? "primary"
                : "outline"
            }
            onClick={() =>
              toggle(item.key)
            }
          >
            {security[item.key]
              ? "Enabled"
              : "Disabled"}
          </Button>
        </div>
      ))}

      <div className={styles.sessions}>
        <Button variant="outline">
          View Active Sessions
        </Button>

        <Button variant="danger">
          Logout All Devices
        </Button>
      </div>
    </Card>
  );
}

export default SecuritySettings;