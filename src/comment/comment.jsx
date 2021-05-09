import { useEffect, useState } from "react";

import { COMMENT_POST } from "constants/mocks";
import { Library } from "constants/language";
import { GetOne, SaveComment } from "functions/api";
import { OneComment } from 'common/comments/comments';

const NotLoadCommentText = Library.getText('general.notLoad').replace('SOMETHING', Library.getText('common.routes.comment'));

export default function CommentPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [comment, setComment] = useState(COMMENT_POST);

    useEffect(() => {
        if (Object.values(comment).length === 0) {
            GetOne({'id':ID}, 'comment', NotLoadCommentText, setComment)
                .then(res => !res ? history.push('/') : null);
        }
    }, [ID, history, comment]);

    return <OneComment {...comment} saveComment={SaveComment} />
}