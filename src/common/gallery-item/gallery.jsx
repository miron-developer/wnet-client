import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { USER } from 'constants/constants';
import { Library } from 'constants/language';
import { POSTRequestWithParams } from 'functions/api';
import { GET_FILE_SRC } from 'functions/content';
import { ClosePopup } from 'common/popup/popup';
import { Notify } from 'common/app-notification/notification';

import styled from 'styled-components';

const SGalleryItemWrapper = styled(Link)`
    height: max-content;
    text-decoration: none;
`;

const SGalleryItem = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    margin: 1rem;
    width: 20rem;
    height: 20rem;
    border-radius: 10px;
    background: var(--darkRedColor);
    box-shadow: var(--boxShadow);
`;

const SGalleryItemSrc = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &>* {
        width: 100%;
    }
`;

const SGalleryItemVideo = styled.span`
    position: absolute;
    left: 0;
    top: 0;
    width: max-content;
    height: max-content;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--onHoverColor);
    background: #000000b8;
    border-radius: 5px;
    box-shadow: var(--boxShadow);
`;

const SGalleryItemTitle = styled.div`
    color: var(--offHoverColor);
    margin: auto;
`;

const SGalleryItemControl = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 5px;
    margin: 5px;
    color: var(--onHoverColor);
`;

const SControlIcon = styled.div`
    font-size: 2rem;
`;

const SControlActions = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    padding: 1rem;
    width: max-content;
    border-radius: 5px;
    background: rgba(5, 0, 58, 0.76);

    & > div {
        margin: 5px;
        padding: 5px;
        border-radius: 5px;
        color: #000000;
        background: #E5E5E5;
    }
`;

const SControlActionsText = styled.span`
    margin: 5px;
`;

const localLib = {
    'link': type => Library.getText('common.routes.'+type),
    'edit': Library.getText('common.gallery-item.controlActions.edit'),
    'remove': Library.getText('common.gallery-item.controlActions.remove'),
    'removeFail': Library.getText('common.gallery-item.notRemoved')
}

// TODO: edit & remove
const removeHandle = async(e, id, removeFromCatalogue) => {
    e.preventDefault();
    const res = await POSTRequestWithParams('/gallery/rm', { 'id': id });
    if (res.err !== "ok") return Notify('fail', localLib.removeFail);
    removeFromCatalogue();
}

const editHandle = (e, id, history) => {
    e.preventDefault();
    history.push('/edit/gallery/'+id);
    ClosePopup();
}

export default function GalleryItem({id, type, title, src, preview, userID, groupID, removeFromCatalogue}) {
    const [isActionOpened, setIsActionsOpened] = useState(false);
    const history = useHistory();
    const ownerID = userID ? userID : groupID;
    const isMy = ownerID === USER.id;

    return (
        <SGalleryItemWrapper to={"/"+localLib.link(type)+"/"+id} onClick={ClosePopup} >
            <SGalleryItem>
                <SGalleryItemSrc>
                    {
                        type === 'video' 
                            ? <>
                                <video poster={GET_FILE_SRC(preview)}></video> 
                                <SGalleryItemVideo>
                                    <i className="fa fa-video-camera" aria-hidden="true"></i>
                                </SGalleryItemVideo>
                            </>
                            : <img src={GET_FILE_SRC(src)} alt={title} />
                    }
                </SGalleryItemSrc>
                <SGalleryItemTitle>{title}</SGalleryItemTitle>

                {
                    isMy
                        ? <SGalleryItemControl onClick={e => e.stopPropagation() || e.preventDefault() || setIsActionsOpened(!isActionOpened)}>
                            <SControlIcon>
                                <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                            </SControlIcon>

                            {
                                isActionOpened 
                                    ? <SControlActions>
                                        <div className="control-actions-edit" onClick={e => editHandle(e, id, history)}>
                                            <i className="fa fa-pencil" aria-hidden="true"></i>
                                            <SControlActionsText>{localLib.edit}</SControlActionsText>
                                        </div>
                                        <div className="control-actions-remove" onClick={e => removeHandle(e, id, removeFromCatalogue)}>
                                            <i className="fa fa-trash" aria-hidden="true"></i>
                                            <SControlActionsText>{localLib.remove}</SControlActionsText>
                                        </div>
                                    </SControlActions>
                                    : null 
                            }

                        </SGalleryItemControl>
                        : null
                }

            </SGalleryItem>
        </SGalleryItemWrapper>
    )
}