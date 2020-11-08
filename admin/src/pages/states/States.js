import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { getStateData, selectStates } from 'store/stateSlice';

// Components
import StateGrade from "./StateGrade";

function States() {
    const state = useSelector(selectStates);
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.loaded === false) {
            dispatch(getStateData());
        }
    });

    function renderStates(state, index) {
        return (
            <div className="card" key={`state-${index}`}>
                <div className="card-header" id={`heading-${index}`}>
                    <h5 className="mb-0 d-flex justify-content-between align-items-center">
                        <div className="align-items-start">
                            <span style={{width: "200px", display: "inline-block"}}>{ state.name }</span>
                            <StateGrade grade={ state.grade } />
                        </div>
                        <a className="btn btn-sm btn-primary ml-4" href={`/states/${state.abbrev}`}>Edit</a>
                    </h5>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>State Scores</h1>
            <div id="accordion">
                { state.data.map((state, index) => renderStates(state, index)) }
            </div>
            <hr className="pb-0" />
            <div className="d-flex align-items-end justify-content-end">
                <a href="/states/new" title="Create new state" className="btn btn-primary">Create</a>
            </div>
        </div>
    );
}

export default States;
