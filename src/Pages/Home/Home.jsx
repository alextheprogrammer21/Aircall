import React, { useState, useEffect } from "react";
import Call from "../../Components/Call/Call.jsx";

import "./home.css";

const INITIAL_STATE = { list: {}, length: 0, error: null };

const parseCallDates = (calls) => {
  const list = {};

  if (calls.length > 0) {
    calls.map((card) => {
      const date = card.created_at.split("T")[0];

      if (list[date]) {
        list[date].push(card);
      } else {
        list[date] = [card];
      }
    });
  }
  return list;
};

const Home = () => {
  const [calls, setCalls] = useState(INITIAL_STATE);
  const [showArchived, setShowArchived] = useState(false);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(
      "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const list = parseCallDates(result);
        document.title = `(${result.length}) Aircall Phone`;
        setCalls({ list: list, length: result.length, error: null });
      })
      .catch((error) => {
        setCalls({
          length: 0,
          error: "Something went wrong while fetching your call history..",
        });
        console.error("Error:", error);
      });
  }, [refresh]);

  function updateCalls(result) {
    setRefresh(!refresh);
    // =    const date = result.created_at.split("T")[0];
    //     const updateValue = calls.list[date].find(({ id }) => id === result.id);
    //     updateValue.is_archived = result.is_archived;
    //     setCalls({ list: calls.list, length: calls.length, error: calls.error });
  }

  const dateMap = (list) => {
    const datesArr = [];
    for (const key in list) {
      datesArr.push(key);
    }
    return datesArr;
  };

  return (
    <main className="container-view">
      <section className="tabs">
        <button onClick={() => setShowArchived(false)}>Inbox</button>
        <button onClick={() => setShowArchived(true)}>Archived</button>
      </section>
      {calls.length > 0 ? (
        dateMap(calls.list).map((date, index) => {
          return (
            <div key={index}>
              <h1 className="date">{date}</h1>
              {calls.list[date].map((card) => {
                if (!showArchived && !card.is_archived) {
                  return (
                    <Call
                      key={card.id}
                      card={card}
                      updateCalls={(result) => updateCalls(result)}
                    />
                  );
                }
                if (showArchived && card.is_archived) {
                  return (
                    <Call
                      key={card.id}
                      card={card}
                      updateCalls={(result) => updateCalls(result)}
                    />
                  );
                }
              })}
            </div>
          );
        })
      ) : (
        <p>{!calls.error && "Your call history is empty!"}</p>
      )}
    </main>
  );
};

export default Home;
