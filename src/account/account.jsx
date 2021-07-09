import { Route, Switch } from "react-router";

import { Library } from "constants/language";
import { RandomKey } from "functions/content";

import Groups from 'account/account-groups/groups';
import Friends from 'account/account-friends/friends';
import Gallery from 'account/account-gallery/gallery';
import Settings from 'account/account-settings/settings';
import ConfirmChange from 'account/account-settings/settings-confirm/confirm';

const localLib = {
    'friends': Library.getText('common.routes.account.friends.friends'),
    'groups': Library.getText('common.routes.account.groups'),
    'gallery': Library.getText('common.routes.account.gallery'),
    'settings': Library.getText('common.routes.account.settings.settings'),
}

const Routes = [
    {
        href: "/" + localLib.friends + "/",
        isExact: false,
        component: Friends,
    },
    {
        href: "/" + localLib.groups + "/",
        isExact: false,
        component: Groups,
    },
    {
        href: "/" + localLib.gallery + "/",
        isExact: false,
        component: Gallery,
    },
    {
        href: "/" + localLib.settings + "/s/",
        isExact: false,
        component: ConfirmChange,
    },
    {
        href: "/" + localLib.settings + "/",
        isExact: false,
        component: Settings,
    },
];

export default function Profile({match}) {
    return (
        <Switch>
            {
                Routes.map(
                    ({href, component, isExact }) => <Route key={RandomKey()} exact={isExact} path={match.url+href} component={component} />
                )
            }
        </Switch>
    )
}