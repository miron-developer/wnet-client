import { HOST_URL, USER } from "constants/constants"
import { CalculateRelativeDatetime, SortArrOfObjByDatetime, IsTwoDigit, RandomKey } from "functions/content";
import Avatar from 'common/avatar/avatar';

import styled from "styled-components";

const SAnotherDay = styled.div`
    padding: .5rem;
    width: max-content;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.24);
    box-shadow: var(--boxShadow);
`;

const SOneMessage = styled.div`
    display: flex;
    flex-direction: ${props => props.isMy ? 'row-reverse' : 'row'};
    width: 50%;
    margin: 1rem;
    margin-left: ${props => props.isMy ? 'auto' : ''};
`;

const SMsgBodyWrapper = styled.div`
    margin: 0 1rem;
    width: 100%;
`;

const SMsgBody = styled.div`
    padding: 1rem;
    width: 100%;
    background: rgba(255, 255, 255, 0.38);
    box-shadow: var(--boxShadow);
    border-radius: 20px;
    white-space: pre;

    & * {
        width: 100%;
    }
`;

const SMediaMsgBody = styled.div`
    display: flex;
    flex-direction: column;
`;

const STime = styled.span`
    display: block;
    margin: 5px;
    margin-left: ${props => props.isMy ? 'auto': ''};
    padding: 5px;
    width: max-content;
    color: var(--onHoverColor);
    border-radius: 5px;
    background: var(--purpleColor);
`;

const SMessages = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 75vh;
    overflow-y: auto;

    @media screen and (max-width: 700px) {
        ${SOneMessage} {
            width: 70%;
        }
    }
`;

const GenerateMsgRelativelyByType = ({type, body, src}) => {
    if (type === 'text') return body;

    let resElem = <img src={'/img/clip.png'} alt="file uploaded" />
    if (type === 'video') resElem = <video src={HOST_URL+src} controls />
    else if (type === 'image' || type === 'photo') resElem = <img src={HOST_URL+src} alt="uploaded img" />
    else if (type === 'audio') resElem = <audio src={HOST_URL+src} controls />

    return (
        <SMediaMsgBody>
            {resElem}
            {body}
        </SMediaMsgBody>
    )
}

const splitMessagesByDate = (messages = []) => {
    if (messages.length === 0) return [];
    let delimIndex = -1;
    let arrIndex = -1;
    const res = [];
    const oneDay = 86400000;

    messages.forEach(msg => {
        const diff = Date.now() - parseInt(msg.datetime);
        const rounded = Math.round(diff / oneDay);
        if (rounded !== delimIndex) {
            res.push([]);
            delimIndex = rounded;
            arrIndex++;
        }
        res[arrIndex].push(msg);
    });
    return res;
}

const AnotherDay = ({datetime}) => {
    const text = CalculateRelativeDatetime(datetime);
    return <SAnotherDay>{text.includes('today') ? 'today': text}</SAnotherDay>;
}

const OneMessage = ({body, datetime, messageType, src, avatar, senderUserID}) => {
    const isMy = senderUserID === USER.id ? true : false;
    const date = new Date(parseInt(datetime));
    const time = IsTwoDigit(date.getHours()) + ":" + IsTwoDigit(date.getMinutes());
    return (
        <SOneMessage className="message" isMy={isMy}>
            <Avatar avatar={avatar} size="" />

            <SMsgBodyWrapper>
                <SMsgBody>
                    <GenerateMsgRelativelyByType type={messageType} body={body} src={src} />
                </SMsgBody>

                <STime isMy={isMy}>{time}</STime>
            </SMsgBodyWrapper>
        </SOneMessage>
    )
}

export default function ChatMessages({messages = [], onScroll}) {
    const sorted = SortArrOfObjByDatetime(messages).reverse();
    const splitted = splitMessagesByDate(sorted);

    return (
        <SMessages id="chat-container" onScroll={onScroll}>
            {
                splitted.map(msgs => {
                    return [
                        <AnotherDay key={RandomKey()} datetime={msgs[0].datetime} />, 
                        msgs.map(msg => <OneMessage key={RandomKey()} {...msg} />)
                    ];
                })
            }
        </SMessages>
    )
}