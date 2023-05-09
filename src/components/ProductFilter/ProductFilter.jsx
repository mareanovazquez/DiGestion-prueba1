import { useState } from 'react'

export const ProductFilter = ({ remitos, onFilterChange }) => {
    const [filterState, setFilterState] = useState('')

    const handleFilterChange = (e) => {
        setFilterState(e.target.value)
        onFilterChange(e.target.value)
    }

    return (
        <div>
            
            <input type="text" id="filter" value={filterState} onChange={handleFilterChange} placeholder='filtrar' />
            <ul>
                {remitos
                    .filter(product => product.comentarios.toLowerCase().includes(filterState.toLowerCase()))
                    .map(product => <li key={product.id}>{product.comentarios}</li>)
                }
            </ul>
        </div>
    )
}
