import React, { Component } from 'react'

import ScoreLabel from 'components/common/ScoreLabel'
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
                    style={{height: '60px', width: '100%', paddingLeft: 7}}
                    value={search}
                />
                <div className='mt-1' style={{height: '500px', overflowY: 'scroll'}}>
                    {visibleStates.length > 0
                        ? <ul style={{border: '1px solid #DDDDDD', backgroundColor: 'white', padding: 7}}>
                            {visibleStates.map(state => (
                                <>
                                    <StateCard
                                        score={state.score}
                                        state={state.state} />
                                    <hr style={{margin: 0, width: '95%'}}/>
                                </>
                            ))}
                        </ul>
                        : <p className='mt-2'>
                            No states found for search term.
                        </p>
                    }
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
            <ScoreLabel score={score} />
            <p className="card-text mb-1 font-weight-lighter font-italic" style={{fontSize: '0.7em'}}>
                This state does not prioritize...
            </p>
            <ModalButton text="Learn more" href={`/${state.toLowerCase()}`}/>
        </div>
    </li>
)
export default StatesList
