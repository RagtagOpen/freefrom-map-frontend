import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

// Redux
import { getStateData, selectStates, selectState } from 'store/stateSlice';
import { getCategoryData, selectCategories } from 'store/categorySlice'

import StateGrade from "pages/states/StateGrade";

function StateView() {
    const { abbrev } = useParams();
    const history = useHistory();

    const states = useSelector(selectStates);
    const categories = useSelector(selectCategories);
    const state = useSelector(selectState(abbrev));
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.loaded === false) {
            dispatch(getCategoryData());
        }

        if (states.loaded === false) {
            dispatch(getStateData());
        }
    });

    function redirectStatePage(e) {
        return history.push(`/states/${e.target.value}`)
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
        const stateItem = state.items.filter((item) => id === item.category_item_id);
        if (stateItem.length === 0) {
            // Not found in our state items array
            return {
                "meets_criteria": false,
                "link_to_code": null
            }
        }

        return stateItem[0];
    }

    function renderCategoryItem(item, index, categoryIndex) {
        if (!state.items.map((stateItem) => stateItem.category_item_id).includes(item.id)) {
            return;
        }

        const key = `category-${categoryIndex}-item-${index}`;
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
                    data-parent={`#accordion-${categoryIndex}`}>
                    <div className="card-body">
                        <div className="form-check pb-4">
                            <input
                                id={`category-item-criteria-${key}`}
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={ stateItem.meets_criteria }
                                disabled />
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
                                disabled
                                defaultValue={ stateItem.link_to_code }/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function renderCategory(category, index) {
        // Only render if we have an item from this category
        const itemsInCategory = category.items.map((item) => item.id);
        const checkItemInCategory = state.items.filter((item) => {
            if (itemsInCategory.includes(item.category_item_id)) {
                return true
            }

            return false
        });

        if (checkItemInCategory.length === 0) {
            return;
        }

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
                        <div id={`accordion-${index}`}>
                            { category.items.map((item, itemIndex) => renderCategoryItem(item, itemIndex, index)) }
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
                    <li className="breadcrumb-item active align-items-center" aria-current="page">
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
                    <h4>Score Card</h4>
                    <div id="accordion">
                        { categories.data.map((category, index) => renderCategory(category, index)) }
                    </div>
                </div>

            </form>
            <hr className="pb-0" />
            <div className="d-flex align-items-center justify-content-between">
                <h5>{ state.name } Overall Score: { calcGrade() }</h5>
                <a href={`/states/${abbrev}/edit`} title="Edit" className="btn btn-primary">Edit</a>
            </div>
        </div>
    );
}

export default StateView;
