import styled from "styled-components";

const SHeaderPopupsBody = styled.div`
    position: absolute;
    right: 0;
    top: 100%;
    display: ${props => props.isOpened ? 'flex' : 'none'};
    flex-direction: column;
    max-height: 20rem;
    min-width: ${props => props.isNotifications ? '40vw;' : '10vw'};
    border-radius: 5px;
    background: rgba(107, 91, 149, 0.9);
    z-index: 10;
    overflow: auto;

    @media screen and (max-width: 600px) {
        & {
            right: 100%;
            top: 0;
        }
    }
`;

export default function HeaderPopupsBody({ children, isOpened, isNotifications = false, onScroll = ()=>{} }) {
    return (
        <SHeaderPopupsBody isOpened={isOpened} isNotifications={isNotifications} onScroll={onScroll} >
            { children }
        </SHeaderPopupsBody>
    )
}