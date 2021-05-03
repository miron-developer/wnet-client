import { useState } from "react";

import { Notify } from "common/app-notification/notification";

import { GetDataByCrieteries } from "functions/api";

// for lazy load
export const useFromTo = (initState = [], step = 10) => {
    const [fromToState, setFromToState] = useState({
        'start': 0,
        'isStopLoad': false,
        'datalist': initState,
    });

    const setDataList = state => setFromToState(Object.assign({}, fromToState, { 'datalist': state }));

    const getPart = async(getWhat = "", params = {}, failText = "", isAppToEnd = true) => {
        if (getWhat === "" || failText === "") return Notify('fail', failText);

        const res = await GetDataByCrieteries(getWhat, {
            ...params,
            'from': fromToState.start,
            'step': step
        });

        if (res.err && res.err !== 'ok') return Notify('fail', failText);

        if (isAppToEnd) fromToState.datalist = [...fromToState.datalist, ...res];
        else fromToState.datalist = [...res, ...fromToState.datalist];

        if (res.length < step) fromToState.isStopLoad = true;
        else fromToState.start += step;

        setFromToState(Object.assign({}, fromToState));
        return true;
    }

    return {
        'datalist': fromToState.datalist,
        'isStopLoad': fromToState.isStopLoad,
        setDataList,
        getPart,
    }
}