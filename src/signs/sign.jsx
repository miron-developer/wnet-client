import { Switch, Route, Redirect } from 'react-router';

import { Library } from 'constants/language';

import SignAbout from 'signs/sign-about/about';
import SignUp from 'signs/sign-up';
import SignIn from 'signs/sign-in';
import ResetPassword from 'signs/reset-password';
import RestorePassword from 'signs/restore-password';
import SaveUser from 'signs/save-user';
import styled from 'styled-components';

const SSignFormSide = styled.div`
    width: 40%;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    background: rgba(107, 91, 149, 0.48);
    box-shadow: 4px 4px 5px 0 #00000040;
`;

const SSignFormTitle = styled.h2`
    margin: 1rem;
    text-transform: uppercase;
    text-align: center;
    color: var(--onHoverColor);
`;

const SSign = styled.div`
    height: 100%;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;

    @media screen and (max-width: 600px) {
        & {
            flex-direction: column;
            justify-content: center;
        }
        ${SSignFormSide} {
            width: max-content;
        }
    }
`;

const localLib = {
    'in': Library.getText('common.routes.signs.in'),
    'signIn': Library.getText('signs.sign.in'),
    'up': Library.getText('common.routes.signs.up'),
    'signUp': Library.getText('signs.sign.up'),
    're': Library.getText('common.routes.signs.re'),
    'signRe': Library.getText('signs.sign.re'),
    'rst': Library.getText('common.routes.signs.rst'),
    'signRst': Library.getText('signs.sign.rst'),
    's': Library.getText('common.routes.signs.s'),
    'singS': Library.getText('signs.sign.s'),
}

const Routes = [
    {
        href: "/" + localLib.in,
        title: localLib.signIn,
        isExact: false,
        component: SignIn,
    },
    {
        href: "/" + localLib.up,
        title: localLib.signUp,
        isExact: false,
        component: SignUp,
    },
    {
        href: "/" + localLib.re,
        title: localLib.signRe,
        isExact: false,
        component: ResetPassword,
    },
    {
        href: "/" + localLib.rst,
        title: localLib.signRst,
        isExact: false,
        component: RestorePassword,
    },
    {
        href: "/" + localLib.s,
        title: localLib.singS,
        isExact: false,
        component: SaveUser,
    },
];

export default function Sign({match}) {
    const route = Routes.find(route => route.href === "/"+decodeURI(window.location.pathname).split("/")[2]) || {};
    
    return (
        <SSign>
            <SignAbout />
            <SSignFormSide>
                <SSignFormTitle>{route.title}</SSignFormTitle>

                <Switch>
                    {
                        Routes.map(
                            ({href, component, isExact }, index) => <Route key={index} exact={isExact} path={match.url+href} component={component} />
                        )
                    }
                    <Redirect to={match.url + "/" + localLib.in} />
                </Switch>
            </SSignFormSide>
        </SSign>
        
    )
}