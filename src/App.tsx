import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import ProgressBar from "@ramonak/react-progress-bar";

const Parent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Spacing = styled.div`
    margin-right: 5px;
`;

function App() {
    const [summonerName, setSummonerName] = useState("");
    const [toxicRating, setToxicRating] = useState(0);

    const fetchToxicity = useCallback(() => {
        fetch(
            `${window.location.origin}/api/PlayerMeter?summonername=${summonerName}`
        )
            .then((response) => response.json())
            .then((result) => setToxicRating(result.rating));
    }, [summonerName]);

    return (
        <Parent>
            <div>
                <div>
                    <h2>Find out how toxic your friends are!</h2>
                </div>
                <div style={{ display: "flex" }}>
                    <Spacing>
                        <label htmlFor="summonerName">
                            Enter their summoner name here:
                        </label>
                    </Spacing>
                    <Spacing>
                        <input
                            type="text"
                            id="summonerName"
                            name="summonerName"
                            onChange={(e) => {
                                setSummonerName(e.target.value);
                                setToxicRating(0);
                            }}
                        />
                    </Spacing>
                    <button
                        style={{ width: "60px" }}
                        onClick={() => fetchToxicity()}
                    >
                        Go!
                    </button>
                </div>
                <div style={{ marginTop: "10px" }}>
                    <ProgressBar
                        completed={toxicRating || 0}
                        bgColor={
                            toxicRating < 30
                                ? "#03fc28"
                                : toxicRating < 60
                                ? "#0831ff"
                                : "#f51f07"
                        }
                        isLabelVisible={false}
                    />
                </div>
                {toxicRating >= 100 ? "Your toxicity is over 9000!" : null}
            </div>
        </Parent>
    );
}

export default App;
