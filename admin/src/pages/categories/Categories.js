import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Redux
import { getCategoryData, selectCategories } from 'store/categorySlice';

function Categories() {
    const state = useSelector(selectCategories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (state.loaded === false) {
            dispatch(getCategoryData());
        }
    });

    function renderCategory(category, index) {
        return (
            <div className="card" key={`category-${index}`}>
                <div className="card-header" id={`heading-${index}`}>
                    <h5 className="mb-0 d-flex justify-content-between align-items-center">
                        <button
                            className="btn btn-link collapsed"
                            data-toggle="collapse"
                            data-target={`#collapse-${index}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${index}`}>
                            { category.name }
                        </button>
                        <div className="justify-content-end">
                            { category.active ?
                                <span className="badge badge-success badge-pill">Active</span> :
                                <span className="badge badge-danger badge-pill">Inactive</span> }
                            <a className="btn btn-sm btn-primary ml-4" href={`/categories/${category.id}`}>Edit</a>
                        </div>

                    </h5>
                </div>
                <div
                    id={`collapse-${index}`}
                    className="collapse"
                    aria-labelledby={`heading-${index}`}
                    data-parent="#accordion">
                    <div className="card-body">
                        <ul>
                            { category.items.map((item, itemIndex) =>
                                <li key={`category-${index}-${itemIndex}`}>{ item.name }</li>) }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>Scorecard</h1>
            <div id="accordion">
                { state.data.map((category, index) => renderCategory(category, index)) }
            </div>
            <hr className="pb-0" />
            <div className="d-flex align-items-end justify-content-end">
                <a href="/categories/new" title="Create new category" className="btn btn-primary">Create</a>
            </div>
        </div>
    );
}

export default Categories;
