import { useState } from "react";

import PropTypes from "prop-types";
import {
  Plus,
  X,
} from "lucide-react";

import { profileContent } from "../../../../../Scripts/Contents/Dashboard/Profile";

import {
  Badge,
  Button,
  Card,
  Input,
  SectionHeading,
} from "../../../../../components/ui";

import styles from "./ProfileSkills.module.css";

function ProfileSkills({
  skills,
  onSave,
}) {
  const { skills: content } =
    profileContent;

  const [currentSkills, setCurrentSkills] =
    useState(skills);

  const [skillInput, setSkillInput] =
    useState("");

  const [error, setError] =
    useState("");

  const handleAddSkill = () => {
    const normalizedSkill =
      skillInput.trim();

    if (!normalizedSkill) {
      setError(
        content.requiredMessage,
      );
      return;
    }

    const skillAlreadyExists =
      currentSkills.some(
        (skill) =>
          skill.toLowerCase() ===
          normalizedSkill.toLowerCase(),
      );

    if (skillAlreadyExists) {
      setError(
        content.duplicateMessage,
      );
      return;
    }

    if (
      currentSkills.length >=
      content.maximumSkills
    ) {
      setError(
        content.maximumMessage,
      );
      return;
    }

    const updatedSkills = [
      ...currentSkills,
      normalizedSkill,
    ];

    setCurrentSkills(updatedSkills);
    setSkillInput("");
    setError("");
    onSave(updatedSkills);
  };

  const handleRemoveSkill = (
    skillToRemove,
  ) => {
    const updatedSkills =
      currentSkills.filter(
        (skill) =>
          skill !== skillToRemove,
      );

    setCurrentSkills(updatedSkills);
    setError("");
    onSave(updatedSkills);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className={styles.card}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
        align="left"
      />

      <div className={styles.inputRow}>
        <div className={styles.input}>
          <Input
            label={content.inputLabel}
            name="skill"
            value={skillInput}
            placeholder={
              content.inputPlaceholder
            }
            error={error}
            onKeyDown={handleKeyDown}
            onChange={(event) => {
              setSkillInput(
                event.target.value,
              );

              if (error) {
                setError("");
              }
            }}
          />
        </div>

        <Button
          type="button"
          icon={Plus}
          onClick={handleAddSkill}
        >
          {content.addButton}
        </Button>
      </div>

      <div className={styles.skills}>
        {currentSkills.map((skill) => (
          <Badge
            key={skill}
            variant="primary"
            className={styles.skill}
          >
            <span>{skill}</span>

            <button
              type="button"
              aria-label={`${content.removeLabel}: ${skill}`}
              onClick={() =>
                handleRemoveSkill(skill)
              }
            >
              <X aria-hidden="true" />
            </button>
          </Badge>
        ))}
      </div>

      <div className={styles.counter}>
        {currentSkills.length}/
        {content.maximumSkills}
      </div>
    </Card>
  );
}

ProfileSkills.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,

  onSave: PropTypes.func.isRequired,
};

export default ProfileSkills;