import { Library } from "constants/language";

const sort = Library.getText('search.filter.filterDefines.sort')
const date = Library.getText('search.filter.filterDefines.date');
const pop = Library.getText('search.filter.filterDefines.popularity');
const age = Library.getText('search.filter.filterDefines.age');
const subs = Library.getText('search.filter.filterDefines.subs');
const all = Library.getText('search.filter.filterDefines.genderAll');
const member = Library.getText('search.filter.filterDefines.member');
const gender = Library.getText('profile.data.gender');
const male = Library.getText('profile.change-profile.genderMale');
const female = Library.getText('profile.change-profile.genderFemale');
const online = Library.getText('common.avatar.statusTextOnline');
const privateText = Library.getText('search.filter.filterDefines.private');
const carma = Library.getText('search.filter.filterDefines.carma');
const view = Library.getText('search.filter.filterDefines.view');

export const AllFilter = {
    'countFilters': [],
    'btnFilters': [{
        'title': sort,
        'short': 'sort',
        'values': [
            pop,
            date,
        ],
        'defaultIndex': 1,
    }],
    'switchFilters': [],
}

export const PeopleFilter = {
    'countFilters': [{
        'title': age,
        'short': 'age',
    }, {
        'title': subs,
        'short': 'subs',
    }],
    'btnFilters': [{
        'title': sort,
        'short': 'sort',
        'values': [
            pop,
            subs,
            date,
        ],
        'defaultIndex': 2,
    }, {
        'title': gender,
        'short': 'gender',
        'values': [
            male,
            female,
            all,
        ],
        'defaultIndex': 2,
    }],
    'switchFilters': [{
        'title': online,
        'short': 'online',
    }],
}

export const GroupFilter = {
    'countFilters': [{
        'title': member,
        'short': 'member',
    }],
    'btnFilters': [{
        'title': sort,
        'short': 'sort',
        'values': [
            member,
            date,
        ],
        'defaultIndex': 1,
    }],
    'switchFilters': [{
        'title': privateText,
        'short': 'private',
    }],
}

export const PostFilter = {
    'countFilters': [{
        'title': carma,
        'short': 'carma',
    }],
    'btnFilters': [{
        'title': sort,
        'short': 'sort',
        'values': [
            pop,
            carma,
            date,
        ],
        'defaultIndex': 2,
    }],
    'switchFilters': [],
}

export const VideoFilter = {
    'countFilters': [{
        'title': carma,
        'short': 'carma',
    }, {
        'title': view,
        'short': 'view',
    }],
    'btnFilters': [{
        'title': sort,
        'short': 'sort',
        'values': [
            carma,
            view,
            date,
        ],
        'defaultIndex': 2,
    }],
    'switchFilters': [],
}