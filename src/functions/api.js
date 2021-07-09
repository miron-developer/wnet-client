import { HOST_URL } from 'constants/constants';
import { Library } from 'constants/language';
import { Notify } from 'common/app-notification/notification';

const localLib = {
    '500err': Library.getText('functions.api.500err'),
    'notSaveComment': Library.getText('functions.effects.notSaveComment'),
}

const formDataToString = (data = new FormData()) => {
    let res = "";
    for (let [k, v] of data.entries())
        res += k + "=" + v + "&"
    return res.slice(0, -1)
}

// use fetching by both method
export const Fetching = async(action, data, method = "POST") => {
    if (action === undefined) return { err: "action undefined" };

    const fetchOption = { 'method': method, 'mode': 'cors', 'credentials': 'include' };
    if (method === "GET") action += "?" + encodeURI(formDataToString(data));
    else fetchOption["body"] = data;

    return await fetch(action, fetchOption)
        .then(res => res.json())
        .catch(err => Object.assign({}, { 'err': localLib['500err'] }));
}

// convert from object to URLSearchParams
export const PrepareDataToFetch = (datas = {}) => {
    const data = new FormData();
    for (let [k, v] of Object.entries(datas)) data.append(k, v);
    return data;
}

// get data by id & type
export const GetDataByID = async(id, datatype) => {
    const data = PrepareDataToFetch({ 'id': id });
    const res = await Fetching(HOST_URL + "/api/" + datatype, data, 'GET');
    if (res.err !== 'ok') return { 'err': res.err }
    return res.data;
}

// get data by criteries & type
export const GetDataByCrieteries = async(datatype, criteries = {}) => {
    const data = PrepareDataToFetch(criteries);
    const res = await Fetching(HOST_URL + "/api/" + datatype, data, 'GET');
    if (res.err !== 'ok') return { 'err': res.err }
    return res.data;
}

// send post req to host with params
export const POSTRequestWithParams = async(to, params = {}) => {
    const data = PrepareDataToFetch(params);
    return await Fetching(HOST_URL + to, data);
}

// get one & update state
export const GetOne = async(criteries = {}, whatGet = "", failText = "", set = () => {}) => {
    if (Object.values(criteries).length === 0 || whatGet === "" || failText === "") return set();

    const res = await GetDataByCrieteries(whatGet, criteries);
    if (res.err && res.err !== 'ok') return Notify('fail', failText);
    set(res[0]);
    return true;
}

// get all exist
export const GetAll = async(whatGet = "", params, failText = "", set = () => {}) => {
    if (whatGet === "" || !params || failText === "") return set();

    const res = await GetDataByCrieteries(whatGet, params);
    if (res.err && res.err !== 'ok') return Notify('fail', failText);
    set(res);
    return true;
}

// save one comment & render it
export const SaveComment = async(params = {}) => {
    const res = await POSTRequestWithParams('/s/comment', params);
    if (res.err !== 'ok') return Notify('fail', localLib.notSaveComment);
    return res.data[0];
}