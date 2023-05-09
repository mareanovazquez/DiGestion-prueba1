export const DataProveedor = (props) => {

    const { data } = props;
    if (!data) {
        return null
    }
    return (
        <>
            <div>
                <h1>{props.data.nombre}</h1>
                

            </div>
        </>
    )
}