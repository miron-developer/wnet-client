import { Route, Switch } from "react-router";

import { Library } from "constants/language";

import Groups from 'profile-path/profile-groups/groups';
import Friends from 'profile-path/profile-friends/friends';
import Gallery from 'profile-path/profile-gallery/gallery';
import Settings from 'profile-path/profile-settings/settings';
import ConfirmChange from 'profile-path/profile-settings/settings-confirm/confirm';

const Routes = [
    {
        href: "/"+Library.getText('common.routes.profile.friends.friends') + "/",
        isExact: false,
        component: Friends,
    },
    {
        href: "/"+Library.getText('common.routes.profile.groups') + "/",
        isExact: false,
        component: Groups,
    },
    {
        href: "/"+Library.getText('common.routes.profile.gallery') + "/",
        isExact: false,
        component: Gallery,
    },
    {
        href: "/"+Library.getText('common.routes.profile.settings.settings') + "/s/",
        isExact: false,
        component: ConfirmChange,
    },
    {
        href: "/"+Library.getText('common.routes.profile.settings.settings') + "/",
        isExact: false,
        component: Settings,
    },
];

export default function Profile({match}) {
    return (
        <Switch>
            {
                Routes.map(
                    ({href, component, isExact }, index) => <Route key={index} exact={isExact} path={match.url+href} component={component} />
                )
            }
        </Switch>
    )
}