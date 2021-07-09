import { Library } from "constants/language";

const localLib = {
    sort: Library.getText('search.filter.filterDefines.sort'),
    date: Library.getText('search.filter.filterDefines.date'),
    pop: Library.getText('search.filter.filterDefines.popularity'),
    age: Library.getText('search.filter.filterDefines.age'),
    subs: Library.getText('search.filter.filterDefines.subs'),
    all: Library.getText('search.filter.filterDefines.genderAll'),
    member: Library.getText('search.filter.filterDefines.member'),
    gender: Library.getText('profile.data.gender'),
    male: Library.getText('profile.change-profile.genderMale'),
    female: Library.getText('profile.change-profile.genderFemale'),
    online: Library.getText('common.avatar.statusTextOnline'),
    private: Library.getText('search.filter.filterDefines.private'),
    carma: Library.getText('search.filter.filterDefines.carma'),
    view: Library.getText('search.filter.filterDefines.view'),
}

export const AllFilter = {
    'countFilters': [],
    'btnFilters': [{
        'title': localLib.sort,
        'fil_short': 'sort',
        'values': [{
                'title': localLib.pop,
                'short': 'pop',
            },
            {
                'title': localLib.date,
                'short': 'date',
            },
        ],
        'checked': 1,
    }],
    'switchFilters': [],
}

export const PeopleFilter = {
    'countFilters': [{
        'title': localLib.age,
        'short': 'age',
        'values': [],
    }, {
        'title': localLib.subs,
        'short': 'subs',
        'values': [],
    }],
    'btnFilters': [{
        'title': localLib.sort,
        'fil_short': 'sort',
        'values': [{
                'title': localLib.subs,
                'short': 'subs',
            },
            {
                'title': localLib.date,
                'short': 'date',
            },
            // {
            //     'title': localLib.pop,
            //     'short': 'pop',
            // },
        ],
        'checked': 1,
    }, {
        'title': localLib.gender,
        'fil_short': 'gender',
        'values': [{
                'title': localLib.male,
                'short': 'Male',
            },
            {
                'title': localLib.female,
                'short': 'Female',
            },
            {
                'title': localLib.all,
                'short': 'all',
            },
        ],
        'checked': 2,
    }],
    'switchFilters': [{
        'title': localLib.online,
        'short': 'online',
        'checked': false,
    }],
}

export const GroupFilter = {
    'countFilters': [{
        'title': localLib.member,
        'short': 'memb',
        'values': [],
    }],
    'btnFilters': [{
        'title': localLib.sort,
        'fil_short': 'sort',
        'values': [{
                'title': localLib.member,
                'short': 'member',
            },
            {
                'title': localLib.date,
                'short': 'date',
            },
        ],
        'checked': 1,
    }],
    'switchFilters': [{
        'title': localLib.private,
        'short': 'private',
        'checked': false,
    }],
}

export const PostFilter = {
    'countFilters': [{
        'title': localLib.carma,
        'short': 'carma',
        'values': [],
    }],
    'btnFilters': [{
        'title': localLib.sort,
        'fil_short': 'sort',
        'values': [{
                'title': localLib.pop,
                'short': 'pop',
            },
            {
                'title': localLib.date,
                'short': 'date',
            },
            // {
            //     'title': localLib.carma,
            //     'short': 'carma',
            // },
        ],
        'checked': 1,
    }],
    'switchFilters': [],
}

export const VideoFilter = {
    'countFilters': [{
            'title': localLib.carma,
            'short': 'carma',
            'values': [],
        },
        // {
        //     'title': localLib.view,
        //     'short': 'view',
        // }
    ],
    'btnFilters': [{
        'title': localLib.sort,
        'fil_short': 'sort',
        'values': [{
                'title': localLib.pop,
                'short': 'pop',
            },
            {
                'title': localLib.date,
                'short': 'date',
            },
            // {
            //     'title': localLib.carma,
            //     'short': 'carma',
            // },
            // {
            //     'title': localLib.view,
            //     'short': 'view',
            // },
        ],
        'checked': 1,
    }],
    'switchFilters': [],
}