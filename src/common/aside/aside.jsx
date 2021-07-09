import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { SignOut } from 'functions/user';
import { AddRemoveClass } from 'functions/effects';

import Language from 'common/aside/language/language';
import styled from 'styled-components';

const SAside = styled.aside`
    grid-area: aside;
    padding: 1rem;
    background: var(--asideBG);
    max-width: 30vw;

    @media screen and (max-width: 600px) {
        & {
            position: fixed;
            left: -100vw;
            height: 100vh;
            width: 80vw;
            max-width: 80vw;
            z-index: 10;
            opacity: .9;
            transition: calc(var(--transitionApp)*2);
        }
        &.open {
            transform: translate(100vw);
            transition: calc(var(--transitionApp)*2);
        }
    }
`

const SAsideTop = styled.div`
    margin: 1rem;
`

const SLogo = styled.div`
    margin: auto;
    overflow: hidden;
    transition: var(--transitionApp);

    &:hover {
        filter: brightness(0.5);
    }

    & img {
        height: 100%;
        width: 100%;
    }
`

const SNickname = styled.div`
    margin: .5rem auto;
    padding: .5rem;
    width: max-content;
    max-width: 100%;
    text-transform: uppercase;
    color: var(--purpleColor);
    font-weight: bold;
    text-align: center;
    word-break: break-all;
    background: var(--onHoverColor);
    border-radius: 5px;
    transition: .5s;
`

const SLogout = styled(SNickname)`
    color: var(--redColor);
    cursor: pointer;
    transition: var(--transitionApp);

    &:hover {
        background: var(--redColor);
        color: var(--onHoverColor);
    }
`

const SNavs = styled.nav`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background: var(--navsBG);
`

const SNavLink = styled(NavLink)`
    margin: 0.5rem 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--purpleColor);
    border: 1px solid #231E2F;
    border-radius: 5px;
    color: var(--onHoverColor);
    text-shadow: 1px 1px 5px black;
    text-decoration: none;
    text-transform: uppercase;
    transition: var(--transitionApp);

    &.active,
    &:hover {
        color: var(--purpleColor);
        text-shadow: none;
        background: var(--onHoverColor);
    }
`

const SNotification = styled.span`
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--redColor);
    background: var(--purpleColor);
    border-radius: 50%;
`

let add = ()=>{};
export const AddNavsNotification = (whichNotif, howMany) => add(whichNotif, howMany);

const localLib = {
    'logout': Library.getText('common.aside.logout'),
    'home': Library.getText('common.aside.navs.home'),
    'user': Library.getText('common.routes.user'),
    'profile': Library.getText('common.aside.navs.profile'),
    'rMessenger': Library.getText('common.routes.messenger'),
    'nMessenger': Library.getText('common.aside.navs.messenger'),
    'account': Library.getText('common.routes.account.account'),
    'rFriends': Library.getText('common.routes.account.friends.friends'),
    'nFriends': Library.getText('common.aside.navs.friends'),
    'rGroups': Library.getText('common.routes.account.groups'),
    'nGroups': Library.getText('common.aside.navs.groups'),
    'search': Library.getText('common.routes.searches.search'),
}

// Generate navlink
const GNavLink = ({isExact, index, to, linkText, nots}) => {
    const isHave = nots[index] > 0;

    return (
        <SNavLink exact={isExact} activeClassName="active" to={to}>
            <span className="nav-link-text">{linkText}</span>
            {isHave ? <SNotification className="nav-link-not">{nots[index]}</SNotification> : null}
        </SNavLink>
    )
}

export default function Aside() {
    const history = useHistory();
    const [nots, SetNots] = useState([0, 0, 0, 0]);
    add = (whichNotif, howMany = 0) => {
        nots[whichNotif] += howMany;
        SetNots([...nots]);
    }

    return (
        <SAside className="aside" onClick={()=> AddRemoveClass('.aside', 'open', 0)}>
            <SAsideTop>
                <SLogo as={NavLink} to="/" >
                    <img src="/img/logo192.png" alt="wnet logo" />
                </SLogo>

                <SAsideTop>
                    <SNickname>{USER.nickname}</SNickname>
                    <SLogout onClick={() => SignOut(history)}>{localLib.logout}</SLogout>
                </SAsideTop>
            </SAsideTop>

            <SNavs>
                <GNavLink
                    isExact={true} 
                    index={0} 
                    nots={nots}
                    to="/" 
                    linkText={localLib.home}
                />

                <GNavLink
                    isExact={true} 
                    index={0} 
                    to={'/' + localLib.user +`/${USER.id}`} 
                    linkText={localLib.profile}
                    nots={nots} 
                />

                <GNavLink
                    index={1} 
                    to={"/" + localLib.rMessenger}
                    linkText={localLib.nMessenger} 
                    nots={nots} 
                />

                <GNavLink
                    index={2} 
                    to={"/" + localLib.account + '/' + localLib.rFriends + "/"}
                    linkText={localLib.nFriends}
                    nots={nots} 
                />

                <GNavLink
                    index={3} 
                    to={"/" + localLib.account + '/' + localLib.rGroups}
                    linkText={localLib.nGroups}
                    nots={nots} 
                />

                <GNavLink
                    index={0} 
                    to={"/" + localLib.search}
                    linkText={localLib.search} 
                    nots={nots} 
                />
            </SNavs>

            <Language />
        </SAside>
    )
}