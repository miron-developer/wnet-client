import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { GetOne } from "functions/api";
import { OneComment } from 'common/comments/comments';

export default function CommentPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [comment, setComment] = useState({});

    useEffect(() => {
        if (Object.values(comment).length === 0) {
            GetOne({'id':ID}, 'comment', Library.getText('comment.notLoadComment'), setComment)
                .then(res => !res ? history.push('/') : null);
        }
    }, [ID, history, comment]);

    return <OneComment {...comment} />
}