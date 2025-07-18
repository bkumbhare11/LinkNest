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
import toast from "react-hot-toast";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateLink } from "@/redux/linkSlice";

function UpdateLink({ link }) {
  const dispatch = useDispatch();
  //   console.log(link);

  const [urlLink, setUrlLink] = useState(link.url);
  const [title, setTitle] = useState(link.title);
  const [desc, setDesc] = useState(link.description);
  const [tag, setTag] = useState(link.tag);
  let linkTag = tag;

  let url =
    "https://link-manager-7252f-default-rtdb.asia-southeast1.firebasedatabase.app/";

  function handleUpdate() {
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    axios
      .patch(`${url}link/${link.id}.json`, {
        url: urlLink,
        title: title,
        description: desc,
        tag: linkTag,
        editedOn: formattedDate,
      })
      .then(() => {
        dispatch(
          updateLink({
            id: link.id,
            url: urlLink,
            title: title,
            description: desc,
            tag: linkTag,
            isFavourite: link.isFavourite,
            createdBy: link.createdBy,
            displayDate: link.displayDate,
            editedOn: formattedDate,
          })
        );
        console.log("Data Updated");
        toast("Updated", {
          style: {
            background: "#0284c7", // Sky Blue 600
            color: "#ffffff", // White text
          },
          icon: "📝",
          duration: 2000,
        });
      })
      .catch((err) => {
        console.log("Error while updating", err);
        toast.error(
          "Something went wrong while updating the link. Please try again later!",
          {
            style: {
              backgroundColor: "#ef4444",
              color: "#fff",
            },
          }
        );
      });
  }

  return (
    <div className="">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant="outline" className="  ">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>✏️ Update your saved link</DialogTitle>
              <DialogDescription>
                Make changes to your link details and keep them up-to-date. You
                can edit the title, description, tags or URL — whatever you
                need.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="link">Link</Label>
                <Input
                  id="name-1"
                  name="link"
                  value={urlLink}
                  onChange={(e) => setUrlLink(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="tag">Tag</Label>
                <Select value={tag} onValueChange={(value) => setTag(value)}>
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
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleUpdate}>Update Link</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default UpdateLink;
