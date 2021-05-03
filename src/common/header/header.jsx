import { Library } from 'constants/language';
import { AddRemoveClass } from 'functions/effects';

import PageID from 'common/header/page-id/page-id';
import Notification from 'common/header/notification/notification';
import CreateA from 'common/header/create-a/create';
import User from 'common/header/user-menu/user';
import styled from 'styled-components';

const SHeaderActionsWrapper = styled.div`
    position: relative;
    height: calc(100% + 2rem);
    align-items: center;
    display: flex;
`;

const SHeaderActions = styled.div`
    display: flex;
    align-items: center;

    & img {
        max-width: 2rem;
        max-height: 2rem;
    }
`;

const SMobileActions = styled.div`
    display: none;

    & i {
        color: var(--onHoverColor);
    }

    & span {
        color: var(--onHoverColor);
        margin: 5px;
    }
`;

const SMenuBtn = styled.div`
    display: none;
`;

const SMenuBtnSpan = styled.span``;

const SHeader = styled.header`
    grid-area: header;
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--purpleColor);

    @media screen and (max-width: 600px) {
        & {
            position: fixed;
            left: 0;
            right: 0;
            height: 7vh;
            z-index: 5;
        }

        ${SHeaderActionsWrapper}:hover ${SHeaderActions} {
            display: block;
        }
        
        ${SHeaderActions} {
            position: absolute;
            top: 100%;
            right: 0;
            display: none;
            flex-direction: column;
            align-items: flex-start;
            background: #0000002e;
            transform: translateX(1rem);
        }

        ${SMobileActions} {
            display: block;
        }

        ${SMenuBtn} {
            position: relative;
            height: 100%;
            width: 10vw;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        ${SMenuBtnSpan} {
            &::before {
                content: '';
                top: -400%;
            }
            &::after {
                content: '';
                top: 400%;
            }
            &,
            &::before,
            &::after {
                position: absolute;
                display: block;
                height: 2px;
                width: 100%;
                background: var(--onHoverColor);
            }
        }
    }
`;

export default function Header({isSign}) {
    return (
        <SHeader>
            {
                isSign 
                    ? null 
                    : <SMenuBtn onClick={()=> AddRemoveClass('.aside', 'open')}> 
                        <SMenuBtnSpan></SMenuBtnSpan> 
                    </SMenuBtn>
            }

            <PageID />

            {
                isSign 
                    ? null 
                    :<SHeaderActionsWrapper>
                        <SMobileActions>
                            <span>{Library.getText('common.header.header.actions')}</span>
                            <i className="fa fa-caret-down" aria-hidden="true"></i>
                        </SMobileActions>
                        <SHeaderActions>
                            <Notification />
                            <CreateA />
                            <User />
                        </SHeaderActions> 
                    </SHeaderActionsWrapper>
            }
        </SHeader>
    )
}