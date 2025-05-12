import { updateProductDetailsAction } from "@/app/lib/actions";
import { getProductDetails } from "@/app/lib/data";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const ProductDetails = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProductDetails(id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-5 w-[100%] ">
      <div className="hidden md:block md:col-span-3 bg-foreground p-5 rounded-lg font-bold text-secondary h-max">
        <div className="relative w-full h-[300px] overflow-hidden mb-5">
          <Image
            src={product?.img || "/assets/no-iamge.png"}
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>
        {product?.title}
      </div>

      <div className="md:col-span-9 bg-foreground rounded-lg p-5 w-full">
        <form
          action={updateProductDetailsAction}
          className=" flex flex-col w-full "
        >
          <input type="hidden" name="id" value={product?.id} />
          <div className="p-3 my-1 flex flex-col">
            <label>Title</label>
            <Input type="text" name="title" defaultValue={product?.title} />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Price</label>
            <Input type="number" name="price" defaultValue={product?.price} />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Stock</label>
            <Input type="number" name="stock" defaultValue={product?.stock} />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Color</label>
            <Input
              type="text"
              name="color"
              defaultValue={product?.color || ""}
            />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Size</label>
            <Input type="text" name="size" defaultValue={product?.size || ""} />
          </div>

          <div className="p-3 my-1 flex flex-col">
            <label>Category</label>
            <Select
              name="category"
              aria-required
              defaultValue={product?.category || undefined}
              required
            >
              <SelectTrigger className="w-full p-3">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="computer">Computer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 my-1 flex flex-col">
            <Textarea
              name="desc"
              placeholder="dec"
              rows={16}
              aria-required
              required
              className="p-7 w-full min-h-[150px]"
              defaultValue={product?.desc}
            />
          </div>

          <SubmitButton style="w-full p-7" text="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ProductDetails;
