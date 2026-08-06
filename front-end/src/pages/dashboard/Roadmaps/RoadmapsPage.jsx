import { useMemo, useState } from "react";

import {
  roadmapTopicEnhancements,
  roadmapsContent,
} from "../../../Scripts/Contents/Dashboard/Roadmaps";

import {
  RoadmapEmptyState,
  RoadmapGenerator,
  RoadmapHeader,
  RoadmapOverview,
  SavedRoadmaps,
} from "./components";

import styles from "./RoadmapsPage.module.css";

function normalizeTopicKey(topic) {
  return topic.trim().toLowerCase();
}

function createTopics(baseTopics, enhancedTopics = []) {
  const topics = [...enhancedTopics, ...baseTopics];

  return [...new Set(topics)].slice(0, 6).map(
    (topic, index) => ({
      id: `topic-${index + 1}`,
      title: topic,
      isCompleted: false,
    }),
  );
}

function createModules(
  levelKey,
  templateModules,
  enhancedTopics,
) {
  return templateModules.map((module, index) => ({
    ...module,
    id: `${levelKey}-${module.id}-${Date.now()}-${index}`,
    topics: createTopics(
      module.topics,
      index === 0 ? enhancedTopics : [],
    ),
  }));
}

function createMockRoadmap(topic) {
  const topicKey = normalizeTopicKey(topic);
  const enhancement =
    roadmapTopicEnhancements[topicKey];

  const beginnerTopics =
    enhancement?.beginner ?? [];

  const intermediateTopics =
    enhancement?.intermediate ?? [];

  const advancedTopics =
    enhancement?.advanced ?? [];

  const { mockTemplate } = roadmapsContent;

  return {
    id: Date.now(),
    topic,
    title: `${topic} Learning Roadmap`,
    overview:
      `A structured learning path for ${topic}, covering foundations, practical implementation and advanced professional skills.`,
    estimatedDuration: "Beginner to advanced",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSaved: false,

    levels: [
      {
        id: "beginner",
        ...roadmapsContent.levels.beginner,
        modules: createModules(
          "beginner",
          mockTemplate.beginnerModules,
          beginnerTopics,
        ),
      },

      {
        id: "intermediate",
        ...roadmapsContent.levels.intermediate,
        modules: createModules(
          "intermediate",
          mockTemplate.intermediateModules,
          intermediateTopics,
        ),
      },

      {
        id: "advanced",
        ...roadmapsContent.levels.advanced,
        modules: createModules(
          "advanced",
          mockTemplate.advancedModules,
          advancedTopics,
        ),
      },
    ],
  };
}

function getRoadmapProgress(roadmap) {
  if (!roadmap) {
    return {
      completed: 0,
      total: 0,
      percentage: 0,
    };
  }

  const topics = roadmap.levels.flatMap((level) =>
    level.modules.flatMap((module) => module.topics),
  );

  const completed = topics.filter(
    (topic) => topic.isCompleted,
  ).length;

  const percentage =
    topics.length > 0
      ? Math.round((completed / topics.length) * 100)
      : 0;

  return {
    completed,
    total: topics.length,
    percentage,
  };
}

