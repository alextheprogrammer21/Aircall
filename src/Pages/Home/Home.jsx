import React, { useState, useEffect } from "react";
import Call from "../../Components/Call/Call.jsx";
import { GridLoader } from "react-spinners";
import $ from "jquery";

import "./home.css";

const INITIAL_STATE = { list: {}, length: 0, error: null };
var callLength = 0;

const parseCallDates = (calls) => {
  const list = {};

  if (calls.length > 0) {
    calls.map((card) => {
      if (card.from) {
        callLength += 1;
        const date = card.created_at.split("T")[0];

        if (list[date]) {
          list[date].push(card);
        } else {
          list[date] = [card];
        }
      }
    });
  }
  return list;
};

const override = {
  position: "fixed",
  margin: "0 auto",
  borderColor: "red",
  top: "45%",
  left: "47%",
  // backgroundColor: "red",
};

const Home = () => {
  const [calls, setCalls] = useState(INITIAL_STATE);
  const [showArchived, setShowArchived] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    callLength = 0;
    fetch(
      "https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app/activities",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        const list = parseCallDates(result);
        document.title = `(${callLength}) Aircall Phone`;
        setCalls({ list: list, length: callLength, error: null });
        setLoading(false);
        $(".container").removeClass("overlay");
      })
      .catch((error) => {
        setLoading(false);
        $(".container").removeClass("overlay");
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
        <button
          className={showArchived ? "" : "selected"}
          onClick={() => setShowArchived(false)}
        >
          Inbox
        </button>
        <button
          className={showArchived ? "selected" : ""}
          onClick={() => setShowArchived(true)}
        >
          Archived
        </button>
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
                      setLoading={(bool) => setLoading(bool)}
                    />
                  );
                }
                if (showArchived && card.is_archived) {
                  return (
                    <Call
                      key={card.id}
                      card={card}
                      updateCalls={(result) => updateCalls(result)}
                      setLoading={(bool) => setLoading(bool)}
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
      <GridLoader
        color={"red"}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </main>
  );
};

export default Home;
