import { Library } from 'constants/language';
import { DebouncedFuctionWithValue } from 'functions/effects';
import { useInput } from 'functions/form';
import Speech from 'common/speech/speech';

import styled from 'styled-components';

const SSearchInputWrapper = styled.div`
    padding: 1rem;
    background: rgba(19, 0, 61, 0.8);
`;

const SSearchInput = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 2rem;
    background: rgba(255, 255, 255, 0.58);
    border-radius: 50px;
`;

const SSearchTextSide = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
`;

const STextSideIcon = styled.span`
    font-size: 1.5rem;
    margin-right: 1rem;
`;

const STextSideInput = styled.input`
    width: 100%;
    padding: .5rem;
    font-size: 1rem;
    color: var(--onHoverColor);
    background: none;
    border: none;
    outline: none;
    border-bottom: 1px solid var(--onHoverColor);

    &::placeholder{
        color: var(--offHoverColor);
        text-transform: uppercase;
    }
`;

const SSearchOptions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 20%;
`;

const SOptionsFilterIcon = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;

    & img {
        width: 100%;
        height: 100%;
    }
`;

const handleInput = DebouncedFuctionWithValue(1000);

export default function SearchInput({isFilterClosed, setFilterCloseState, searchType, setSearchText}) {
    const search = useInput('');

    const audioSearch = transcript => setSearchText(transcript) || search.setCertainValue(transcript);

    return (
        <SSearchInputWrapper>
            <SSearchInput>
                <SSearchTextSide>
                    <STextSideIcon>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </STextSideIcon>

                    <STextSideInput 
                        index="1" 
                        type="search" 
                        name="search"  
                        {...search.base}
                        required={true} 
                        minLength="4" 
                        maxLength="30"
                        placeholder={`${Library.getText('common.routes.searches.search')} ${searchType}`} 
                        onInput={e => handleInput(setSearchText, e.target.value)} 
                    />
                </SSearchTextSide>
                
                <SSearchOptions>
                    <SOptionsFilterIcon onClick={() => setFilterCloseState(!isFilterClosed)}>
                        <img src="/img/search-filter.png" alt="filter-icon"/>
                    </SOptionsFilterIcon>
                    
                    <Speech callback={audioSearch} />
                </SSearchOptions>
            </SSearchInput>
        </SSearchInputWrapper>
    )
}