import { getMatrixItem } from './lightspeed';

export default async (req, res) => {
  const { itemID } = req.query
  const response = await getMatrixItem(itemID)

  res.json(response.data)
}