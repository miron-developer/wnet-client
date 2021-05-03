import { useState } from "react";

import EventItem from 'common/event-item/event';

export default function Event({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [isHaveAccess, setHaveAccess] = useState();
    
    if (isHaveAccess === false) return history.push("/") || null;

    return <EventItem id={ID} setHaveAccess={setHaveAccess} />
}