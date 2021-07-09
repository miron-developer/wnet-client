import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { GetOne, POSTRequestWithParams } from 'functions/api';
import { CalculateRelativeDatetime, DateFromMilliseconds } from 'functions/content';
import { Notify } from 'common/app-notification/notification';
import Avatar from 'common/avatar/avatar';

import GEventInfo from 'common/event-item/event-info/info';
import GVotes from 'common/event-item/event-votes/votes';
import GYourVote from 'common/event-item/event-to-vote/vote';
import styled from 'styled-components';

const SEventInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: .5rem;
`;

const SEventUserInfo = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SEventUserName = styled.div`
    padding: .5rem 1rem;
    margin: .5rem;
    color: var(--offHoverColor);
    background: var(--purpleColor);
    border-radius: 5px;
    transition: var(--transitionApp);
    word-break: break-all;
`;

const SEventInfo = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    &>div:not(:first-child) {
        margin: .5rem;
        display: flex;
    }
`;

const SEventInvite = styled.div`
    margin: .5rem;
    color: var(--offHoverColor);
    text-transform: uppercase;
    text-align: center;
    transition: var(--transitionApp);
`;

const SEventVote = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SEventVoteYou = styled.span`
    margin: 10px;
    color: var(--onHoverColor);
    font-weight: bold;
    text-transform: uppercase;
`;

const SEvent = styled.div`
    padding: 1rem;
    margin: 1rem;
    height: max-content;
    background: var(--offHoverBG);
    border-radius: 10px;
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);

    &:hover {
        background: var(--onHoverBG);
        transition: var(--transitionApp);
    }

    &:hover .event-hover-text {
        color: var(--onHoverColor);
        transition: var(--transitionApp);
    }

    @media screen and (max-width: 600px) {
        ${SEventInfoWrapper} {
            flex-direction: column;
        }

        ${SEventUserInfo} {
            width: 100%;
        }
    }
`;

const localLib = {
    'voteSaved': Library.getText('common.event-item.event.voteSaved'),
    'voteNotSaved': Library.getText('common.event-item.event.voteNotSaved'),
    'notLoadEvent': Library.getText('common.event-item.event.notLoadEvent'),
    'invite': Library.getText('common.event-item.event.invite'),
    'title': Library.getText('common.event-item.event.title'),
    'datetime': Library.getText('common.event-item.event.datetime'),
    'desciption': Library.getText('common.event-item.event.description'),
    'yourVoteIs': Library.getText('common.event-item.event.yourVoteIs'),
}

const getVoteCounts = (v, v1, v2) => [{
    'title': 'going',
    'count': v,
},{
    'title': 'not going',
    'count': v1,
},{
    'title': 'idk',
    'count': v2,
}];

export default function Event({id, setHaveAccess = ()=>{}}) {
    const [event, setEvent] = useState({})

    const votes = event.votes0 !== null ? getVoteCounts(event.votes0, event.votes1, event.votes2) : getVoteCounts(0,0,0);
    const isVotedState = event.myVote !== null ? true : false;
    const myVote = isVotedState ? event.myVote : -1;
    
    const voteTitles = votes.map(vote => vote.title);
    const votesTotalCount = votes.reduce((counts, vote) => counts += vote.count, 0);
    const votePercents = votes.map(vote => Math.round(vote.count / votesTotalCount * 100));

    const isUser = event.userID !== null;
    const ava = isUser ? event.userAvatar : event.groupAvatar;
    const name = isUser ? event.nickname : event.groupTitle;
    const status = isUser ? event.status : null;

    const VoteSaved = (typeVote, votes = {}) => {
        event.myVote = typeVote
        for (let [k, v] of Object.entries(votes)) event[k] = v
        setEvent(Object.assign({}, event));
        Notify('success', localLib.voteSaved);
    }

    const ToVote = async(typeVote) => {
        const res = await POSTRequestWithParams('/s/answer', {
            'id'    : id,
            'answer': typeVote
        });
        if (res.err !== "ok") return Notify('fail', localLib.voteNotSaved);
        return VoteSaved(typeVote, res.data);    
    }

    useEffect(() => {
        if (event && Object.values(event).length === 0) {
            GetOne({'id': id}, "event", localLib.notLoadEvent, setEvent)
                .then(done => done === true ? setHaveAccess(true) : setHaveAccess(false))
        }
    }, [id, event, setHaveAccess]);

    return Object.values(event).length === 0 ? null : (
        <SEvent>
            <SEventInfoWrapper>
                <SEventUserInfo>
                    <Avatar isUser={true} avatar={ava} status={status} />
                    <SEventUserName className="event-hover-text">{name}</SEventUserName>
                </SEventUserInfo>

                <SEventInfo>
                    <SEventInvite className="event-hover-text">{name} {localLib.invite}</SEventInvite>
                    <GEventInfo title={localLib.title} info={event.title} />
                    <GEventInfo 
                        title={localLib.datetime} 
                        info={DateFromMilliseconds(event.datetime) + " (" + CalculateRelativeDatetime(event.datetime) + ")"} 
                    />
                    <GEventInfo title={localLib.desciption} info={event.description} />
                </SEventInfo>
            </SEventInfoWrapper>

            {
                isVotedState
                    ? <div className="event-votes">
                        <GVotes voteTitles={voteTitles} votes={votes} votePercents={votePercents} myVote={myVote} /> 
                    </div> 
                    : <SEventVote>
                        <SEventVoteYou>{localLib.yourVoteIs}:</SEventVoteYou>
                        <GYourVote voteTitles={voteTitles} toVote={ToVote} />
                    </SEventVote>
            }
            
        </SEvent>
    )
}