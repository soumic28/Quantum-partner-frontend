import { FormControl } from "../ui/form";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface AppSelectProps {
  label?: string;
  onValueChange: (value: string) => void;
  defaultValue?: string;
  placeholder?: string;
  items: {
    value: string;
    label: string;
  }[];
}

const AppSelect = ({
  onValueChange,
  defaultValue,
  placeholder,
  items,
  label,
}: AppSelectProps) => {
  return (
    <div className="relative w-full">
      <Select onValueChange={onValueChange} defaultValue={defaultValue}>
        <FormControl>
          <div className="group -space-y-2">
            {label && (
              <Label className="ml-2 bg-background px-1 text-[0.625rem] font-medium tracking-wide text-muted-foreground group-focus-within:text-primary">
                {label}
              </Label>
            )}
            <SelectTrigger className="group-focus-within:border-primary">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </div>
        </FormControl>
        <SelectContent>
          {items.map((item, i) => (
            <SelectItem key={i} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default AppSelect;
