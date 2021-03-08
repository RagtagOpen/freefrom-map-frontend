import React, { useState } from 'react'

import StateCard from './StateCard'

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
                            <li key={state.code}>
                                <StateCard state={state} />
                                <hr style={{margin: 0, width: '95%'}}/>
                            </li>
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

export default StatesList
