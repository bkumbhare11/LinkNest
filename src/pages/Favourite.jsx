import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLinks } from "@/redux/linkSlice";
import LinkCard from "@/components/LinkCard";

import { BlurFade } from "@/components/magicui/blur-fade";

function Favourite() {
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

  let favouriteLink = links.filter((link) => link.isFavourite == true);

  return (
    <>
      <BlurFade delay={0.25 * 2} inView>
        <div className="w-[95%] sm:w-[80%] mb-15 mx-auto">
          {favouriteLink.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </BlurFade>
    </>
  );
}

export default Favourite;
