import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useId } from "react";
import useColorStore from "@/store/use-color";
function ColorPicker() {
  const id = useId();
  const { selectedColor, setColor } = useColorStore();
  useEffect(() => {
    console.log(selectedColor, "here");
  }, [selectedColor]);

  return (
    <fieldset className="space-y-4 max-w-[400px]">
      {/* <legend className="text-sm font-medium leading-none text-foreground">
        Choose a color
      </legend> */}
      <RadioGroup
        className="flex gap-1.5"
        value={selectedColor}
        onValueChange={setColor} 
      >
        {["blue", "indigo", "pink", "red", "orange", "gray", "emerald"].map(
          (color) => (
            <RadioGroupItem
              key={color}
              value={color}
              id={`${id}-${color}`} 
              aria-label={color}
              className={`size-6 border-${color}-500 bg-${color}-500 shadow-none data-[state=checked]:border-${color}-500 data-[state=checked]:bg-${color}-500`}
            />
          )
        )}
      </RadioGroup>
    </fieldset>
  );
}

export { ColorPicker };
