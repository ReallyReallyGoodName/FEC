import React from "react";
import { format } from "date-fns";

const AnswerEntry = ({ answer, handleMarkAnsHelpful, handleAnsReport, reportedQA }) => {
  return (
    <div className="answer">
      <p>A: {answer.body}</p>
      <div className="answer-info">
        <span>
          by
          {answer.answerer_name === "Seller" ? (
            <b>Seller</b>
          ) : (
            answer.answerer_name
          )}
          , {format(new Date(answer.date), "MM/dd/yyyy")}
        </span>
        <div className="actions">
          <span>
            Helpful?
            <a onClick={() => handleMarkAnsHelpful(answer.id)}>
              Yes ({answer.helpfulness})
            </a>
          </span>
          {reportedQA.answers.includes(answer.id) ? (
            <span>Reported</span>
          ) : (
            <a onClick={() => handleAnsReport(answer.id)}>Report</a>
          )}
        </div>
      </div>
      {answer.photos && answer.photos.length > 0 && (
        <div className="answer-photos">
          {answer.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Answer photo ${index + 1}`} className="thumbnail" />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerEntry;