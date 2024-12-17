import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];

function Filter() {
  const handleCategoryChange = (categoryId) => {
    console.log(categoryId);

    alert(categoryId);
  };
  return (
    <div className="w-full md:w-[20%]">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-xl">Filter Options</h1>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {" "}
              <SelectLabel>Sort by Price</SelectLabel>
              <SelectItem value="low">low to high</SelectItem>
              <SelectItem value="high">high to low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div>
        <h1 className="text-lg font-semibold md:text-xl">Category</h1>
        {categories?.map((category) => (
          <div key={category.id} className="flex items-center space-x-2 my-3">
            <Checkbox
              id={category.id}
              onCheckedChange={() => handleCategoryChange(category.id)}
            />
            <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed
            peer-disabled:opacity-70">
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
