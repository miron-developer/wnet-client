import { useEffect, useState } from 'react';

import { Library } from 'constants/language';
import { useInput } from 'functions/form';
import { RandomKey } from 'functions/content';
import { DebouncedFuctionWithValue } from 'functions/effects';

import { AllFilter, GroupFilter, PeopleFilter, PostFilter, VideoFilter } from 'search/search-filter/filterDefines';
import styled from 'styled-components';

const SSearchFilterData = styled.div`
    height: 0;
    background: rgb(116 87 142);
    transform: translateX(100%);

    &.opened {
        height: max-content;
        transform: translateX(0%);
        transition: var(--transitionApp);
    }
`;

const SFilterHint = styled.h2`
    padding: 1rem;
    margin: 0;
    text-align: center;
    color: var(--redColor);
`;

const SFilterTitle = styled.div`
    color: var(--onHoverColor);
    text-transform: uppercase;
    text-shadow: 2px 2px 3px #00000052;
`;

const SCountFilter = styled.div`
    padding: 1rem;
`;

const SCountFilterInput = styled.label`
    color: var(--onHoverColor);
    margin: 5px;

    & input {
        margin: 0 5px;
        padding: 5px;
        color: var(--onHoverColor);
        background: none;
        border: none;
        border-bottom: 1px solid white;
        outline: none;
    }
`;

const SBtnSwitchFilter = styled(SCountFilter)`
    display: flex;
    align-items: center;
`;

const SBtnValues = styled.div`
    display: flex;
    align-items: center;
`;

const SBtnValue = styled.label`
    padding: .5rem;
    margin: .5rem;
    color: var(--onHoverColor);
    background: rgba(3, 0, 167, 0.2);
    box-shadow: var(--boxShadow);
    border-radius: 50px;
    cursor: pointer;
    transition: var(--transitionApp);
`;

const SBtnValueWrapper = styled.div`
    & input:checked + ${SBtnValue}{
        background: var(--violetColor);
        transition: var(--transitionApp);
    }
`;

const SSwitchBtn = styled.label`
    position: absolute;
    left: 10%;
    display: block;
    width: 4rem;
    height: 1.5rem;
    background: rgba(3, 0, 167, 0.2);
    border: 1px solid #000000;
    border-radius: 50px;
    box-shadow: var(--boxShadow);
    transition: var(--transitionApp);
`;

const SSwitchBtnWrapper = styled(SBtnValues)`
    position: relative;
    width: 12rem;
    height: 2rem;
    margin: 0 1rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 50px;
    box-shadow: var(--boxShadow);

    & input:checked + ${SSwitchBtn} {
        left: 60%;
        background: var(--violetColor);
        transition: var(--transitionApp);
    }
`;

const localLib = {
    'from': Library.getText('search.filter.from'),
    'to': Library.getText('search.filter.to'),
    'close': Library.getText('search.filter.close'),
}

const filters = [AllFilter, PeopleFilter, GroupFilter, PostFilter, VideoFilter];

const addParams = (params, k, v) => params[k] = v;

const CountFilter = ({short, title, values, curFilter, addParams, setFilter}) => {
    const min = useInput(values[0]);
    const max = useInput(values[1]);
    
    const handleChange = (e, isMax = false) => {
        const index = curFilter.countFilters.findIndex(fil => fil.short === short);
        if (isMax) {
            max.base.onChange(e);
            addParams("".concat(short, 'max'), e.target.value);
            curFilter.countFilters[index].values[1] = e.target.value;
        } else {
            min.base.onChange(e);
            addParams("".concat(short, 'min'), e.target.value);
            curFilter.countFilters[index].values[0] = e.target.value;
        }
        setFilter({...curFilter});
    }

    return (
        <SCountFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <div className="count-filter-inputs">
                <SCountFilterInput>
                    <span>{localLib.from}:</span>
                    <input type="number" name="min" value={min.base.value} onChange={e => handleChange(e)} />
                </SCountFilterInput>
                
                <SCountFilterInput>
                    <span>{localLib.to}:</span>
                    <input type="number" name="max" value={max.base.value} onChange={e => handleChange(e, true)} />
                </SCountFilterInput>
            </div>
        </SCountFilter>
    )
}

const OneBtnFilter = ({title, short, fil_short, i, checked, curFilter, addParams, setFilter}) => {
    const handleClick = () => {
        const index = curFilter.btnFilters.findIndex(fil => fil['fil_short'] === fil_short);
        curFilter.btnFilters[index].checked = i;
        setFilter({...curFilter});
        addParams(fil_short, short);
    }
   
    return (
        <SBtnValueWrapper>
            <input hidden id={`btn-filter-${fil_short}-${short}`} type="radio" value={short} checked={checked} name={fil_short} onChange={handleClick} />
            <SBtnValue htmlFor={`btn-filter-${fil_short}-${short}`}>{title}</SBtnValue>
        </SBtnValueWrapper>
    )
}

const BtnFilter = ({title, fil_short, checked, curFilter, values = [], addParams, setFilter}) => {
    return (
        <SBtnSwitchFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <SBtnValues>
                {values.map(
                    (flt, i) => 
                    <OneBtnFilter 
                        key={RandomKey()} 
                        {...flt} 
                        fil_short={fil_short} 
                        i={i} 
                        checked={checked===i}
                        curFilter={curFilter} 
                        addParams={addParams}
                        setFilter={setFilter}
                    />
                )}
            </SBtnValues>
        </SBtnSwitchFilter>
    )
}

const SwitchFilter = ({title, short, checked, curFilter, addParams, setFilter}) => {
    const handleClick = e => {
        const index = curFilter.switchFilters.findIndex(fil => fil.short === short);
        curFilter.switchFilters[index].checked = e.target.checked;
        setFilter({...curFilter});
        addParams(short, e.target.checked ? 1 : 0);
    }

    return (
        <SBtnSwitchFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <SSwitchBtnWrapper>
                <input id={`switch-filter-${short}`} type="checkbox" hidden checked={checked} name={short} onChange={handleClick} />
                <SSwitchBtn htmlFor={`switch-filter-${short}`}></SSwitchBtn>
            </SSwitchBtnWrapper>
        </SBtnSwitchFilter>
    )
}

export default function SearchFilter({isFilterClosed, filterIndex, filterParams}) {
    const [curFilter, setFilter] = useState(filters[filterIndex]);
    const set = v => DebouncedFuctionWithValue(200)(setFilter, v);

    useEffect(() => setFilter(filters[filterIndex]), [filterIndex])

    return (
        <SSearchFilterData className={isFilterClosed ? '' : 'opened'}>
            <SFilterHint>{localLib.close}</SFilterHint>
            {
                curFilter.countFilters.map(
                    flt => 
                    <CountFilter key={RandomKey()} {...flt} addParams={(k, v) => addParams(filterParams, k, v)} curFilter={curFilter} setFilter={set} />
                )
            }

            {
                curFilter.btnFilters.map(
                    flt => 
                    <BtnFilter key={RandomKey()} {...flt} addParams={(k, v) => addParams(filterParams, k, v)} curFilter={curFilter} setFilter={set} />
                )
            }

            {
                curFilter.switchFilters.map(
                    flt => 
                    <SwitchFilter key={RandomKey()} {...flt} addParams={(k, v) => addParams(filterParams, k, v)} curFilter={curFilter} setFilter={set} />
                )
            }
        </SSearchFilterData>
    )
}