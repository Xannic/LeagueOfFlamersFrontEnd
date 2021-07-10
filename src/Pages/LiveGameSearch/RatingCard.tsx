import React from "react";
import styled from "styled-components";

type RatingCardProps = {
    summonerName: string;
    rating: number;
};

const CardWrapper = styled.div`
    width: 250px;
    height: 100px;
`;

function RatingCard({ summonerName, rating }: RatingCardProps) {
    return (
        <CardWrapper>
            <div>
                <b>Name:</b> {summonerName}
            </div>
            <div>
                <b>Rating:</b> {rating}
            </div>
        </CardWrapper>
    );
}

export default RatingCard;
