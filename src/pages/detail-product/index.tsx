import { HomeFooter } from "@/components/home/footer";
import { HomeHeader } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import cartLogo from '@/assets/svgs/cart.svg';
import flashLogo from '@/assets/svgs/flash.svg';
import { TagIcon } from "lucide-react";
import { useEffect, useState } from "react";

const product = {
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
}

const DetailProduct = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <HomeHeader />
      <div className="container pt-[80px]">
        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-2">
            <div className="block flex-none grid-cols-none grid-rows-none overflow-visible h-[1000px]">
              <div className={`sticky top-4 bottom-0 z-[2] transition-all ${isScrolled ? 'pt-[60px]' : ''}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center items-center w-full p-4 border-[1px] rounded-md">
                    <img className="w-[200px] h-auto" src={product.image} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Button className="bg-yellow-500 w-[46%] hover:bg-yellow-400 flex gap-2 items-center">
                      <img className="w-[26px]" src={cartLogo} />
                      THÊM VÀO GIỎ HÀNG
                    </Button>
                    <Button className="bg-orange-500 w-[46%] hover:bg-orange-400 flex gap-2 items-center">
                      <img className="w-[26px]" src={flashLogo} />
                      MUA NGAY
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-3 pb-12">
            <div className="text-lg font-medium mb-2">
              {product.name + ' (' + product.color + ', ' + product.rom + ' GB)'}
            </div>

            <span className="font-semibold text-3xl">${product.price}</span>

            <div className="flex flex-col gap-2 mt-6">
              <span className="font-bold">Available offers</span>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Bank offer</span>
                <p>5% Cashback on MPL Axis Bank Card</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Special Price</span>
                <p>Get extra $100 off (price inclusive of cashback/coupon)</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Freebie</span>
                <p>Flat $100 off on Cleartrip hotels booking along with 300 supercoins on booking</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <img className="w-[40px]" src='https://rukminim2.flixcart.com/image/160/160/prod-fk-cms-brand-images/d0d3c5ff7637bf920698714cd1ef98ab6b9044248c18406786f1e516a12bcb66.jpg?q=90' />
                </div>
                <div className="">
                  {product.warranty}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>Color</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1 border-2 rounded-sm border-blue-500">
                    <img className="w-[30px]" src={product.image} />
                  </div>
                  <div className="px-4 py-1 border-2 rounded-sm">
                    <img className="w-[30px]" src={product.image} />
                  </div>
                  <div className="px-4 py-1 border-2 rounded-sm">
                    <img className="w-[30px]" src={product.image} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>Storage</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1 font-medium border-2 rounded-sm border-blue-500">
                    {product.rom + ' GB'}
                  </div>
                  <div className="px-4 py-1 font-medium border-2 rounded-sm">
                    {product.rom + ' GB'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>RAM</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="px-4 py-1 font-medium border-2 rounded-sm border-blue-500">
                    {4 + ' GB'}
                  </div>
                  <div className="px-4 py-1 font-medium border-2 rounded-sm">
                    {6 + ' GB'}
                  </div>
                  <div className="px-4 py-1 font-medium border-2 rounded-sm">
                    {8 + ' GB'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </>
  )
}

export default DetailProduct;