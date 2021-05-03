import { PopupOpen } from "common/popup/popup";

import styled from "styled-components";

const SFilesPlash = styled.div`
    background: #000000ad;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`;

const SClippedFileWrapper = styled.div`
    width:  ${props => props.size ? props.size : '15rem'};
    max-height: ${props => props.size ? props.size : '15rem'};
    margin: .5rem;
    padding: .5rem;
    display: flex;
    flex-direction: ${props => props.type === 'file' ? 'row' : 'column'};
    align-items: center;
    justify-content: ${props => props.type === 'file' ? 'space-around' : 'space-between'};
    background: #000000ad;
    border-radius: 10px;
    cursor: pointer;
    color: var(--onHoverColor);
`;

const SClippedFileSrc = styled.div`
    width: ${props => props.type === 'file' ? 'max-content' : '100%'};
    
    & > * {
        max-width: 100%;
    }
`;

const RenderClippedFile = ({type, filename, src, size, onClick = ()=>{}}) => {
    let resElem = <img src={'/img/clip.png'} alt="file uploaded" />
    if (type === 'video') resElem = <video src={src} controls />
    else if (type === 'image') resElem = <img src={src} alt="uploaded img" />
    else if (type === 'audio') resElem = <audio src='/audio/ex.mp3' controls />
    
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
                    file => <RenderClippedFile key={Math.random()*Math.random()} {...file} onClick={() => PopupOpen(RenderClippedFile, {...file, 'size': '100%'})} />
                )
            }
        </SFilesPlash>
    )
}