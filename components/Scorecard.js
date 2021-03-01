import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faAward,
  faLightbulb,
  faCheck,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { EmptySquare } from "./common/ScoringGuide";

import ScoreLabel from "./common/ScoreLabel";

const HonorableMention = ({ honorableMentionData }) => (
  <div className="honorable-mention">
    <div className="d-flex flex-row align-items-center">
      <FontAwesomeIcon className="mr-2" icon={faAward} />
      <h3 className="m-0" style={{ fontSize: "1em" }}>
        Honorable Mention
      </h3>
    </div>

    <p className="card-body small m-0 pt-1">
      {honorableMentionData.description} (
      <a href={honorableMentionData.url} rel="noopener noreferrer">
        {honorableMentionData.text}
      </a>
      )
    </p>
  </div>
);

HonorableMention.propTypes = {
  honorableMentionData: PropTypes.shape({
    category_id: PropTypes.number,
    description: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

const InnovativePolicyIdea = ({ innovativePolicyIdeaData }) => (
  <div className="honorable-mention">
    <div className="d-flex flex-row align-items-center">
      <FontAwesomeIcon className="mr-2" icon={faLightbulb} />
      <h3 className="m-0" style={{ fontSize: "1em" }}>
        Innovative Policy Idea
      </h3>
    </div>

    <p className="card-body small m-0 pt-1">
      {innovativePolicyIdeaData.description} (
      <a href={innovativePolicyIdeaData.url} rel="noopener noreferrer">
        {innovativePolicyIdeaData.text}
      </a>
      )
    </p>
  </div>
);

InnovativePolicyIdea.propTypes = {
  innovativePolicyIdeaData: PropTypes.shape({
    category_id: PropTypes.number,
    description: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

const renderIcon = (implementsPolicy) => {
  switch (implementsPolicy) {
    case "yes":
      return <FontAwesomeIcon icon={faCheck} className="mr-2" />;
    case "maybe":
      return <FontAwesomeIcon icon={faQuestion} className="mr-2" />;
    case "no":
      return <EmptySquare />;
  }
};

const Policy = ({ policyData, score }) => (
  <p className="card-body small m-0 d-flex flex-row">
    {renderIcon(score.meets_criterion)}
    {policyData.title}
  </p>
);

Policy.propTypes = {
  policyData: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    adverse: PropTypes.bool,
  }),
  score: PropTypes.shape({
    meets_criterion: PropTypes.string,
  }),
};

const Category = ({ category, stateData }) => {
  const categoryScore =
    stateData.category_grades.find((c) => c.category_id === category.id) || {};
  const honorableMentionData =
    stateData.honorable_mentions.find((hm) => hm.category_id === category.id) ||
    null;
  const innovativePolicyIdeaData =
    stateData.innovative_policy_ideas.find(
      (ip) => ip.category_id === category.id
    ) || null;
  const modelPolicies = category.criteria.filter((c) => !c.adverse) || [];
  const adversePolicies = category.criteria.filter((c) => c.adverse) || [];
  const collapseId = `collapse-${category.id}`;
  const headingId = `heading-${category.id}`;

  return (
    <div
      className="category accordion-i"
      style={{ borderTop: "1px solid black" }}
    >
      <div
        id={headingId}
        className="pt-3 pb-3"
        type="button"
        data-toggle="collapse"
        data-target={`#${collapseId}`}
        aria-expanded="false"
        aria-controls={collapseId}
      >
        <h2
          className="m-0"
          style={{ textTransform: "uppercase", fontSize: "0.75em" }}
        >
          {category.title}
          <div className="float-right">
            <span className="mr-3">
              <ScoreLabel score={categoryScore.grade} type="category" />
            </span>
            <FontAwesomeIcon className="fa-2x" icon={faCaretDown} />
          </div>
        </h2>
      </div>
      <div
        id={collapseId}
        className="collapse"
        aria-labelledby={headingId}
        data-parent="#scorecard"
      >
        <div className="p-0 pb-3 card-body small font-italic">
          {category.help_text}
        </div>
        {honorableMentionData ? (
          <HonorableMention honorableMentionData={honorableMentionData} />
        ) : null}
        {innovativePolicyIdeaData ? (
          <InnovativePolicyIdea
            innovativePolicyIdeaData={innovativePolicyIdeaData}
          />
        ) : null}
        <div className="model-policies p-0 card-body small">
          <h3 className="m-0" style={{ fontSize: "1em" }}>
            Model policy checklist (these support survivors):
          </h3>
          {modelPolicies.map((policy) => {
            const score = stateData.criterion_scores.find(
              (s) => s.criterion_id === policy.id
            );
            return <Policy policyData={policy} score={score} key={policy.id} />;
          })}
        </div>

        <div className="adverse-policies p-0 card-body small">
          <h3 className="m-0" style={{ fontSize: "1em" }}>
            Adverse policy checklist (these harm survivors):
          </h3>
          {adversePolicies.map((policy) => {
            const score = stateData.criterion_scores.find(
              (s) => s.criterion_id === policy.id
            );
            return <Policy policyData={policy} score={score} key={policy.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    help_text: PropTypes.string,
    criteria: PropTypes.arrayOf(
      PropTypes.shape({
        adverse: PropTypes.bool,
        title: PropTypes.string,
      })
    ),
  }),
  stateData: PropTypes.shape({
    category_grades: PropTypes.arrayOf(
      PropTypes.shape({
        category_id: PropTypes.number,
        grade: PropTypes.number,
      })
    ),
    code: PropTypes.string,
    criterion_scores: PropTypes.arrayOf(
      PropTypes.shape({
        criterion_id: PropTypes.number,
        meets_criterion: PropTypes.string, // "yes", "no", "maybe"
      })
    ),
    grade: PropTypes.shape({
      grade: PropTypes.number,
    }),
    honorable_mentions: PropTypes.array,
    innovative_policy_ideas: PropTypes.array,
    name: PropTypes.string,
    resource_links: PropTypes.array,
  }),
};

const Scorecard = ({ categories, stateData }) => (
  <div className="scorecard-container">
    <div className="overall mt-5 mb-3">
      <span className="label mr-2">Overall:</span>
      <ScoreLabel score={stateData.grade.grade} />
    </div>
    <p>
      <em>This state prioritizes...</em>
    </p>
    <div className="scorecard accordion" id="scorecard">
      {categories.map((category) => (
        <Category category={category} key={category.id} stateData={stateData} />
      ))}
    </div>
  </div>
);

Scorecard.propTypes = {
  categories: PropTypes.arrayOf(Category.propTypes.category),
  overallScore: PropTypes.number,
  stateData: Category.propTypes.stateData,
};

export default Scorecard;
