import { Route, Switch } from "react-router";

import { RandomKey } from "functions/content";

import Chats from 'messenger/messenger-chats';
import Chat from 'messenger/messenger-chat';

const Routes = [
    {
        href: "/",
        isExact: true,
        component: Chats,
    },
    {
        href: "/:id",
        isExact: false,
        component: Chat,
    },
]

export default function Messages({match}) {
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