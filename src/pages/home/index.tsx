import { HomeHeader } from "@/components/home/header";
import { HomeAds } from "./ads";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductItem } from "@/components/product/item";
import { HomeFooter } from "@/components/home/footer";
import { useEffect, useState } from "react";
import { getProducts } from "@/services/product";
import { HttpStatusCode } from "axios";
import { v4 as uuid } from 'uuid';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const hotPhones = [
  {
    name: 'Apple',
    value: 'apple'
  },
  {
    name: 'Samsung',
    value: 'samsung'
  },
  {
    name: 'Xiaomi',
    value: 'xiaomi'
  },
  {
    name: 'Oppo',
    value: 'oppo'
  },
  {
    name: 'Realme',
    value: 'realme'
  },
]

export type ProductType = {
  productId: number,
  name: string,
  image: string,
  releaseDate: string,
  storage: string,
  color: string,
  price: number,
  itemId: number
}

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams] = useSearchParams();
  const phoneType = searchParams.get('phone_type');
  const page = searchParams.get('page') || "1";

  const navigate = useNavigate();

  useEffect(() => {
    const handleGetProducts = async () => {
      const rsp = await getProducts({
        name: phoneType,
        pageSize: 18,
        page: parseInt(page)
      });
      if (rsp.status === HttpStatusCode.Ok) {
        setProducts(rsp.data.data.products);
        setTotalPages(rsp.data.data.totalPages)
      }
    }

    handleGetProducts();
  }, [searchParams])

  return (
    <>
      <HomeHeader />
      <HomeAds />
      <div className="container pt-10">
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">ĐIỆN THOẠI NỔI BẬT NHẤT</span>
            <div className="flex gap-4">
              {
                hotPhones.map(phone => (
                  <Button key={phone.value} onClick={() => navigate(`?${new URLSearchParams({ phone_type: phone.value })}`)}>
                    {phone.name}
                  </Button>
                ))
              }
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {
              products.map(product => (
                <ProductItem
                  key={uuid()}
                  product={product} />
              ))
            }
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className={`${parseInt(page) <= 1 ? 'hidden' : ''}`} href={`${new URLSearchParams({ page: String(parseInt(page) - 1), phone_type: String(phoneType) })}`} />
              </PaginationItem>
              {
                [-3, -2, -1, 0, 1, 2, 3].map((e) => {
                  const curPage = parseInt(page);
                  if (curPage + e < 1 || curPage + e > totalPages)
                    return;
                  return (
                    <PaginationItem key={e}>
                      <PaginationLink href={`?${new URLSearchParams({ page: String(parseInt(page) + e), phone_type: String(phoneType) })}`}>{parseInt(page) + e}</PaginationLink>
                    </PaginationItem>
                  )
                })
              }
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext className={`${parseInt(page) >= totalPages ? 'hidden' : ''}`} href={`${new URLSearchParams({ page: String(parseInt(page) + 1), phone_type: String(phoneType) })}`} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <HomeFooter />
    </>
  )
}

export default HomePage;