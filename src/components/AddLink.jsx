import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/clerk-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addLink } from "@/redux/linkSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

function AddLink() {
  const { user } = useUser();
  const [selectedTag, setSelectedTag] = useState("");
  const links = useSelector((state) => state.link.linkData);

  const dispatch = useDispatch();
  let url =
    "https://link-manager-7252f-default-rtdb.asia-southeast1.firebasedatabase.app/";

  let link = useRef();
  let title = useRef();
  let description = useRef();

  function handleClick() {
    // console.log(link.current.value);
    // console.log(title.current.value);
    // console.log(description.current.value);
    // console.log(selectedTag);

    let linkUrl = link.current.value;
    let linkTitle = title.current.value;
    let desc = description.current.value;
    let linkTag = selectedTag;

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const isoDate = date.toISOString().split("T")[0];
    console.log(isoDate);
    console.log(formattedDate);

    if (!linkUrl || !linkTitle || !linkTag) {
      toast("All fields are required!!", {
        style: {
          backgroundColor: "#ef4444",
          color: "#ffffff",
        },
        icon: "⚠️",
      });
      return;
    }

    const isDuplicate = links
      .filter((link) => link.createdBy == user.username)
      .some(
        (link) =>
          link.title.toLowerCase() == linkTitle.toLowerCase() ||
          link.url.toLowerCase() == linkUrl.toLowerCase()
      );

    if (isDuplicate) {
      toast("Url or Title already exists", {
        style: {
          background: "#f97316", // Tailwind: orange-500
          color: "#ffffff",
        },
      });
    } else {
      axios
        .post(`${url}link.json`, {
          url: linkUrl,
          title: linkTitle,
          description: desc,
          tag: linkTag,
          date: isoDate,
          displayDate: formattedDate,
          isFavourite: false,
          createdBy: user.username,
        })
        .then((res) => {
          dispatch(
            addLink({
              id: res.data.name,
              url: linkUrl,
              title: linkTitle,
              description: desc,
              tag: linkTag,
              date: isoDate,
              displayDate: formattedDate,
              isFavourite: false,
              createdBy: user.username,
            })
          );
          console.log("Link Added successfully");

          toast.success("Link Added Successfully", {
            style: {
              background: "#22c55e", // Tailwind: green-500
              color: "#ffffff",
            },
            duration: 2000,
          });
          link.current.value = "";
          title.current.value = "";
          description.current.value = "";
        })
        .catch((err) => {
          console.log("Error while posting link: ", err);
        });
    }
  }

  return (
    <div className="fixed bottom-0 right-0 m-4">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-purple-600 hover:bg-purple-700 hover:text-white text-white dark:bg-purple-400 dark:text-black dark:hover:bg-purple-500 dark:hover:text-black cursor-pointer  "
            >
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>🔗 Save a New Link</DialogTitle>
              <DialogDescription>
                Found something useful? Save it here with a title, tag, and a
                short description — so you never lose it again.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="name-1"
                  name="link"
                  placeholder="paste your favourite link"
                  ref={link}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="give your link a title"
                  ref={title}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Type your message here."
                  ref={description}
                />
              </div>

              <div className="grid gap-3">
                <Select onValueChange={(value) => setSelectedTag(value)}>
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder="Tags" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="shopping">Shopping</SelectItem>
                    <SelectItem value="travel">Travel</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="read">Read</SelectItem>
                    <SelectItem value="watch-later">Watch-later</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* <div className="grid gap-3">
              <Label htmlFor="date">Date</Label>
              <Input id="date" name="date" type="date" />
            </div> */}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>

              <Button onClick={handleClick}>Save Link</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default AddLink;
