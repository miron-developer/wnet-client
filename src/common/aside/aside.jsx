import { useState } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';

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

    @media screen and (max-width: 600px) {
        & {
            position: fixed;
            left: -100vw;
            top: 0;
            height: 100vh;
            width: 80vw;
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
    max-width: 140px;
    max-height: 140px;
    margin: auto;
    overflow: hidden;
    transition: var(--transitionApp);

    &:hover {
        filter: brightness(0.5);
        transition: var(--transitionApp);
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
    text-transform: uppercase;
    color: var(--purpleColor);
    font-weight: bold;
    text-align: center;
    background: var(--onHoverColor);
    border-radius: 5px;
    transition: .5s;
`

const SLogout = styled(SNickname)`
    color: var(--redColor);
    cursor: pointer;

    &:hover {
        background: var(--redColor);
        color: var(--onHoverColor);
        transition: var(--transitionApp);
    }
`

const SNavs = styled.nav`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    background: var(--navsBG);
`

const SNavLink = styled(NavLink)`
    position: relative;
    margin: 0.5rem 0;
    padding: 0.5rem;
    background: var(--purpleColor);
    border: 1px solid #231E2F;
    box-sizing: border-box;
    border-radius: 5px;
    list-style: none;
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
        transition: var(--transitionApp);
    }
`

const SNotification = styled.span`
    position: absolute;
    right: 0;
    top: 50%;
    padding: 5px;
    margin: 0 5px;
    color: var(--redColor);
    background: var(--purpleColor);
    border-radius: 50%;
    transform: translateY(-50%);
`

let snn = ()=>{};
export const AddNavsNotification = (whichNotif, howMany) => snn(whichNotif, howMany);

const handleSignOut = async(history) => await SignOut() ? history.push('/sign/in') : null;

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

const Aside = ({history}) => {
    const [nots, SetNots] = useState([0, 0, 0, 0]);
    snn = (whichNotif, howMany = 0) => {
        nots[whichNotif] += howMany;
        SetNots([...nots]);
    }

    return (
        <SAside className="aside" onClick={()=> AddRemoveClass('.aside', 'open', 0)}>
            <SAsideTop>
                <SLogo as={Link} to="/" >
                    <img src="/img/logo192.png" alt="wnet logo" />
                </SLogo>

                <SAsideTop>
                    <SNickname>{USER.nickname}</SNickname>
                    <SLogout onClick={() => handleSignOut(history)}>{Library.getText('common.aside.logout')}</SLogout>
                </SAsideTop>
            </SAsideTop>

            <SNavs className="navs">
                <GNavLink
                    isExact={true} 
                    index={0} 
                    nots={nots}
                    to="/" 
                    linkText={Library.getText('common.aside.navs.home')}
                />

                <GNavLink
                    isExact={true} 
                    index={0} 
                    to={'/' + Library.getText('common.routes.user') +`/${USER.id}`} 
                    linkText={Library.getText('common.aside.navs.profile')}
                    nots={nots} 
                />

                <GNavLink
                    index={1} 
                    to={"/"+Library.getText('common.routes.messenger')}
                    linkText={Library.getText('common.aside.navs.messenger')} 
                    nots={nots} 
                />

                <GNavLink
                    index={2} 
                    to={"/"+ Library.getText('common.routes.profile.profile') + '/' + Library.getText('common.routes.profile.friends.friends') + "/"}
                    linkText={Library.getText('common.aside.navs.friends')}
                    nots={nots} 
                />

                <GNavLink
                    index={3} 
                    to={"/"+ Library.getText('common.routes.profile.profile') + '/' + Library.getText('common.routes.profile.groups')}
                    linkText={Library.getText('common.aside.navs.groups')}
                    nots={nots} 
                />

                <GNavLink
                    index={0} 
                    to={"/"+ Library.getText('common.routes.searches.search')}
                    linkText={Library.getText('common.routes.searches.search')} 
                    nots={nots} 
                />
            </SNavs>

            <Language />
        </SAside>
    )
}

export default withRouter(Aside);