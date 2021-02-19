import { useState, useEffect, useRef } from 'react'
import { getItem, getItems, getMatrixItem } from '../api/lightspeed'

import Layout from '../../components/Layout'
import SingleItem from '../../components/product/SingleItem'
import MatrixItem from '../../components/product/MatrixItem'

export async function getStaticPaths() {
  const res = await getItems()
  const data = await res.data.Item
  let IDs = []
  
  if (!data || data === undefined) return
  
  data.map(item => {
    if (item.manufacturerID === '55' && item.itemMatrixID != '0') {
      IDs.push(item.itemMatrixID)
    }
    if (item.itemMatrixID === '0') {
      IDs.push(item.itemID)
    }
  })
  
  const paths = IDs.map(id => ({
    params: { id }
  }))
  
  return { paths, fallback: true }
}

export async function getStaticProps({ params: { id } }) {
  // Get Item using ID and check if it is a FAB Item, Matrix or Single Item
  const res = await getItem(id)
  let item = await res.data.Item

  if (!item || item === undefined) return 
  
  if (item.manufacturerID === '55' && item.itemMatrixID != '0') {
    const res = await getMatrixItem(id)
    item = await res.data.ItemMatrix
  }
  
  if (item.manufacturerID != '55') {
    const res = await getMatrixItem(id)
    item = await res.data.ItemMatrix
  }
  
  return {
    props: { item },
    revalidate: 10
  }
}

const Product = ({ item }) => {
  // Set const for useRef to prevent useEffect on page load where needed.
  const loaded = useRef(false);

  // State items
  const [image, setImage] = useState()
  const [checkedInputs, setCheckedInputs] = useState({})
  const [matrixItem, setMatrixItem] = useState()
  const [matrixLoading, setMatrixLoading] = useState(false)

  // Set Item || MatrixItem on Load
  useEffect(() => {
    setImage(`${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`)
  }, [])

  // Get Matrix Item on checkedInputs change.
  useEffect(() => {
    async function getMatrixItem() {
      setMatrixLoading(true)
      const res = await fetch(`/api/item?itemID=${checkedInputs}`)
      const { Item } = await res.json()
      setImage(Item.Images ? `${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg` : "/loading.gif")
      setMatrixItem(Item)
      setMatrixLoading(false)
    }
    if (loaded.current) {
      getMatrixItem()
    } else {
      loaded.current = true;
    }
  }, [checkedInputs])

  // Handle matrix input
  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value])
  }

  if (!item) {
    return (
      <Layout>
        <div className="mt-24 flex justify-center">
          Loading..
      </div>
      </Layout>
    )
  }

  // Return Matrix Item
  if (item.itemMatrixID != 0) {
    return (
      <MatrixItem item={item} image={image} matrixItem={matrixItem} matrixLoading={matrixLoading} handleInputChange={handleInputChange} checkedInputs={checkedInputs} />
    )
  }

  // Return Single Item
  if (item.itemMatrixID == 0) {
    return (
      <SingleItem item={item} />
    )
  }
}

export default Product