function RoadmapsPage() {
  const [generatedRoadmap, setGeneratedRoadmap] =
    useState(null);

  const [savedRoadmaps, setSavedRoadmaps] =
    useState([]);

  const [isGenerating, setIsGenerating] =
    useState(false);

  const [generationError, setGenerationError] =
    useState("");

  const roadmapProgress = useMemo(
    () => getRoadmapProgress(generatedRoadmap),
    [generatedRoadmap],
  );

  const handleGenerateRoadmap = async (topic) => {
    if (isGenerating) {
      return;
    }

    setIsGenerating(true);
    setGenerationError("");

    try {
      /*
       * Backend integration:
       *
       * const response =
       *   await roadmapService.generateRoadmap({
       *     topic,
       *   });
       *
       * setGeneratedRoadmap(response.data);
       */

      await new Promise((resolve) => {
        window.setTimeout(resolve, 900);
      });

      const roadmap = createMockRoadmap(topic);

      setGeneratedRoadmap(roadmap);
    } catch (error) {
      setGenerationError(
        error?.response?.data?.message ??
          roadmapsContent.generation.errorMessage,
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleTopic = ({
    levelId,
    moduleId,
    topicId,
  }) => {
    setGeneratedRoadmap((currentRoadmap) => {
      if (!currentRoadmap) {
        return currentRoadmap;
      }

      return {
        ...currentRoadmap,
        updatedAt: new Date().toISOString(),

        levels: currentRoadmap.levels.map((level) =>
          level.id === levelId
            ? {
                ...level,

                modules: level.modules.map((module) =>
                  module.id === moduleId
                    ? {
                        ...module,

                        topics: module.topics.map(
                          (topic) =>
                            topic.id === topicId
                              ? {
                                  ...topic,
                                  isCompleted:
                                    !topic.isCompleted,
                                }
                              : topic,
                        ),
                      }
                    : module,
                ),
              }
            : level,
        ),
      };
    });
  };

  const handleSaveRoadmap = () => {
    if (!generatedRoadmap) {
      return;
    }

    const savedRoadmap = {
      ...generatedRoadmap,
      isSaved: true,
      updatedAt: new Date().toISOString(),
    };

    setGeneratedRoadmap(savedRoadmap);

    setSavedRoadmaps((currentRoadmaps) => {
      const roadmapAlreadyExists =
        currentRoadmaps.some(
          (roadmap) =>
            roadmap.id === savedRoadmap.id,
        );

      if (roadmapAlreadyExists) {
        return currentRoadmaps.map((roadmap) =>
          roadmap.id === savedRoadmap.id
            ? savedRoadmap
            : roadmap,
        );
      }

      return [savedRoadmap, ...currentRoadmaps];
    });

    /*
     * Backend:
     *
     * await roadmapService.saveRoadmap(
     *   savedRoadmap
     * );
     */
  };

  const handleOpenSavedRoadmap = (roadmap) => {
    setGeneratedRoadmap(roadmap);
  };

  const handleDeleteCurrentRoadmap = () => {
    if (!generatedRoadmap) {
      return;
    }

    const confirmed = window.confirm(
      roadmapsContent.deleteConfirmation.message,
    );

    if (!confirmed) {
      return;
    }

    const roadmapId = generatedRoadmap.id;

    setGeneratedRoadmap(null);

    setSavedRoadmaps((currentRoadmaps) =>
      currentRoadmaps.filter(
        (roadmap) => roadmap.id !== roadmapId,
      ),
    );

    /*
     * Backend:
     *
     * await roadmapService.deleteRoadmap(
     *   roadmapId
     * );
     */
  };

  const handleDeleteSavedRoadmap = (roadmapId) => {
    const confirmed = window.confirm(
      roadmapsContent.deleteConfirmation.message,
    );

    if (!confirmed) {
      return;
    }

    setSavedRoadmaps((currentRoadmaps) =>
      currentRoadmaps.filter(
        (roadmap) => roadmap.id !== roadmapId,
      ),
    );

    if (generatedRoadmap?.id === roadmapId) {
      setGeneratedRoadmap(null);
    }
  };

  const handleRegenerate = () => {
    if (!generatedRoadmap) {
      return;
    }

    handleGenerateRoadmap(generatedRoadmap.topic);
  };

  return (
    <main className={styles.roadmapsPage}>
      <RoadmapHeader />

      <RoadmapGenerator
        isGenerating={isGenerating}
        error={generationError}
        onGenerate={handleGenerateRoadmap}
      />

      {generatedRoadmap ? (
        <RoadmapOverview
          roadmap={generatedRoadmap}
          progress={roadmapProgress}
          onToggleTopic={handleToggleTopic}
          onSave={handleSaveRoadmap}
          onRegenerate={handleRegenerate}
          onDelete={handleDeleteCurrentRoadmap}
        />
      ) : (
        <RoadmapEmptyState />
      )}

      <SavedRoadmaps
        roadmaps={savedRoadmaps}
        onOpen={handleOpenSavedRoadmap}
        onDelete={handleDeleteSavedRoadmap}
      />
    </main>
  );
}

export default RoadmapsPage;