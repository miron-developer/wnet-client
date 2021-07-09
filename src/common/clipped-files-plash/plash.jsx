import { RandomKey } from "functions/content";
import { GET_FILE_SRC } from "functions/content";
import { PopupOpen } from "common/popup/popup";

import styled from "styled-components";

const SFilesPlash = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #000000ad;
`;

const SClippedFileWrapper = styled.div`
    max-width:  ${props => props.size ? props.size : '15rem'};
    width: max-content;
    max-height: ${props => props.size ? props.size : '15rem'};
    margin: .5rem;
    padding: .5rem;
    display: flex;
    flex-direction: ${props => props.type === 'file' ? 'row' : 'column'};
    align-items: center;
    justify-content: ${props => props.type === 'file' ? 'space-around' : 'space-between'};
    color: var(--onHoverColor);
    background: #000000ad;
    border-radius: 10px;
    cursor: pointer;
`;

const SClippedFileSrc = styled.div`
    width: ${props => props.type === 'file' ? 'max-content' : '100%'};
    
    & > * {
        max-width: 100%;
    }
`;



const RenderClippedFile = ({type, filename, src, size, onClick = ()=>{}}) => {
    let resElem = <img src={'/img/clip.png'} alt="file uploaded" />
    src = GET_FILE_SRC(src);
    if (type === 'video') resElem = <video src={src} controls />
    else if (type === 'image') resElem = <img src={src} alt="uploaded img" />
    else if (type === 'audio') resElem = <audio src={src} controls />

    return (
        <SClippedFileWrapper type={type} size={size} onClick={onClick} >
            <SClippedFileSrc type={type}>{resElem}</SClippedFileSrc>
            <span>{filename}</span>
        </SClippedFileWrapper>
    )
}

export default function ClippedFiles({ files = [] }) {
    return (
        <SFilesPlash>
            {
                files.map(
                    file => <RenderClippedFile key={RandomKey()} {...file} onClick={e => e.preventDefault() || PopupOpen(RenderClippedFile, {...file, 'size': '100%'})} />
                )
            }
        </SFilesPlash>
    )
}