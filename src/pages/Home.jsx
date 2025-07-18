import React, { useEffect, useState } from "react";
import AddLink from "../components/AddLink";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLinks } from "@/redux/linkSlice";
import { useUser } from "@clerk/clerk-react";
import Filter from "@/components/Filter";
import LinkCard from "@/components/LinkCard";

import { BlurFade } from "@/components/magicui/blur-fade";

function Links() {
  const { user, isSignedIn } = useUser();

  const dispatch = useDispatch();
  const links = useSelector((state) => state.link.linkData);

  const [activeTag, setActiveTag] = useState("all tags");

  const [sortOrder, setSortOrder] = useState("oldest");

  const [searchValue, setSearchValue] = useState("");

  let url =
    "https://link-manager-7252f-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    axios
      .get(`${url}link.json`)
      .then((res) => {
        //   console.log(res.data);

        let tempLink = [];
        for (let key in res.data) {
          tempLink.push({
            id: key,
            ...res.data[key],
          });
        }
        console.log(tempLink);
        dispatch(setLinks(tempLink));
      })
      .catch((err) => {
        console.log("Error while fetching: ", err);
      });
  }, []);

  const filteredLinks = links
    .filter((link) => (isSignedIn ? link.createdBy == user.username : true))
    .filter((link) =>
      activeTag === "all tags" ? true : link.tag === activeTag
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return 0;
      }
    })
    .filter((link) =>
      link.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
      <div className="sticky top-12 sm:top-25 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-sm">
        <BlurFade delay={0.25} inView>
          <Filter
            setActiveTag={setActiveTag}
            activeTag={activeTag}
            setSortOrder={setSortOrder}
            sortOrder={sortOrder}
            setSearchValue={setSearchValue}
          />
        </BlurFade>
      </div>

      <BlurFade delay={0.25 * 1} inView>
        <div className="w-[95%] sm:w-[80%] mb-15 mx-auto ">
          {activeTag !== "all links" && filteredLinks.length === 0 ? (
            <h1 className="text-center text-lg font-semibold text-gray-500 dark:text-neutral-400 mt-10">
              😕 No Links Found, Add your first link.
            </h1>
          ) : (
            filteredLinks.map((link) => {
              return (
                <BlurFade delay={0.25} inView key={link.id}>
                  <LinkCard key={link.id} link={link} />
                </BlurFade>
              );
            })
          )}
        </div>
      </BlurFade>

      <AddLink />
    </>
  );
}

export default Links;
