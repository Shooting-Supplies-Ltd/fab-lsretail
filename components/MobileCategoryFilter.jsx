const MobileCategoryFilter = (props) => {
  const { category, handleMobileInputChange, checkedCategories } = props

  return (
    <div className="mt-8 flex justify-center">
      <select name="catSelect" id="catSelect" className="border-2 border-black rounded" onChange={handleMobileInputChange}>
        <option selected disabled>Choose Category</option>
        {category.map(cat => {
          return (
            <option value={cat.categoryID} onSelect={checkedCategories[cat.name]} key={cat.categoryID}>{cat.name}</option>
          )
        })}
      </select>
    </div>
  )
}

export default MobileCategoryFilter