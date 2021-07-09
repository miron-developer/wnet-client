import { Switch, Route } from 'react-router-dom';

import { Library } from 'constants/language';
import { AddRemoveClass } from 'functions/effects';
import NF from 'nf404/error';
import Home from 'home/home';
import Signs from 'signs/sign';
import Profile from 'profile/profile';
import Search from 'search/search';
import Messenger from 'messenger/messenger';
import Account from 'account/account';
import Event from 'event/event';
import Post from 'post/post';
import Comment from 'comment/comment';
import Photo from 'photo/photo';
import Video from 'video/video';
import Popup from 'common/popup/popup';
import CallsPopup from 'common/calls/calls';

import styled from 'styled-components';

const SMain = styled.main`
    grid-area: main;
    background: var(--mainBG);
`;

// app's routes
const ROUTES = [{
        href: "/",
        isExact: true,
        component: Home,
    },
    {
        href: "/"+Library.getText('common.routes.messenger') + "/",
        isExact: false,
        component: Messenger,
    },
    {
        href: "/"+Library.getText('common.routes.signs.sign')+"/",
        isExact: false,
        component: Signs,
    },
    {
        href: "/"+Library.getText('common.routes.user')+"/:id",
        isExact: true,
        component: Profile,
    },
    {
        href: "/"+Library.getText('common.routes.group')+"/:id",
        isExact: true,
        component: Profile,
    },
    {
        href: "/"+Library.getText('common.routes.event')+"/:id",
        isExact: true,
        component: Event,
    },
    {
        href: "/"+Library.getText('common.routes.post')+"/:id",
        isExact: true,
        component: Post,
    },
    {
        href: "/"+Library.getText('common.routes.comment')+"/:id",
        isExact: true,
        component: Comment,
    },
    {
        href: "/"+Library.getText('common.routes.photo')+"/:id",
        isExact: true,
        component: Photo,
    },
    {
        href: "/"+Library.getText('common.routes.video')+"/:id",
        isExact: true,
        component: Video,
    },
    {
        href: "/"+Library.getText('common.routes.searches.search')+"/",
        isExact: false,
        component: Search,
    },
    {
        href: "/"+Library.getText('common.routes.account.account')+"/",
        isExact: false,
        component: Account,
    },
]

export default function DefineRoutes({isSign}) {
    return (
        <SMain onClick={()=> isSign ? null : AddRemoveClass('.aside', 'open', 0)}>
            <Switch>
                {
                    ROUTES.map(
                        ({href, component, isExact }, index) => <Route key={index} exact={isExact} path={href} component={component} />
                    )
                }
                <Route component={NF} />
            </Switch>

            <Popup />
            <CallsPopup />
        </SMain>
    )
}