import { deleteProductAction } from "@/app/lib/actions";
import { getAllProducts } from "@/app/lib/data";
import Pagination from "@/components/dashboard/Pagination";
import Search from "@/components/dashboard/search/Search";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
};

const Products = async ({ searchParams }: ProductsPageProps) => {
  const { q, page } = await searchParams;
  const { products, count } = await getAllProducts(q, parseInt(page || "1"));

  return (
    <div className="w-[280px] sm:w-full">
      <div className="flex justify-between items-center bg-foreground p-5 rounded-lg mt-5">
        <Search placeholder="Enter a product" />

        <Link href="/dashboard/products/add">
          <button className="bg-purple-500 text-white p-3 border-none rounded-md cursor-pointer">
            Add
          </button>
        </Link>
      </div>
      <Table className="w-full md:w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Title</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-center">Created at</TableHead>
            <TableHead className="text-right">Stock</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium flex items-center gap-3 text-left">
                <Image
                  src={item?.img?.trim() ? item.img : "/assets/no-iamge.png"}
                  alt=""
                  width={40}
                  height={40}
                  priority
                  className="rounded-full border w-12 h-12"
                />
                {item.title}
              </TableCell>

              <TableCell className="text-center">{item.desc}</TableCell>

              <TableCell>{item.price}</TableCell>

              <TableCell className="text-center">
                {new Date(item.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell className="text-right">{item.stock}</TableCell>

              <TableCell className="text-right">
                <div className="flex flex-row gap-5 text-right  justify-end">
                  <Link href={`/dashboard/products/${item.id}`}>
                    <button className=" cursor-pointer bg-green-500 p-1 rounded-sm">
                      View
                    </button>
                  </Link>

                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="cursor-pointer bg-red-500 p-1 rounded-sm">
                      Delete
                    </button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={count} />
    </div>
  );
};

export default Products;
