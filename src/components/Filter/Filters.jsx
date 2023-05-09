import { useState } from "react"

export const Filter = ({children})=> {
const [filterState, setFilterState] = useState ('')

const handleFilterChange = (e)=>{
    
    setFilterState(e.target.value)
} 
    return  children ({ filterState, handleFilterChange})
}