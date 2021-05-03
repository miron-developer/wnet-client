import styled from "styled-components"

const SToVoteActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
`;

const SToVoteVote = styled.div`
    padding: 10px;
    min-width: 10%;
    color: var(--onHoverColor);
    text-align: center;
    text-transform: uppercase;
    border-radius: 50px;
    background: rgba(0, 127, 199, 0.8);
    box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.25);
    transition: var(--transitionApp);
    cursor: pointer;

    &:hover {
        color: rgba(0, 127, 199, 0.8);
        background: var(--onHoverColor);
    }
`;

export default function GYourVote({voteTitles, toVote}) {
    return (
        <SToVoteActions>
            {voteTitles.map(
                (title, index) => <SToVoteVote key={title} onClick={()=>toVote(index)}>{title}</SToVoteVote>
            )}
        </SToVoteActions>
    )
}