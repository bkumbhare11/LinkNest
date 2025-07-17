import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

function Filter({
  activeTag,
  setActiveTag,
  sortOrder,
  setSortOrder,
  setSearchValue,
}) {
  return (
    <>
      <div className="w-[95%] sm:w-[65%] mx-auto border-gray-400  flex flex-col lg:flex-row gap-2  py-5">
        <Input
          type="text"
          placeholder="Search by title..."
          className="sm:h-12 sm:!text-base"
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <div className="flex gap-2">
          <Select
            value={activeTag}
            onValueChange={(value) => setActiveTag(value)}
          >
            <SelectTrigger className="w-[180px] sm:!h-12 sm:!text-base">
              <SelectValue placeholder="By Tags" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all tags" className="sm:!text-base">
                All Tags
              </SelectItem>
              <SelectItem value="work" className="sm:!text-base">
                Work
              </SelectItem>
              <SelectItem value="study" className="sm:!text-base">
                Study
              </SelectItem>
              <SelectItem value="coding" className="sm:!text-base">
                Coding
              </SelectItem>
              <SelectItem value="tools" className="sm:!text-base">
                Tools
              </SelectItem>
              <SelectItem value="entertainment" className="sm:!text-base">
                Entertainment
              </SelectItem>
              <SelectItem value="music" className="sm:!text-base">
                Music
              </SelectItem>
              <SelectItem value="shopping" className="sm:!text-base">
                Shopping
              </SelectItem>
              <SelectItem value="travel" className="sm:!text-base">
                Travel
              </SelectItem>
              <SelectItem value="personal" className="sm:!text-base">
                Personal
              </SelectItem>
              <SelectItem value="important" className="sm:!text-base">
                Important
              </SelectItem>
              <SelectItem value="read" className="sm:!text-base">
                Read
              </SelectItem>
              <SelectItem value="watch-later" className="sm:!text-base">
                Watch-later
              </SelectItem>
              <SelectItem value="notes" className="sm:!text-base">
                Notes
              </SelectItem>
              <SelectItem value="others" className="sm:!text-base">
                Others
              </SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger className="w-[180px] sm:!h-12 sm:!text-base">
              <SelectValue placeholder="By Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest" className="sm:!text-base">
                Newest
              </SelectItem>
              <SelectItem value="oldest" className="sm:!text-base">
                Oldest
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}

export default Filter;
