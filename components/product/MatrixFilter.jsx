const MatrixFilter = (props) => {
  const { item, handleInputChange, checkedInputs } = props

  return (
    <div className="my-6">
      <h5 className="mb-2 font-bold">Options</h5>
      <label htmlFor=""></label>
      <select name="options" id="options" className="border-2 border-black rounded" onChange={handleInputChange}>
        <option selected disabled>Choose Colour</option>
        {item.Items.Item.map(item => {
          return (
            <option value={item.itemID} className="text-sm" onSelect={checkedInputs[item.itemID]} key={item.itemID}>{item.description.split(' ').pop()}</option>
          )
        })}
      </select>
    </div>
  )
}

export default MatrixFilter