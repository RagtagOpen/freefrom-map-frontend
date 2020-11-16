import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useLocation } from "react-router-dom";
import _ from 'lodash';

// Redux
import { saveCategoryData, getCategoryData, selectCategories, selectCategory } from 'store/categorySlice';
import {findWithAttr} from "helpers/utils";

function CategoryEdit() {
    const [saving, setSaving] = useState(false);
    const { id } = useParams();
    const location = useLocation();

    const categories = useSelector(selectCategories);
    let data = useSelector(selectCategory(id));

    const [category, setCategory] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.loaded === false) {
            dispatch(getCategoryData());
        }

        if (id === undefined && location.pathname === '/categories/new') {
            data = {
                "id": null,
                "name": "",
                "items": [],
                "active": false
            };
        }

        if (_.isEmpty(category) && !_.isEmpty(data)) {
            setCategory(_.cloneDeep(data));
        }
    });

    function getValue(e) {
        let value = e.target.value;

        if (e.target.type === "checkbox") {
            value = e.target.checked;
        }

        return value;
    }

    const updateCategory = (e) => {
        const value = getValue(e);

        const updatedState = {
            ...category,
            [e.target.name]: value
        }

        setCategory(updatedState);
    }

    const updateItem = (e, id) => {
        const value = getValue(e);

        // Get index of update item
        const index = findWithAttr(category.items, 'id', id);

        let items = _.cloneDeep(category.items);

        items[index][e.target.name] = value;

        let updatedState = {
            ...category,
            items
        }

        setCategory(updatedState);
    }

    const createItem = (e) => {
        e.preventDefault();
        let newCategory = _.cloneDeep(category);

        let tempId = category.items.length + 1;
        newCategory.items.push({
            "id": tempId,
            "name": "",
            "recommendation_text": "",
            "active": false
        })
        setCategory(newCategory);
    }

    const saveCategory = (e) => {
        e.preventDefault();
        e.target.textContent = "Saving..."
        setSaving(true);
        dispatch(saveCategoryData(category));
        e.target.textContent = "Saved!"
        setSaving(false);
        e.target.textContent = "Save"
    }

    function renderItem(item) {
        return (
            <div className="card mb-2" key={`category-item-${item.id}`}>
                <div className="card-body">
                    <h5 className="card-title">{ item.name || "New Item" }</h5>
                    <div className="card-text">
                        <div className="form-group">
                            <label htmlFor={`category-item-${item.id}-title`}>Title</label>
                            <input
                                id={`category-item-${item.id}-title`}
                                className="form-control"
                                name="name"
                                onKeyUp={ (e) => updateItem(e, item.id) }
                                defaultValue={ item.name } />
                        </div>
                        <div className="form-group">
                            <label htmlFor={`category-item-${item.id}-rec`}>Recommendation Text</label>
                            <input
                                id={`category-item-${item.id}-rec`}
                                name="recommendation_text"
                                className="form-control"
                                defaultValue={ item.recommendation_text } />
                        </div>
                        <div className="form-check">
                            <input
                                id={`category-item-active-${category.id}`}
                                className="form-check-input"
                                name="active"
                                type="checkbox"
                                defaultChecked={ item.active } />
                            <label
                                className="form-check-label"
                                htmlFor={`category-item-active-${category.id}`}>Active</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <a href="/categories">Scorecard</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        { category.name || "New Category" }
                    </li>
                </ol>
            </nav>

            <form>
                <div className="pb-4">
                    <div className="form-group">
                        <label htmlFor={`category-title-${category.id}`}>Title</label>
                        <input
                            id={`category-title-${category.id}`}
                            type="text"
                            className="form-control"
                            name="name"
                            onKeyUp={ updateCategory }
                            defaultValue={ category.name } />
                    </div>

                    <div className="form-check">
                        <input
                            id={`category-active-${category.id}`}
                            className="form-check-input"
                            type="checkbox"
                            name="active"
                            onClick={ updateCategory }
                            defaultChecked={ category.active } />
                        <label
                            className="form-check-label"
                            htmlFor={`category-active-${category.id}`}>Active</label>
                    </div>
                </div>


                <div className="d-flex justify-content-between align-items-center">
                    <h4>Criteria</h4>
                    <button className="btn btn-sm btn-success" onClick={ createItem }>Create</button>
                </div>

                { _.has(category, 'items') && category.items.map((item) => renderItem(item)) }
            </form>
            <hr className="pb-0" />
            <div className="d-flex align-items-end justify-content-end">
                <button className="btn btn-primary" disabled={saving} onClick={ saveCategory }>Save</button>
            </div>
        </div>
    );
}

export default CategoryEdit;
