import { useState } from "react";
import PropTypes from "prop-types";
import { Sparkles } from "lucide-react";

import { roadmapsContent } from "../../../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  Badge,
  Button,
  Card,
  Input,
} from "../../../../../components/ui";

import styles from "./RoadmapGenerator.module.css";

function RoadmapGenerator({
  isGenerating,
  error,
  onGenerate,
}) {
  const { generator, validation, generation } =
    roadmapsContent;

  const [topic, setTopic] = useState("");
  const [topicError, setTopicError] = useState("");

  const validateTopic = () => {
    const normalizedTopic = topic.trim();

    if (!normalizedTopic) {
      return validation.topicRequired;
    }

    if (normalizedTopic.length < 3) {
      return validation.topicMinimum;
    }

    if (normalizedTopic.length > 100) {
      return validation.topicMaximum;
    }

    return "";
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationError = validateTopic();

    if (validationError) {
      setTopicError(validationError);
      return;
    }

    setTopicError("");
    onGenerate(topic.trim());
  };

  const handleTopicChange = (event) => {
    setTopic(event.target.value);

    if (topicError) {
      setTopicError("");
    }
  };

  const handleExampleClick = (example) => {
    setTopic(example);
    setTopicError("");
  };

  return (
    <Card className={styles.generator}>
      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className={styles.inputArea}>
          <Input
            label={generator.label}
            name={generator.name}
            value={topic}
            placeholder={generator.placeholder}
            icon={generator.icon}
            error={topicError}
            disabled={isGenerating}
            maxLength={100}
            required
            onChange={handleTopicChange}
          />

          <Button
            type="submit"
            icon={Sparkles}
            disabled={isGenerating}
          >
            {isGenerating
              ? generator.generatingButton
              : generator.button}
          </Button>
        </div>

        <div className={styles.examples}>
          <span>{generator.examplesLabel}:</span>

          <div className={styles.exampleList}>
            {generator.examples.map((example) => (
              <button
                key={example}
                type="button"
                disabled={isGenerating}
                onClick={() =>
                  handleExampleClick(example)
                }
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        {isGenerating && (
          <div
            className={styles.loading}
            role="status"
            aria-live="polite"
          >
            <span className={styles.spinner} />

            <div>
              <strong>
                {generation.loadingTitle}
              </strong>

              <p>
                {generation.loadingDescription}
              </p>
            </div>
          </div>
        )}

        {error && (
          <div
            className={styles.error}
            role="alert"
          >
            {error}
          </div>
        )}
      </form>
    </Card>
  );
}

RoadmapGenerator.propTypes = {
  isGenerating: PropTypes.bool.isRequired,
  error: PropTypes.string,
  onGenerate: PropTypes.func.isRequired,
};

export default RoadmapGenerator;