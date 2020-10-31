import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import _ from 'lodash';

// Redux
import { saveData, getData, selectStates, selectState } from './stateSlice';

function StateEdit() {
    const [saving, setSaving] = useState(false);
    const { id } = useParams();
    const location = useLocation();

    const states = useSelector(selectStates);
    let data = useSelector(selectState(id));

    const [state, setState] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (states.loaded === false) {
            dispatch(getData());
        }

        if (id === undefined && location.pathname === '/states/new') {
            data = {
                "id": null,
                "name": "",
                "abbrev": "",
                "grade": null
            };
        }

        if (_.isEmpty(state) && !_.isEmpty(data)) {
            setState(_.cloneDeep(data));
        }
    });

    function getValue(e) {
        let value = e.target.value;

        if (e.target.name === "grade") {
            value = parseInt(e.target.value);
        }

        return value;
    }

    const updateState = (e) => {
        const value = getValue(e);

        const updatedState = {
            ...state,
            [e.target.name]: value
        }

        setState(updatedState);
    }

    const saveState = (e) => {
        e.preventDefault();
        e.target.textContent = "Saving..."
        setSaving(true);
        dispatch(saveData(state));
        e.target.textContent = "Saved!"
        setSaving(false);
        e.target.textContent = "Save"
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/states">State Scores</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        { state.name || "New State" }
                    </li>
                </ol>
            </nav>

            <form>
                <div className="pb-4">
                    <div className="form-group">
                        <label htmlFor={`state-name-${state.id}`}>Name</label>
                        <input
                            id={`state-name-${state.id}`}
                            type="text"
                            className="form-control"
                            name="name"
                            onKeyUp={ updateState }
                            defaultValue={ state.name } />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`state-abbrev-${state.id}`}>Abbreviation</label>
                        <input
                            id={`state-abbrev-${state.id}`}
                            type="text"
                            className="form-control"
                            name="abbrev"
                            onKeyUp={ updateState }
                            defaultValue={ state.abbrev } />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`state-grade-${state.id}`}>Grade</label>
                        <select
                            id={`state-grade-${state.id}`}
                            className="form-control"
                            name="grade"
                            onChange={ updateState }
                            placeholder="Select Grade"
                            value={ state.grade !== null ? state.grade : '' }>
                            <option value="" disabled>Select Grade</option>
                            <option value="0">A</option>
                            <option value="1">B</option>
                            <option value="2">C</option>
                            <option value="3">D</option>
                            <option value="4">F</option>
                        </select>
                    </div>
                </div>
            </form>
            <hr className="pb-0" />
            <div className="d-flex align-items-end justify-content-end">
                <button className="btn btn-primary" disabled={ saving } onClick={ saveState }>Save</button>
            </div>
        </div>
    );
}

export default StateEdit;
