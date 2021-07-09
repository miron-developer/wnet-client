import { RandomKey } from "functions/content";

import styled from "styled-components";

const SFilesPlash = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    bottom: 100%;
    background: #000000ad;
    overflow: auto;
    white-space: nowrap;
`;

const SFileUploadWrapper = styled.div`
    position: relative;
    width:  ${props => props.type === 'audio' ? '10rem' : '4rem'};
    display: inline-block;
    margin: .5rem;
    padding: .5rem;
    overflow: hidden;

    & > * {
        width: 100%;
        color: var(--onHoverColor);
    }
`;

const SRemoveFile = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    width: 1rem;
    height: 1rem;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--redColor);
    border-radius: 100%;
    transition: var(--transitionApp);
    cursor: pointer;

    &:hover{
        background: var(--darkRedColor);
    }
`;

const RenderUploadedFile = ({type, filename, src, removeFile}) => {
    let resElem = <img src={'/img/clip.png'} alt="file uploaded" />
    if (type === 'video') resElem = <video src={src} controls />
    else if (type === 'image') resElem = <img src={src} alt="uploaded img" />
    else if (type === 'audio') resElem = <audio src='/audio/ex.mp3' controls />
    
    return (
        <SFileUploadWrapper type={type}>
            <SRemoveFile onClick={()=>removeFile(filename)}>
                <i className="fa fa-times" aria-hidden="true"></i>
            </SRemoveFile>

            {resElem}
            <div>{filename}</div>
        </SFileUploadWrapper>
    )
}

export default function PreloadedFilesPlash({ preloadedFiles, removeFile = ()=>{}}) {
    return (
        <SFilesPlash>
            {
                preloadedFiles.map(
                    file => <RenderUploadedFile key={RandomKey()} {...file} removeFile={filename => removeFile(filename)} />
                )
            }
        </SFilesPlash>
    )
}