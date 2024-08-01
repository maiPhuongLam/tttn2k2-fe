import { HomeFooter } from "@/components/home/footer";
import { HomeHeader } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import cartLogo from '@/assets/svgs/cart.svg';
import flashLogo from '@/assets/svgs/flash.svg';
import { TagIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductItem } from "../mobiles";
import { getProductItems } from "@/services/product";
import { formatMoneyVND } from "@/lib/utils/price";
import { addItemToCart, getMyCart } from "@/services/cart";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { orderCheckout } from "@/services/order";

const DetailProduct = () => {
  const { productId, itemId } = useParams();
  const navigate = useNavigate();

  const [cartId, setCartId] = useState<number>();

  const [product, setProduct] = useState<ProductItem>();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  //FILTER
  const [colors, setColors] = useState<string[]>([]);
  const [storages, setStorages] = useState<string[]>([]);
  const [rams, setRams] = useState<string[]>([]);

  const handleChooseProductItem = ({ type, value }: { type: string, value: string }) => {
    const filters = {
      color: product?.color,
      storage: product?.storage,
      ram: product?.ram,
      [type]: value
    };

    const newProductItem = products.find(p => p.color === filters.color && p.storage === filters.storage && p.ram === filters.ram);
    if(newProductItem?.productId && newProductItem.itemId) {
      navigate(`/mobile/${newProductItem?.productId}/${newProductItem?.itemId}`);
    }
  }

  const handleAddItemToCart = async () => {
    if(cartId === undefined) {
      toast.error('Xin vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }

    if(product) {
      const rs = await addItemToCart({
        price: product.price.toString(),
        cartId,
        productItemId: product.itemId,
        quantity: 1
      })

      if(rs.status === HttpStatusCode.Ok) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công');
      }
    }
  }

  const handleBuyNow = async () => {
    if(cartId === undefined) {
      toast.error('Xin vui lòng đăng nhập mua sản phẩm');
      return;
    }

    if(product) {
      const rs = await orderCheckout({
        productItems: [{
          image: product.image,
          name: product.name,
          price: product.price.toString(),
          productItemId: 0,
          quantity: 1,
          SKU: product.sku
        }]
      });

      if(rs.data.data) {
        window.open(rs.data.data, '_blank');
      }
    }
  }

  useEffect(() => {
    const handleGetCart = async () => {
      const rsp = await getMyCart();

      setCartId(rsp.data.data.cartId);
    }

    handleGetCart();
  }, [])

  useEffect(() => {
    const handleGetProductItems = async () => {
      if (productId && itemId) {
        const rsp = await getProductItems(productId);
        const item = rsp.data.data.find((e: any) => e.itemId === parseInt(itemId));
        if (item) {
          setProduct(item);
        }
        
        setProducts(rsp.data.data);

        const mColors = new Set<string>();
        const mStorages = new Set<string>();
        const mRams = new Set<string>();
        rsp.data.data.forEach((e: any) => {
          mColors.add(JSON.stringify({ color: e.color, image: e.image }));
          mStorages.add(e.storage as string);
          mRams.add(e.ram as string);
        })

        setColors(Array.from(mColors));
        setStorages(Array.from(mStorages));
        setRams(Array.from(mRams));
      }
    }

    handleGetProductItems();
  }, [productId, itemId])

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
            <div className="block flex-none grid-cols-none grid-rows-none overflow-visible">
              <div className={`sticky top-4 bottom-0 z-[2] transition-all ${isScrolled ? 'pt-[60px]' : ''}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center items-center w-full p-4 border-[1px] rounded-md">
                    <img className="w-[200px] h-auto" src={product?.image} />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <Button onClick={handleAddItemToCart} className="bg-yellow-500 w-[46%] hover:bg-yellow-400 flex gap-2 items-center">
                      <img className="w-[26px]" src={cartLogo} />
                      THÊM VÀO GIỎ HÀNG
                    </Button>
                    <Button onClick={handleBuyNow} className="bg-orange-500 w-[46%] hover:bg-orange-400 flex gap-2 items-center">
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
              {product?.name + ' (' + product?.color + ', ' + product?.storage + ')'}
            </div>

            <span className="font-semibold text-3xl">{formatMoneyVND(product?.price || 0)}</span>

            <div className="flex flex-col gap-2 mt-6">
              <span className="font-bold">Ưu đãi có sẵn</span>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Ưu đãi từ ngân hàng</span>
                <p>Hoàn tiền 5% trên thẻ MPL Bank</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Giá đặc biệt</span>
                <p>Nhận thêm 50.000đ giảm giá (giá đã bao gồm hoàn tiền/phiếu giảm giá)</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TagIcon color="green" size={18} />
                <span className="font-semibold">Quà tặng</span>
                <p>Giảm ngay 100.000đ khi đặt phòng khách sạn qua MPLtrip</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-12">
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  {/* <img className="w-[40px]" src='https://rukminim2.flixcart.com/image/160/160/prod-fk-cms-brand-images/d0d3c5ff7637bf920698714cd1ef98ab6b9044248c18406786f1e516a12bcb66.jpg?q=90' /> */}
                </div>
                <div className="text-gray-700">
                  {'Bảo hành 1 năm của nhà sản xuất cho điện thoại và 6 tháng cho các phụ kiện đi kèm'}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>Màu sắc</p>
                </div>
                <div className="flex items-center gap-4">
                  {
                    colors.map(color => (
                      <div key={color} onClick={() => handleChooseProductItem({ type: 'color', value: JSON.parse(color).color })} className={`cursor-pointer px-4 py-1 border-2 rounded-sm ${product?.color === JSON.parse(color).color ? ' border-blue-500' : ''}`}>
                        <img className="w-[30px]" src={JSON.parse(color).image} />
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>Bộ nhớ</p>
                </div>
                <div className="flex items-center gap-4">
                  {
                    storages.map(storage => (
                      <div key={storage} onClick={() => handleChooseProductItem({ type: 'storage', value: storage })} className={`cursor-pointer px-4 py-1 font-medium border-2 rounded-sm ${product?.storage === storage ? ' border-blue-500' : ''}`}>
                        {storage}
                      </div>
                    ))
                  }
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-[60px] mr-2">
                  <p>RAM</p>
                </div>
                <div className="flex items-center gap-4">
                  {
                    rams.map(ram => (
                      <div key={ram} onClick={() => handleChooseProductItem({ type: 'ram', value: ram })} className={`cursor-pointer px-4 py-1 font-medium border-2 rounded-sm ${product?.ram === ram ? ' border-blue-500' : ''}`}>
                        {ram}
                      </div>
                    ))
                  }
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