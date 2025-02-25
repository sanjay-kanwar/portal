import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

const SelectorSchema = z.object({
  sdVersion: z.union([z.string(), z.record(z.string(), z.any())]),
});

const StorySchema = z.object({
  subject: z.string().min(1),
  selector: SelectorSchema,
  items: z.array(ItemSchema),
});

const TaskSchema = z.object({
  subject: z.string().min(1),
  selector: SelectorSchema,
  items: z.array(ItemSchema),
});

const FormSchema = z.object({
  stories: z.array(StorySchema),
  tasks: z.array(TaskSchema),
});

export default function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      stories: [],
      tasks: [],
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type="submit">Submit</button>
      {errors.stories && <p>{errors.stories.message}</p>}
      {errors.tasks && <p>{errors.tasks.message}</p>}
    </form>
  );
}
