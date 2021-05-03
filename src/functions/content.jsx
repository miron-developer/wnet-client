import { useLocation } from 'react-router';

import { Library } from 'constants/language';
import Event from 'common/event-item/event';
import Post from 'common/post-item/post';

export const GET_CUR_PATHNAME = () => decodeURI(useLocation().pathname);
export const IS_SIGN = () =>  GET_CUR_PATHNAME().split('/').includes(Library.getText('common.routes.signs.sign'));

/**
 * 
 * @param {Array} arr Array of objects, which have field 'datetime'
 * @returns sorted arr by datetime
 */
export const SortArrOfObjByDatetime = arr => {
    if (!(arr instanceof Array)) return [];
    return arr.sort((a, b) => {
        if (a.datetime > b.datetime) return -1;
        if (a.datetime < b.datetime) return 1;
        return 0;
    });
}

// generate many post&events
export const GeneratePublications = (publications) => {
    if (!(publications instanceof Array)) return [];
    if (publications.length === 0) return <div className="publication-nf">{Library.getText('functions.content.notPublications')}</div>;
    
    const res = [];
    publications.forEach(
        publication => {
            if (publication.type === "post") res.push(<Post key={RandomKey()} {...publication}/>);
            else res.push(<Event key={RandomKey()} {...publication}/>);
        }
    )
    return res;
}

// return two digit string
export const IsTwoDigit = data => parseInt(data) < 10 ? "0".concat(data) : data;

// generate date(15/12/2020 09:09) from milliseconds
export const DateFromMilliseconds = milliseconds => {
    const datetime = new Date(parseInt(milliseconds));
    return  [IsTwoDigit(datetime.getDate()), IsTwoDigit(datetime.getMonth()+1), datetime.getFullYear()].join('/') + 
            " " +
            [IsTwoDigit(datetime.getHours()), IsTwoDigit(datetime.getMinutes())].join(':');
}

// calculate time after thing created
export const CalculateRelativeDatetime = (datetime = Date.now().toString()) => {
    const now = Date.now();
    const given = parseInt(datetime);

    const isPast = (now - given) > 0 ? true : false ;
    let diff = Math.abs(now - given) / 1000;
    let diffType = Library.getText('functions.content.calculateDateTimes.second');

    const returnDate = () => {
        diff = Math.floor(diff);
        if (diff > 1) diffType += Library.getText('functions.content.calculateDateTimes.s');

        if (!isPast) return [
            Library.getText('functions.content.calculateDateTimes.in'), 
            IsTwoDigit(diff), 
            diffType
        ].join(' ');

        const isToday = Math.abs(now - given) < 86400000;
        return [
            isToday ? 'today' : '',
            IsTwoDigit(diff), 
            diffType, 
            Library.getText('functions.content.calculateDateTimes.ago')
        ].join(' ');
    }

    // calculate difference
    if (diff > 60) {
        diff /= 60;
        diffType = Library.getText('functions.content.calculateDateTimes.minute');
    } else return returnDate();

    if (diff > 60) {
        diff /= 60;
        diffType = Library.getText('functions.content.calculateDateTimes.hour');
    } else return returnDate();

    if (diff > 24) {
        diff /= 24;
        diffType = Library.getText('functions.content.calculateDateTimes.day');
    } else return returnDate();

    if (diff > 7 && diff < 30) {
        diff /= 7;
        diffType = Library.getText('functions.content.calculateDateTimes.week');
    } else if (diff > 30 && diff < 365) {
        diff /= 30;
        diffType = Library.getText('functions.content.calculateDateTimes.month');
    } else if (diff > 365) {
        diff /= 365;
        diffType = Library.getText('functions.content.calculateDateTimes.year');
    }
    return returnDate();
}

// from 1000000 to 100k for ex
export const ReadableCount = (count = 0) => {
    const letters = [
        '', 
        Library.getText('functions.content.readableCounts.k'),
        Library.getText('functions.content.readableCounts.m'),
        Library.getText('functions.content.readableCounts.b'),
        Library.getText('functions.content.readableCounts.t')
    ];
    let index = 0;
    while(count >= 1000) {
        count /= 1000;
        index++;
    }
    return Math.round(count) + letters[index];
}

export const AddScript = (id, src) => new Promise((resolve, reject)=> {
    if (document.getElementById(id)) return resolve();
    const scrt = document.createElement('script');
    scrt.src = src;
    scrt.id = id;
    scrt.addEventListener('load', resolve);
    scrt.addEventListener('error', ()=> reject(`Error loading auth ${id}`));
    scrt.addEventListener('abort', ()=> reject(`Abort loading auth ${id}`));
    document.head.appendChild(scrt);
});

export const RandomKey = () => Math.round(Math.random() * Math.random() * 100000000);