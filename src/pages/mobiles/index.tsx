import { HomeFooter } from "@/components/home/footer";
import { HomeHeader } from "@/components/home/header";
import { Input } from "@/components/ui/input";
import { MultirangeSlider } from "@/components/ui/multirange-slider";
import { useState } from "react";
import { Link } from "react-router-dom";

type ProductItem = {
  name: string,
  image: string,
  color: string,
  rom: number,
  description: string,
  screen: string,
  camera: string,
  battery: string,
  chip: string,
  warranty: string,
  price: number,
}

const products: ProductItem[] = [
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
  {
    name: 'Redmi 12 5G',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/b/m/g/-original-imagxaqtqng2hpxn.jpeg?q=70',
    color: 'Jade Black',
    rom: 128,
    description: '6 GB RAM | 128 GB ROM | Expandable Upto 1 TB',
    screen: '17.25 cm (6.79 inch) Full HD+ Display',
    camera: '50MP + 2MP | 8MP Front Camera',
    battery: '5000 mAh Battery',
    chip: 'Snapdragon 4 Gen 2 Processor',
    warranty: '1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In the Box Accessories',
    price: 12.499
  },
]

enum SortBy {
  POPULARITY = 'popularity',
  LOW_TO_HIGH = 'low_to_high',
  HIGH_TO_LOW = 'high_to_low',
}

const MobilesPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.POPULARITY);

  return (
    <>
      <HomeHeader />
      <div className="pt-[70px] bg-gray-200 px-2 pb-2 -mb-8">
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-1 bg-white rounded-md">
            <div className="text-lg font-semibold border-b-[1px] px-2 py-3">
              Filters
            </div>
            <div className="px-4 py-3 border-b-[1px]">
              <span className="font-semibold text-xs">CATEGORIES</span>
              <p className="font-semibold text-sm pl-4 py-2">Mobiles</p>
            </div>
            <div className="px-4 py-4">
              <span className="font-semibold text-xs">PRICE</span>
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
                to
                <Input className="focus-visible:ring-transparent h-[30px]" />
              </div>
            </div>
          </div>
          <div className="col-span-4 bg-white min-h-[700px] p-4 rounded-md border-b-[1px]">
            {
              products?.length > 0 ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">{products[0].name}</span>
                    <span className="text-gray-400 text-xs">(Showing 1 – {products.length} products of {products.length} products)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-semibold text-sm">Sort By</span>
                    <span onClick={() => setSortBy(SortBy.POPULARITY)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.POPULARITY ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Popularity</span>
                    <span onClick={() => setSortBy(SortBy.LOW_TO_HIGH)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.LOW_TO_HIGH ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Price -- Low to High</span>
                    <span onClick={() => setSortBy(SortBy.HIGH_TO_LOW)} className={`text-sm cursor-pointer p-1 ${sortBy === SortBy.HIGH_TO_LOW ? 'text-blue-500 border-b-2 border-blue-400 font-medium' : ''}`}>Price -- High to Low</span>
                  </div>
                  <div className="flex flex-col gap-6 py-4">
                    {
                      products.map(product => (
                        <Product product={product} />
                      ))
                    }
                  </div>
                </div>

              ) : <div>Not found product</div>
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
    <Link to={product.name} className="grid grid-cols-6 border-b-[1px] pb-8 cursor-pointer">
      <div className="col-span-1 flex items-center justify-center">
        <img className="h-[200px]" src={product.image} />
      </div>
      <div className="col-span-3">
        <div className="text-lg font-semibold mb-2">
          {product.name + ' (' + product.color + ', ' + product.rom + ' GB)'}
        </div>
        <div className="flex flex-col gap-1 px-2">
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.description}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.screen}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.camera}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.battery}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.chip}</span>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
            <span className="pr-2">•</span>
            <span className="text-sm">{product.warranty}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <span className="text-2xl font-bold">${products[0].price}</span>
        <span className="text-xs text-gray-700">Free delivery</span>
        <span className="text-xs text-purple-500 font-semibold">Saver deal</span>
      </div>
    </Link>
  )
}

export default MobilesPage;