import React, { useState } from 'react'

import ScoreLabel from 'components/common/ScoreLabel'
import ModalButton from "./modal/ModalButton"

function StatesList({ states }) {
    const [search, setSearch] = useState('')
    const visibleStates = states
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(state => !search || state.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    return (
        <>
            <input
                placeholder="Search for a state..."
                onChange={(evt) => setSearch(evt.target.value)}
                style={{height: '60px', width: '100%', paddingLeft: 7}}
                value={search}
            />
            <div className='mt-1' style={{height: '500px', overflowY: 'scroll'}}>
                {visibleStates.length > 0
                    ? <ul style={{border: '1px solid #DDDDDD', backgroundColor: 'white', padding: 7}}>
                        {visibleStates.map(state => (
                            <>
                                <StateCard state={state} />
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

const StateCard = ({state}) => {
    const {code, grade, name} = state
    return (
        <li>
            <div className="card-body p-2 mt-2">
                <h5 className="card-title" style={{textTransform: 'uppercase'}}>{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Rank: {grade.grade}st</h6>
                <ScoreLabel score={grade.grade} />
                <p className="card-text mb-1 font-weight-lighter font-italic" style={{fontSize: '0.7em'}}>
                    This state does not prioritize...
                </p>
                <ModalButton text="Learn more" href={`/states/${name.toLowerCase()}`}/>
            </div>
        </li>
    )
}

export default StatesList
