import React from "react";

import "./call.css";

const Call = ({ card, updateCalls }) => {
  const {
    call_type,
    created_at,
    direction,
    duration,
    from,
    id,
    is_archived,
    to,
    via,
  } = card;

  const updateArchive = () => {
    fetch(
      `https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_archived: !is_archived }),
      }
    )
      // .then((response) => response.json())
      .then((result) => {
        updateCalls(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <section className="card-container" onClick={updateArchive}>
      <span className="telephone-symbol">&#128222;</span>
      <span className="call-history">
        <p>{from}</p>
        <p className="via">
          {" "}
          tried to call on <strong>{via}</strong>
        </p>
      </span>
      <div className="time">
        {created_at.split("T")[1].split(".")[0]}
        <span className="am-pm">ToDo</span>
      </div>
    </section>
  );
};

export default Call;
