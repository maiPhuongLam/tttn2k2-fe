import { HomeHeader } from "@/components/home/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth/auth-context";
import { formatMoneyVND } from "@/lib/utils/price";
import { addItemToCart, getMyCart, removeItemFromCart } from "@/services/cart";
import { HttpStatusCode } from "axios";
import { Minus, MoveLeft, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type CartItem = {
  id: number,
  isChoose: boolean,
  cartId: number,
  productItemId: number,
  quantity: number,
  price: string,
  createdAt: string,
  updatedAt: string,
  productItem: {
    id: number,
    SKU: string,
    quantityInStock: number,
    status: string,
    price: string,
    color: string,
    storage: string,
    name: string,
    ram: string,
    image: string,
    isDelete: boolean,
    productId: number,
    createdAt: string,
    updatedAt: string
  }
}

const CartPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<number>();
  const [isSelectAll, setIsSelectAll] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleGoHome = () => {
    navigate('/');
  }

  const handleGetCart = async () => {
    const rsp = await getMyCart();

    setCartItems(rsp.data.data.items);
    setCartId(rsp.data.data.cartId);

    const total = rsp.data.data.items.reduce((acc: number, cur: CartItem) => {
      return acc + parseInt(cur.price);
    }, 0);
    setTotalPrice(total);
  }

  useEffect(() => {
    handleGetCart();
  }, [])

  useEffect(() => {
    if(!isAuthenticated) {
      toast.error('Xin vui lòng đăng nhập');
      return;
    }
  }, [isAuthenticated])
  return (
    <>
      <HomeHeader />
      <div className="container w-[700px] py-6 flex flex-col pt-[80px] overflow-auto">
        <div className="flex gap-4 justify-center items-center relative w-full">
          <MoveLeft onClick={handleGoHome} className="absolute left-0 cursor-pointer" />
          <p className="font-bold text-base">Giỏ hàng của bạn</p>
        </div>
        {cartItems.length === 0 && (
          <div className="flex flex-col justify-between items-center h-[560px]">
            <div className="flex flex-col justify-center items-center mt-[230px]">
              <p>Giỏ hàng của bạn đang trống.</p>
              <p>Hãy chọn thêm sản phẩm để mua sắm nhé.</p>
            </div>
            <div className="flex w-full justify-center mt-auto">
              <Button onClick={handleGoHome} className="bg-main hover:bg-main hover:opacity-80 w-[400px]">Quay lại trang chủ</Button>
            </div>
          </div>
        )}
        {
          cartItems.length > 0 && (
            <>
              <div className="flex flex-col gap-4 items-center w-full pt-8">
                <div className="flex w-full justify-between items-center border-b-[1px]">
                  <div className="flex justify-center items-center gap-2">
                    <Input onChange={(e) => setIsSelectAll(e.target.checked)} className="w-[14px] accent-main cursor-pointer" type="checkbox" />
                    <span>{isSelectAll ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}</span>
                  </div>
                  <div className="italic text-gray-600 text-sm cursor-pointer">
                    Xóa sản phẩm đã chọn
                  </div>
                </div>
                <div className="flex flex-col gap-8 w-full pb-[120px]">
                  {
                    cartItems.map(cartItem => (
                      <CartItem cartId={cartId!} cartItem={cartItem} handleGetCart={handleGetCart} key={cartItem.id} />
                    ))
                  }
                </div>
              </div>
              <div className="fixed flex justify-between items-center w-[650px] h-[100px] bottom-0 bg-white z-10">
                <div className="text-lg">Tạm tính: <span className="text-main font-semibold">{formatMoneyVND(totalPrice)}</span></div>
                <Button className="bg-main hover:bg-main hover:opacity-85 ">Mua ngay</Button>
              </div>
            </>
          )
        }
      </div>
    </>
  )
}

const CartItem = ({ cartId, cartItem, handleGetCart }: { cartId: number, cartItem: CartItem, handleGetCart: () => void }) => {
  const handlePlusOrMinusItemInCart = async (isPlus: boolean = true) => {
    const rs = await addItemToCart({
      price: isPlus ? cartItem.productItem.price : (parseInt(cartItem.productItem.price) * -1).toString(),
      cartId: cartId,
      productItemId: cartItem.productItemId,
      quantity: isPlus ? 1 : -1
    })

    if (rs.status !== HttpStatusCode.Ok) {
      toast.success('Đã có lỗi xảy ra, xin vui lòng thử lại');
      return;
    }

    handleGetCart();
  }

  const handleRemoveItemFromCart = async () => {
    const rs = await removeItemFromCart(cartItem.id);

    if (rs.status !== HttpStatusCode.Ok) {
      toast.success('Đã có lỗi xảy ra, xin vui lòng thử lại');
      return;
    }

    handleGetCart();
  }

  return (
    <div className="flex gap-4 pb-2 border-b-[1px]">
      <Input className="w-[14px] accent-main" type='checkbox' />
      <div className="w-[100px] h-[100px] overflow-hidden">
        <img src={cartItem.productItem.image} className="w-[100px] h-[100px] object-contain object-center" />
      </div>
      <div className="flex flex-col gap-4 w-[300px]">
        <div className="hover:underline cursor-pointer">
          {cartItem.productItem.name + ' (' + cartItem.productItem.color + ', ' + cartItem.productItem.ram + ', ' + cartItem.productItem.storage + ')'}
        </div>
        <div className="text-main">
          {formatMoneyVND(+cartItem.price)}
        </div>
      </div>
      <div className="flex flex-col gap-6 ml-auto">
        <Trash2 onClick={handleRemoveItemFromCart} size={16} className="cursor-pointer ml-auto" />
        <div className="flex gap-2 items-center">
          <Minus onClick={() => handlePlusOrMinusItemInCart(false)} size={16} className="cursor-pointer bg-gray-200" />
          <input value={cartItem.quantity} disabled className="w-[50px] px-2 border-0 outline-none text-center" />
          <Plus onClick={() => handlePlusOrMinusItemInCart(true)} size={16} className="cursor-pointer bg-gray-200" />
        </div>
      </div>
    </div>
  )
}

export default CartPage;