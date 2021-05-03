import styled from "styled-components";

const SVotesVote = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0;

    &>div {
        margin: 5px;
    }
`;

const SVotesCountWrapper = styled.div`
    width: 100%;
    box-shadow: var(--boxShadow);
    border-radius: 50px;
`;

const SVotesVoteCount = styled.div`
    width: ${props => props.width};
    text-align: center;
    color: var(--onHoverColor);
    background: ${props => props.isVoted ? 'linear-gradient(90deg, #150288 0%, rgba(28, 5, 167, 0.5) 100%)' : '#000000'};
    border-radius: 50px;
    box-shadow: var(--boxShadow);
`;

const SVotesVoteTitle = styled.div`
    width: 20%;
    color: #000000;
    text-transform: uppercase;
    font-weight: bold;
    text-align: right;
`;

const SVotePercent = styled.div`
    width: 10%;
`;

const GVote = ({index, title, count, percent, myVote}) => {
    const isVoted = myVote === index;

    return (
        <SVotesVote>
            <SVotesVoteTitle>{title}:</SVotesVoteTitle>
            <SVotesCountWrapper>
                <SVotesVoteCount width={percent + "%"} isVoted={isVoted}>{count}</SVotesVoteCount>
            </SVotesCountWrapper>
            <SVotePercent>{percent}%</SVotePercent>
        </SVotesVote>
    )
}

export default function GVotes({voteTitles, votes, votePercents, myVote}) {
    return voteTitles.map(
        (title, index) => 
        <GVote key={title} index={index} title={title} count={votes[index].count} percent={votePercents[index]} myVote={myVote} />
    );
}