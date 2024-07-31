import { formatMoneyVND } from "@/lib/utils/price"
import { ProductType } from "@/pages/home"
import { Link } from "react-router-dom"

export const ProductItem = ({ product }: { product: ProductType }) => {
  return (
    <Link to={`/mobiles/${product.productId}`} className="flex flex-col gap-4 rounded-lg h-[300px] px-4 py-6 shadow-lg border-gray-200 border-[1px] cursor-pointer hover:opacity-60">
      <div className="w-full flex items-center justify-center">
        <img className="w-[160px] h-[160px]" src={product.image} />
      </div>
      <div className="font-medium text-sm break-words">{product.name}</div>
      <div className="text-main font-semibold text-lg mt-auto">{formatMoneyVND(product.price)}</div>
    </Link>
  )
}
