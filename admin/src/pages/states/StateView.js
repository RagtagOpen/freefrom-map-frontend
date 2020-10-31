import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import _ from 'lodash';

// Redux
import { getData, selectStates, selectState } from './stateSlice';

function StateView() {
    const { id } = useParams();

    const states = useSelector(selectStates);
    const state = useSelector(selectState(id));
    const dispatch = useDispatch();

    useEffect(() => {
        if (states.loaded === false) {
            dispatch(getData());
        }
    });

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/states">State Scores</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        { state.name }
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
                            disabled
                            defaultValue={ state.name } />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`state-abbrev-${state.id}`}>Abbreviation</label>
                        <input
                            id={`state-abbrev-${state.id}`}
                            type="text"
                            className="form-control"
                            name="abbrev"
                            disabled
                            defaultValue={ state.abbrev } />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`state-grade-${state.id}`}>Grade</label>
                        <select
                            id={`state-grade-${state.id}`}
                            className="form-control"
                            name="grade"
                            value={ state.grade }
                            disabled>
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
                <a href={`/states/${id}/edit`} title="Edit" className="btn btn-primary">Edit</a>
            </div>
        </div>
    );
}

export default StateView;
