import { Library } from 'constants/language';
import { useInput } from 'functions/form';
import { RandomKey } from 'functions/content';

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

const filters = [AllFilter, PeopleFilter, GroupFilter, PostFilter, VideoFilter];

const addParams = (params, k, v) => params[k] = v;

const CountFilter = ({param, title, addParams}) => {
    const min = useInput();
    const max = useInput();
    
    const handleChange = (e, isMax = false) => {
        if (isMax) return max.base.onChange(e) || addParams("".concat(param, 'max'), e.target.value);
        return min.base.onChange(e) || addParams("".concat(param, 'min'), e.target.value);
    }

    return (
        <SCountFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <div className="count-filter-inputs">
                <SCountFilterInput>
                    <span>{Library.getText('search.filter.from')}:</span>
                    <input type="number" name="min" value={min.base.value} onChange={e => handleChange(e)} />
                </SCountFilterInput>
                
                <SCountFilterInput>
                    <span>{Library.getText('search.filter.to')}:</span>
                    <input type="number" name="max" value={max.base.value} onChange={e => handleChange(e, true)} />
                </SCountFilterInput>
            </div>
        </SCountFilter>
    )
}

const OneBtnFilter = ({value, param, addParams}) => {
    const handleClick = () => addParams(param, value);

    return (
        <SBtnValueWrapper>
            <input hidden id={`btn-filter-${param}-${value}`} type="radio" name={param} value={value} onChange={handleClick} />
            <SBtnValue htmlFor={`btn-filter-${param}-${value}`}>{value}</SBtnValue>
        </SBtnValueWrapper>
    )
}

const BtnFilter = ({title, param, values = [], addParams}) => {
    return (
        <SBtnSwitchFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <SBtnValues>
                {values.map(value => <OneBtnFilter key={value} value={value} param={param} addParams={addParams} />)}
            </SBtnValues>
        </SBtnSwitchFilter>
    )
}

const SwitchFilter = ({title, short, addParams}) => {
    const handleClick = e => addParams(short, e.target.checked);

    return (
        <SBtnSwitchFilter>
            <SFilterTitle>{title}:</SFilterTitle>
            <SSwitchBtnWrapper>
                <input id={`switch-filter-${short}`} type="checkbox" hidden name={short} onChange={handleClick} />
                <SSwitchBtn htmlFor={`switch-filter-${short}`}></SSwitchBtn>
            </SSwitchBtnWrapper>
        </SBtnSwitchFilter>
    )
}

export default function SearchFilter({isFilterClosed, filterIndex, filterParams}) {
    const curFilter = filters[filterIndex];

    return (
        <SSearchFilterData className={isFilterClosed ? '' : 'opened'}>
            <SFilterHint>{Library.getText('search.filter.close')}</SFilterHint>

            {
                curFilter.countFilters.map(
                    ({title, short}) => 
                    <CountFilter key={RandomKey()} title={title} param={short} addParams={(k, v) => addParams(filterParams, k, v)} />
                    )
            }

            {
                curFilter.btnFilters.map(
                    ({title, short, values}) => 
                    <BtnFilter key={RandomKey()} title={title} param={short} values={values} addParams={(k, v) => addParams(filterParams, k, v)} />
                )
            }

            {
                curFilter.switchFilters.map(
                    value => 
                    <SwitchFilter key={RandomKey()} title={value.title} short={value.short} addParams={(k, v) => addParams(filterParams, k, v)} />
                )
            }

        </SSearchFilterData>
    )
}