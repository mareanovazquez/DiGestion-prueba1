import { useState } from "react"

export const Filter = ({ children }) => {
    const [filterState, setFilterState] = useState('')
    const [filterStateR, setFilterStateR] = useState('')
    const [filterStateFR, setFilterStateFR] = useState('')
    const [filterStateFRdti, setFilterStateFRdti] = useState('')

    const handleFilterChange = (e) => {
        setFilterState(e.target.value)
    }

    const handleFilterChangeR = (e) => {
        setFilterStateR(e.target.value)
    } 

    const handleFilterChangeFR = (e) => {
        setFilterStateFR(e.target.value)
    }

    const handleFilterChangeFRdti = (e) => {
        setFilterStateFRdti(e.target.value)
    }
        return children({ filterState, handleFilterChange, filterStateR, handleFilterChangeR, filterStateFR, handleFilterChangeFR, filterStateFRdti, handleFilterChangeFRdti })
} 