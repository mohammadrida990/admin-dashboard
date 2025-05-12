import { addProductAction } from "@/app/lib/actions";
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
import React from "react";

const AddProductPage = () => {
  return (
    <div className="bg-foreground p-5 rounded-lg mt-5 w-full">
      <form
        action={addProductAction}
        className="flex flex-col justify-between gap-5 w-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 w-full">
          <Input
            type="text"
            placeholder="Title"
            name="title"
            required
            className=" p-7"
          />

          <Select name="category" aria-required required>
            <SelectTrigger className="w-full p-7">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="computer">Computer</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="number"
            name="price"
            required
            placeholder="Price"
            className=" p-7"
          />

          <Input
            type="number"
            name="stock"
            required
            placeholder="Stock"
            className=" p-7"
          />

          <Input type="text" name="size" placeholder="Size" className=" p-7" />

          <Input
            type="text"
            name="color"
            required
            placeholder="Color"
            className=" p-7"
          />
          <Textarea
            name="desc"
            rows={15}
            placeholder="Description"
            aria-required
            required
            className="p-7 w-full min-h-[150px]"
          />
        </div>

        <SubmitButton style="w-full p-7" text="Submit" />
      </form>
    </div>
  );
};

export default AddProductPage;
