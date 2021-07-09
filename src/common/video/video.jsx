import { useEffect, useRef, useState } from "react";

import { GetDataByCrieteries } from "functions/api";
import { Notify } from "common/app-notification/notification";

/**
 * needed videoElement fields & methods
 * f: currentTime - how many seconds played
 * f: duration - video time/duration
*/

const useVideoPlayBack = (ref, src) => {
    const [currentSrc, setSrc] = useState('');
    const [loadedSec, setLoadedSec] = useState(0);

    useEffect(() => {
        const getVideoPart = async() => {
            const res = await GetDataByCrieteries('/videopb', {
                'src': src,
                'from': loadedSec,
            });
    
            if (res.err !== 'ok') return Notify('fail', 'Can not loaded video part!');

            setTimeout(() => {
                setSrc(''.concat(currentSrc, res.data));
                setLoadedSec(loadedSec+30);
            }, 10000);
            
            ref.current.src = URL.createObjectURL(currentSrc);
        }

        if (ref.current && ref.current.paused === false) getVideoPart();
    }, [currentSrc, loadedSec, ref, src])
}

export default function VideoPlayBack({ src, preview }) {
    const ref = useRef(null);
    useVideoPlayBack(ref, src);

    return <video ref={ref} src={preview} ></video>
}