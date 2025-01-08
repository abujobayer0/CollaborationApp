"use client";

import qs from "query-string";
import { useDebounceCallback } from "usehooks-ts";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const debouncedCallback = useDebounceCallback((searchValue: string) => {
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { search: searchValue },
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedCallback(newValue);
  };

  return (
    <div className="w-full relative">
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="w-full max-w-[516px] pl-9"
        placeholder="Search Boards"
        onChange={handleChange}
        value={value}
      />
    </div>
  );
};

export default SearchInput;