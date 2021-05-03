import { PopupOpen } from "common/popup/popup";
import { DefineType, PreloadFile } from "functions/file";
import PreloadedFilesPlash from 'common/preloaded-files-plash/plash';

import GetPhotoAndVideoUser from 'common/clips/get-gallery/gallery';
import styled from "styled-components";

const SClipPlhs = styled.div`
    position: absolute;
    left: -100vw;
    bottom: 100%;
    background: rgba(255, 255, 255, 0.54);
    border-radius: 10px;
    transition: var(--transitionApp);

    & > * {
        margin: 1rem .5rem;
    }
`;

const SClipPlshWrapper = styled.div`
    position: relative;

    &:hover ${SClipPlhs} {
        left: 0;
    }
`;

export default function ClipPlash({Wrapper, preloadedFiles = [], setFiles = ()=>{}}) {
    const addToPlash = (...files) => setFiles([...preloadedFiles, ...files]);
    const removeFile = filename => setFiles(preloadedFiles.filter(file => file.filename !== filename))
    const closeCB = () => {
        if (window.stream) window.stream.getTracks().forEach(t => t.stop());
    }

    const preloadedCB = (file, src, type) => {
        addToPlash({
            'type': DefineType(type),
            'file': file,
            'src': src,
            'filename': file.name,
        });
    }

    return (
        <>
            <PreloadedFilesPlash preloadedFiles={preloadedFiles} removeFile={removeFile} />

            <SClipPlshWrapper>
                <SClipPlhs>
                    <Wrapper alt="clip" srcIcon="/img/send-audio.png"   onClick={() => PreloadFile('audio/*', preloadedCB)} />
                    <Wrapper alt="clip" srcIcon="/img/get-gallery.png"  
                        onClick={() => PopupOpen(GetPhotoAndVideoUser, {
                            'addToPlash': addToPlash,
                            'closeCB': closeCB,
                        })} 
                    />
                    <Wrapper alt="clip" srcIcon="/img/send-gallery.png" onClick={() => PreloadFile('video/*, image/*', preloadedCB)} />
                    <Wrapper alt="clip" srcIcon="/img/send-file.png"    onClick={() => PreloadFile('*', preloadedCB)} />
                </SClipPlhs>
                <Wrapper alt="clip"  srcIcon="/img/clip.png" />
            </SClipPlshWrapper>
        </>
    )
}