import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";

import { SummonerRating } from "../../Models/SummonerRating";
import SummonerRatings from "./SummonerRatings";

const Parent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: gray;
`;

const Spacing = styled.div`
    margin-right: 5px;
`;

function LiveGameSearch() {
    const [summonerName, setSummonerName] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [summonerRatings, setSummonerRatings] = useState<SummonerRating[]>(
        []
    );

    const fetchToxicity = useCallback(async () => {
        if (summonerName == null) return;
        const baseAddress = window.location.origin;
        // const baseAddress = "http://localhost:21452";
        const response = await fetch(
            `${baseAddress}/api/Toxicity/livegame/${summonerName}`
        );
        switch (response.status) {
            case 404:
                setError("NOT_FOUND");
                break;
            case 200:
                setError(null);
                break;
            case 500:
            default:
                setError("UNKNOWN_ERROR");
                break;
        }
        const summonerRatings = await response.json();
        setSummonerRatings(summonerRatings);
    }, [summonerName]);

    console.log(summonerRatings?.filter((x) => x.teamId === 100));

    console.log(summonerRatings?.filter((x) => x.teamId === 200));

    return (
        <Parent>
            <div>
                <div>
                    <h2>Find out how toxic the summoners in your game are!</h2>
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
                                setError(null);
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
                    {error == null ? (
                        <div
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            <div>
                                <SummonerRatings
                                    key={`${setSummonerName}100`}
                                    ratings={summonerRatings?.filter(
                                        (x) => x.teamId === 100
                                    )}
                                />
                            </div>
                            <div>
                                <SummonerRatings
                                    key={`${setSummonerName}200`}
                                    ratings={summonerRatings?.filter(
                                        (x) => x.teamId === 200
                                    )}
                                />
                            </div>
                        </div>
                    ) : error === "NOT_FOUND" ? (
                        `${summonerName} is not in game`
                    ) : (
                        `Fatal error occured`
                    )}
                </div>
            </div>
        </Parent>
    );
}

export default LiveGameSearch;
