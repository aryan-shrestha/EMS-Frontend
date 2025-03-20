import { GET, POST } from "@/axios/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/ModalContext";
import { FeedbackCategory } from "@/types/interfaces/Feedback";
import { Loader2 } from "lucide-react";
import React from "react";

interface FeedbackFormProps {
  onSuccess: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSuccess: fetchFeedbacks,
}) => {
  const { closeModal } = useModal();

  const [categories, setCategories] = React.useState<FeedbackCategory[]>([]);
  const [isCategoriesLoading, setIsCategoriesLoading] =
    React.useState<boolean>(false);
  const [categoryId, setCategoryId] = React.useState<string>("");
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [isAnonymous, setIsAnonymous] = React.useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const fetchCategories = async () => {
    setIsCategoriesLoading(true);
    await GET(
      `feedback-tracker/categories/`,
      {},
      (data: FeedbackCategory[]) => {
        setCategories(data);
      }
    );
    setIsCategoriesLoading(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    const payload = {
      category_id: categoryId,
      title: title,
      description: description,
      is_anonymous: isAnonymous,
    };
    await POST(`feedback-tracker/feedbacks/`, payload, (_) => {
      fetchFeedbacks();
      closeModal();
    });
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col pt-4 gap-6">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="leaveType">
              Category{" "}
              {isCategoriesLoading && (
                <Loader2 className="animate-spin" size={16} />
              )}
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => {
                    return (
                      <SelectItem key={category.id} value={`${category.id}`}>
                        {category.title}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="subject">Title</Label>
            <Input
              type="text"
              id="subject"
              placeholder="E.g. Suffering from common cold"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description">Description</label>
            <Textarea
              value={description}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              required
            >
              {description}
            </Textarea>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="description">Anonymous</label>
            <Switch checked={isAnonymous} onCheckedChange={setIsAnonymous} />
          </div>
          <div className="flex items-center justify-end">
            <Button className="cursor-pointer" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="animate-spin" />}Submit
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default FeedbackForm;
