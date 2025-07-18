import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLinks } from "@/redux/linkSlice";
import LinkCard from "@/components/LinkCard";
import { useUser } from "@clerk/clerk-react";

import { BlurFade } from "@/components/magicui/blur-fade";

function Favourite() {
  const { user } = useUser();
  const dispatch = useDispatch();
  const links = useSelector((state) => state.link.linkData);
  let url =
    "https://link-manager-7252f-default-rtdb.asia-southeast1.firebasedatabase.app/";

  useEffect(() => {
    axios.get(`${url}link.json`).then((res) => {
      let tempLink = [];
      for (let key in res.data) {
        tempLink.push({
          id: key,
          ...res.data[key],
        });
      }
      dispatch(setLinks(tempLink));
    });
  }, []);

  let favouriteLink = links
    .filter((link) => link.isFavourite == true)
    .filter((link) => link.createdBy == user.username);

  return (
    <>
      <div className="sticky top-12 sm:top-25 z-40 bg-white/60 dark:bg-black/60 backdrop-blur-sm">
        <h1 className="text-xl font-semibold text-center  sm:text-4xl  py-3">
          Your Favourite Links ✨
        </h1>
      </div>

      <BlurFade delay={0.25 * 2} inView>
        <div className="w-[95%] sm:w-[80%] mb-15 mx-auto">
          {favouriteLink.length == 0 ? (
            <h1 className="text-center text-lg font-semibold text-gray-500 dark:text-neutral-400 mt-10">
              😕 No Links Found for, Add your first link.
            </h1>
          ) : (
            favouriteLink.map((link) => <LinkCard key={link.id} link={link} />)
          )}
        </div>
      </BlurFade>
    </>
  );
}

export default Favourite;
