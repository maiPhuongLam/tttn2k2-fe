import { HomeFooter } from "@/components/home/footer";
import { HomeHeader } from "@/components/home/header";
import { Input } from "@/components/ui/input";
import { MultirangeSlider } from "@/components/ui/multirange-slider";
import { formatMoneyVND } from "@/lib/utils/price";
import { getProductItems } from "@/services/product";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export type ProductItem = {
  itemId: number,
  productId: number,
  sku: string,
  quantityInStock: number,
  status: string,
  price: number,
  color: string,
  storage: string,
  ram: string,
  image: string,
  name: string,
  releaseDate: string,
  screenSize: string,
  camera: string,
  processor: string,
  os: string,
  isDelete: string,
}

enum SortBy {
  POPULARITY = 'popularity',
  LOW_TO_HIGH = 'low_to_high',
  HIGH_TO_LOW = 'high_to_low',
}

const MobilesPage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const { productId } = useParams();
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.POPULARITY);

  useEffect(() => {
    const handleGetProductItems = async () => {
      if(productId) {
        const rsp = await getProductItems(productId);
        setProducts(rsp.data.data);
      }
    }

    handleGetProductItems();
  }, [productId])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);
  return (
    <>
      <HomeHeader />
      <div className="pt-[70px] bg-gray-200 px-2 pb-2 -mb-8">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-1 bg-white rounded-md">
            <div className="text-lg font-semibold border-b-[1px] px-2 py-3">
              Bộ lọc
            </div>
            <div className="px-4 py-3 border-b-[1px]">
              <span className="font-semibold text-xs">DANH MỤC</span>
              <p className="font-semibold text-sm pl-4 py-2">Điện thoại</p>
            </div>
            <div className="px-4 py-4">
              <span className="font-semibold text-xs">GIÁ</span>
              <div className="px-4 py-2">
                <MultirangeSlider
                  min={0}
                  max={100}
                  minStepsBetweenThumbs={1}
                  step={1}
                />
              </div>
              <div className="px-4 py-2 flex gap-4 items-center">
                <Input className="focus-visible:ring-transparent h-[30px]" />
                đến
                <Input className="focus-visible:ring-transparent h-[30px]" />
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-white min-h-[700px] p-4 rounded-md border-b-[1px]">
            {
              products?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{products?.[0]?.name}</span>
                    <span className="text-gray-400 text-xs">(Hiển thị 1 – {products.length} sản phẩm trong tổng số {products.length} sản phẩm)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-sm">Xếp theo</span>
                    <span onClick={() => setSortBy(SortBy.POPULARITY)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.POPULARITY ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Phổ biến</span>
                    <span onClick={() => setSortBy(SortBy.LOW_TO_HIGH)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.LOW_TO_HIGH ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Giá Thấp - cao</span>
                    <span onClick={() => setSortBy(SortBy.HIGH_TO_LOW)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.HIGH_TO_LOW ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Giá Cao - thấp</span>
                  </div>
                  <div className="flex flex-col gap-6 py-4">
                    {
                      products.map(product => (
                        <Product key={product.itemId} product={product} />
                      ))
                    }
                  </div>
                </div>

              ) : <div>Không tìm thấy sản phẩm</div>
            }
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  )
}

const Product = ({ product }: { product: ProductItem }) => {
  return (
    <Link to={`/mobile/${product.productId}/${product.itemId}`} className="grid grid-cols-6 border-b-[1px] pb-8 cursor-pointer">
      <div className="col-span-1 flex items-center justify-center">
        <img className="h-[200px]" src={product.image} />
      </div>
      <div className="col-span-3">
        <div className="text-lg font-semibold mb-2">
          {product.name + ' (' + product.color + ', ' + product.storage + ')'}
        </div>
        <div className="flex flex-col gap-1 px-2">
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.camera}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.screenSize}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.os}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.processor}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{'1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories'}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <span className="text-2xl font-bold">{formatMoneyVND(product.price)}</span>
        <span className="text-xs text-gray-700">Giao hàng miễn phí</span>
        <span className="text-xs text-purple-500 font-semibold">Ưu đãi tiết kiệm</span>
      </div>
    </Link>
  )
}

export default MobilesPage;