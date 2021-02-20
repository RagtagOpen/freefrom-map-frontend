import React, { Component } from 'react'

import ModalButton from "./modal/ModalButton"
import stateScores from "../public/data/state-scores.json"

class StatesList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    _onChangeSearch = (evt) => {
        this.setState({search: evt.target.value})
    }

    render () {
        const {search} = this.state
        const visibleStates = stateScores.filter(state => !search || state.state.toLowerCase().indexOf(search.toLowerCase()) !== -1)
        return (
            <>
                <input
                    placeholder="Search for a state..."
                    onChange={this._onChangeSearch}
                    style={{height: '60px', width: '100%'}}
                    value={search}
                />
                <div className='mt-1' style={{height: '500px', overflowY: 'scroll'}}>
                    <ul style={{border: '1px solid #DDDDDD', backgroundColor: 'white', padding: 0}}>
                        {visibleStates.map(state =>
                            <>
                                <StateCard key={state.state} score={state.score} state={state.state} />
                                <hr style={{margin: 0, width: '95%'}}/>
                            </>
                        )}
                    </ul>
                </div>
            </>
        )
    }

}

const StateCard = ({state, score}) => (
    <li>
        <div className="card-body p-2 mt-2">
            <h5 className="card-title" style={{textTransform: 'uppercase'}}>{state}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Rank: {score}st</h6>
            <div style={{borderRadius: '5px', width: 'fit-content', fontSize: '0.8em', textTransform: 'uppercase', backgroundColor: '#F29C9A', padding: '5px 7px'}}>
                little accountability
            </div>
            <p className="card-text mb-1 font-weight-lighter font-italic" style={{fontSize: '0.7em'}}>
                This state does not prioritize...
            </p>
            <ModalButton text="Learn more" href={`/${state.toLowerCase()}`}/>
        </div>
    </li>
)
export default StatesList
