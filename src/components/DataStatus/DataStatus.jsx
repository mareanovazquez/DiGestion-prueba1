export const DataStatus = (props) => {

    return (

        <div>
            {!props.responseText || props.responseText === 200 ? null : <div><h2>Error {props.responseText} </h2><h3>Page not found</h3></div>}
        </div>
    )
}