import { useState, useEffect, useRef } from "react";
import { getItem, getMatrixItem } from "../api/lightspeed";

import Layout from "../../components/Layout";
import SingleItem from "../../components/product/SingleItem";
import MatrixItem from "../../components/product/MatrixItem";

export async function getServerSideProps({ res, query }) {
  res.setHeader("Cache-Control", `s-maxage=60, stale-while-revalidate`);
  const id = query.id;

  if (query.matrix) {
    const fetchMatrixItem = await getMatrixItem(id);
    const item = fetchMatrixItem.data.ItemMatrix;

    return {
      props: { item },
    };
  }

  const fetchItem = await getItem(id);
  let item = fetchItem.data.Item;

  return {
    props: { item },
  };
}

const Product = ({ item }) => {
  // Set const for useRef to prevent useEffect on page load where needed.
  const loaded = useRef(false);

  // State items
  const [image, setImage] = useState();
  const [checkedInputs, setCheckedInputs] = useState({});
  const [matrixItem, setMatrixItem] = useState();
  const [matrixLoading, setMatrixLoading] = useState(false);

  // Set Item || MatrixItem on Load
  useEffect(() => {
    setImage(
      `${item.Images.Image.baseImageURL}/w_300/${item.Images.Image.publicID}.jpg`
    );
  }, []);

  // Get Matrix Item on checkedInputs change.
  useEffect(() => {
    async function getMatrixItem() {
      setMatrixLoading(true);
      const res = await fetch(`/api/item?itemID=${checkedInputs}`);
      const { Item } = await res.json();
      setImage(
        Item.Images
          ? `${Item.Images.Image.baseImageURL}/w_300/${Item.Images.Image.publicID}.jpg`
          : "/loading.gif"
      );
      setMatrixItem(Item);
      setMatrixLoading(false);
    }
    if (loaded.current) {
      getMatrixItem();
    } else {
      loaded.current = true;
    }
  }, [checkedInputs]);

  // Handle matrix input
  const handleInputChange = (event) => {
    setCheckedInputs([event.target.value]);
  };

  if (!item) {
    return (
      <Layout>
        <div className="mt-24 flex justify-center">Loading..</div>
      </Layout>
    );
  }

  // Return Matrix Item
  if (item.itemMatrixID != 0) {
    return (
      <MatrixItem
        item={item}
        image={image}
        matrixItem={matrixItem}
        matrixLoading={matrixLoading}
        handleInputChange={handleInputChange}
        checkedInputs={checkedInputs}
      />
    );
  }

  // Return Single Item
  if (item.itemMatrixID == 0) {
    return <SingleItem item={item} />;
  }
};

export default Product;
