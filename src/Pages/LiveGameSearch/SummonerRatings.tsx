import React from "react";

import RatingCard from "./RatingCard";
import { SummonerRating } from "../../Models/SummonerRating";

type SummonerRatingsProps = {
    ratings: SummonerRating[];
};

function SummonerRatings({ ratings }: SummonerRatingsProps) {
    return (
        <div style={{ display: "flex" }}>
            {ratings.map((x) => (
                <RatingCard {...x} />
            ))}
        </div>
    );
}

export default SummonerRatings;
