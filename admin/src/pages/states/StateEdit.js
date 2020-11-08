import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {useLocation, useParams} from "react-router-dom";
import _ from 'lodash';

// Redux
import { getStateData, selectStates, selectState, saveStateData } from 'store/stateSlice';
import { getCategoryData, selectCategories } from 'store/categorySlice'

import StateGrade from "pages/states/StateGrade";

function StateEdit() {
    const history = useHistory();
    const [saving, setSaving] = useState(false);
    const { abbrev } = useParams();
    const location = useLocation();

    const states = useSelector(selectStates);
    const categories = useSelector(selectCategories);
    let data = useSelector(selectState(abbrev));

    const [state, setState] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.loaded === false) {
            dispatch(getCategoryData());
        }

        if (states.loaded === false) {
            dispatch(getStateData());
        }

        if (abbrev === undefined && location.pathname === '/states/new') {
            data = {
                "id": null,
                "name": "",
                "abbrev": "",
                "items": [],
            };
        }

        if (_.isEmpty(state) && !_.isEmpty(data)) {
            setState(_.cloneDeep(data));
        }
    });

    function redirectStatePage(e) {
        return history.push(`/states/${e.target.value}/edit`)
    }

    const saveStateScore = (e) => {
        e.preventDefault();
        e.target.textContent = "Saving..."
        setSaving(true);
        dispatch(saveStateData(state));
        e.target.textContent = "Saved!"
        setSaving(false);
        e.target.textContent = "Save"
    }

    function getValue(e) {
        let value = e.target.value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        return value;
    }

    const updateState = (e, id, categoryItem = null) => {
        const value = getValue(e);

        let updatedState;
        // If categoryItem is null, the property is not in items
        if (categoryItem === null) {
            updatedState = {
                ...state,
                [e.target.name]: value
            }
        } else {
            //
            let items = _.cloneDeep(state.items);

            // Check if we have the current item in the state items
            const stateItem = state.items.filter((item) => item.category_item_id === categoryItem.item.id);
            if (stateItem.length > 0) {

                let new_items = state.items.filter((item) => item.category_item_id !== categoryItem.item.id);

                let updated_item = _.cloneDeep(stateItem[0]);
                updated_item[e.target.name] = value;
                new_items.push(updated_item);

                items = new_items;
            } else {
                // Item doesn't exist, push new item
                let item = {
                    "id": null,
                    "category_item_id": categoryItem.item.id,
                    "meets_criteria": false,
                    "link_to_code": null,
                }

                item[e.target.name] = value;
                items.push(item);
            }



            updatedState = {
                ...state,
                items
            }
        }

        setState(updatedState);
    }

    function calcGrade() {
        // TODO: Figure out weighting and calculation for grading a state
        return (
            <StateGrade grade={2} />
        );
    }

    function calcCategoryGrade(category) {
        // TODO: Figure out weighting and calculation for grading a category
        return (
            <StateGrade grade={2} />
        );
    }

    function getStateCategoryItem(id) {
        if (_.has(state, 'items')) {
            const item = state.items.filter((item) => id === item.category_item_id);

            if (item.length > 0) {
                return item[0];
            }
        }

        return {
            "meets_criteria": false,
            "link_to_code": null
        }
    }

    function renderCategoryItem(item, category) {
        const key = `category-${category.id}-item-${item.id}`;
        const categoryItem = { category, item };

        const stateItem = getStateCategoryItem(item.id);

        return (
            <div className="card" key={key}>
                <div className="card-header" id={`heading-${key}`}>
                    <p className="mb-0 d-flex justify-content-between align-items-center">
                        <button
                            type="button"
                            className="btn btn-sm btn-link collapsed"
                            data-toggle="collapse"
                            data-target={`#collapse-${key}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${key}`}>
                            { item.name }
                        </button>
                    </p>
                </div>
                <div
                    id={`collapse-${key}`}
                    className="collapse"
                    aria-labelledby={`heading-${key}`}
                    data-parent={`#accordion-${category.id}`}>
                    <div className="card-body">
                        <div className="form-check pb-4">
                            <input
                                id={`category-item-criteria-${key}`}
                                className="form-check-input"
                                name="meets_criteria"
                                type="checkbox"
                                defaultChecked={ stateItem.meets_criteria }
                                onClick={ (e) =>
                                    updateState(e, state.id, categoryItem) } />
                            <label
                                className="form-check-label"
                                htmlFor={`category-item-criteria-${key}`}>Meets Criteria</label>
                        </div>

                        <div className="form-group">
                            <label htmlFor={`category-item-link-${key}`}>Link to State Code</label>
                            <input
                                id={`category-item-link-${key}`}
                                type="text"
                                className="form-control"
                                name="link_to_code"
                                defaultValue={ stateItem.link_to_code }
                                onKeyUp={ (e) =>
                                    updateState(e, state.id, categoryItem) } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderCategory(category, index) {
        return (
            <div className="card" key={`category-${index}`}>
                <div className="card-header" id={`heading-${index}`}>
                    <h5 className="mb-0 d-flex justify-content-between align-items-center">
                        <button
                            type="button"
                            className="btn btn-link collapsed"
                            data-toggle="collapse"
                            data-target={`#collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${index}`}>
                            { category.name }
                        </button>
                        { calcCategoryGrade(category) }
                    </h5>
                </div>
                <div
                    id={`collapse-${index}`}
                    className="collapse"
                    aria-labelledby={`heading-${index}`}
                    data-parent="#accordion">
                    <div className="card-body">
                        <div id={`accordion-${category.id}`}>
                            { category.items.map((item) => renderCategoryItem(item, category)) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb" style={{lineHeight: '30px'}}>
                    <li className="breadcrumb-item">
                        <a href="/states">State Scores</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        <select
                            className="form-control form-control-sm"
                            id="stateSelectDropdown"
                            onChange={ (e) => redirectStatePage(e) }
                            value={abbrev}>
                            { states.data.map((state) =>
                                <option key={state.abbrev} value={state.abbrev}>{state.name}</option>) }
                        </select>
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
                            defaultValue={ state.name }
                            onKeyUp={ (e) => updateState(e, state.id) } />
                    </div>

                    <div className="form-group">
                        <label htmlFor={`state-abbrev-${state.id}`}>Abbreviation</label>
                        <input
                            id={`state-abbrev-${state.id}`}
                            type="text"
                            className="form-control"
                            name="abbrev"
                            defaultValue={ state.abbrev }
                            onKeyUp={ (e) => updateState(e, state.id) } />
                    </div>
                    <h4>Score Card</h4>
                    <div id="accordion">
                        { categories.data.map((category, index) => renderCategory(category, index)) }
                    </div>
                </div>

            </form>
            <hr className="pb-0" />
            <div className="d-flex align-items-center justify-content-between">
                <h5>{ state.name } Overall Score: { calcGrade() }</h5>
                <button className="btn btn-primary" disabled={saving} onClick={ saveStateScore }>Save</button>
            </div>
        </div>
    );
}

export default StateEdit;
