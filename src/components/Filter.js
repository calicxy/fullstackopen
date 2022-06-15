const Filter = (props) => {
    const {text, filterText, onchange} = props
    return(
        <div>
            {text} <input value={filterText} onChange={onchange}/>
        </div>
    )
}
export default Filter