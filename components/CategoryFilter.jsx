import { useState, useEffect } from 'react'

const CategoryFilter = (props) => {

  const { category, handleInputChange, checkedCategories } = props

  return (
    <div className="mt-4 bg-fabred text-white p-4 rounded-r-lg lg:p-0 lg:bg-white lg:text-black lg:my-16 lg:p-2">
      <h4 className="mb-4 border-b-2 border-black font-bold">Filter By</h4>
      <div>
        <h5 className="mb-2 font-bold text-lg">Category</h5>
        {category.map(cat => {
          return (
            <div key={cat.categoryID} className="p-2 lg:p-0 hover:fabred" >
              <input type="checkbox" id={cat.categoryID} value={cat.categoryID} checked={checkedCategories[cat.name]} onChange={handleInputChange} />
              <label key={cat.categoryID} className="ml-2" htmlFor={cat.categoryID}>{cat.name}</label>
            </div>
          )
        })}
      </div>
    </div >
  )
}

export default CategoryFilter