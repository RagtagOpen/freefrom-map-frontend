import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import _ from 'lodash';

// Redux
import { getCategoryData, selectCategories, selectCategory } from 'store/categorySlice';

function CategoryView() {
    const { id } = useParams();

    const categories = useSelector(selectCategories);
    const category = useSelector(selectCategory(id));
    const dispatch = useDispatch();

    useEffect(() => {
        if (categories.loaded === false) {
            dispatch(getCategoryData());
        }
    });

    function renderItem(item) {
        return (
            <div className="card mb-2" key={`category-item-${item.id}`}>
                <div className="card-body">
                    <h5 className="card-title">{ item.name }</h5>
                    <div className="card-text">
                        <div className="form-group">
                            <label htmlFor={`category-item-${item.id}`}>Recommendation Text</label>
                            <input
                                id={`category-item-${item.id}`}
                                className="form-control"
                                disabled
                                defaultValue={ item.recommendation_text } />
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={ item.active }
                                disabled />
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
                        { category.name }
                    </li>
                </ol>
            </nav>

            <form>
                <div className="pb-4">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            id={`category-title-${category.id}`}
                            type="text"
                            className="form-control"
                            disabled
                            defaultValue={ category.name } />
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            defaultChecked={ category.active }
                            disabled />
                        <label
                            className="form-check-label"
                            htmlFor={`category-active-${category.id}`}>Active</label>
                    </div>
                </div>


                <label>Criteria</label>
                { _.has(category, 'items') && category.items.map((item) => renderItem(item)) }
            </form>
            <hr className="pb-0" />
            <div className="d-flex align-items-end justify-content-end">
                <a href={`/categories/${id}/edit`} title="Edit" className="btn btn-primary">Edit</a>
            </div>
        </div>
    );
}

export default CategoryView;
