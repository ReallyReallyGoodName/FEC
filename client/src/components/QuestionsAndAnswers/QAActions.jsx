import React from "react";

const QAActions = ({
  qa,
  votedQA,
  reportedQA,
  handleMarkQuestionHelpful,
  handleQuestionReport,
  setCurrentQuestionId,
  setShowAnswerForm,
}) => {
  return (
    <div className="question-actions">
      <h3>Q: {qa.question_body}</h3>
      <div className="actions">
        <span>
          Helpful?
          {votedQA.questions.includes(qa.question_id) ? (
            <span>Yes ({qa.question_helpfulness})</span>
          ) : (
            <a
              className="link"
              onClick={() => handleMarkQuestionHelpful(qa.question_id)}
            >
              Yes ({qa.question_helpfulness})
            </a>
          )}
        </span>
        {reportedQA.questions.includes(qa.question_id) ? (
          <span>Reported </span>
        ) : (
          <a
            className="link"
            onClick={() => handleQuestionReport(qa.question_id)}
          >
            Report
          </a>
        )}

        <a
          className="link"
          onClick={() => {
            setCurrentQuestionId(qa.question_id);
            setShowAnswerForm(true);
          }}
        >
          Add Answer
        </a>
      </div>
    </div>
  );
};

export default QAActions;