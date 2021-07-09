import { useEffect, useState } from "react";

import { Library } from "constants/language";
import { GetOne } from "functions/api";
import { ScrollHandler } from "functions/effects";
import { GET_FILE_SRC } from "functions/content";
import { useFromTo } from "functions/hooks";
import LeaveCommentPlash from 'common/leave-comment-plash/plash';
import Comments from 'common/comments/comments';

import styled from "styled-components";

const SPhoto = styled.div`
    max-height: 30rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    background: #211f1f;
`;

const localLib = {
    'notLoadPhoto': Library.getText('photo.notLoadPhoto'),
    'notLoadComments': Library.getText('photo.notLoadComments'),
}

const loadComments = (id, getPart) =>  getPart('comments', { 'type': 'media', 'id': id, 'count': 'many' }, localLib.notLoadComments, true);

export default function PhotoPage({ history }) {
    const ID = window.location.pathname.split('/')[2];
    const [photo, setPhoto] = useState({});

    const [isLoaded, setLoaded] = useState(false);
    const { datalist, isStopLoad, setDataList, getPart } = useFromTo()

    const addComments = (...newComments) => setDataList([...datalist, ...newComments]);

    useEffect(() => {
        if (Object.values(photo).length === 0) {
            GetOne({'id':ID, 'type': 'photo'}, 'media', localLib.notLoadPhoto, setPhoto)
                .then(isEx => !isEx ? history.push("/") : null)
        } else {
            if (!isLoaded) {
                loadComments(ID, getPart);
                setLoaded(true);
            }
        }
    }, [getPart, history, isLoaded, ID, photo]);


    return (
        <div className="photo-wrapper">
            <SPhoto>
                <img src={GET_FILE_SRC(photo.src)} alt={photo.title} />
            </SPhoto>

            <LeaveCommentPlash id={ID} type="photo" addComments={addComments} />
            
            <Comments comments={datalist}
                onScroll={
                    e => 
                    ScrollHandler(
                        e, 
                        isStopLoad, 
                        false, 
                        () => loadComments(ID, getPart)
                    )
                } 
            />
        </div>
    )
}