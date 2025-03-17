"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect, useId } from "react";
import useColorStore from "@/store/use-color";
import clsx from "clsx";

function ColorPicker() {
  const id = useId();
  const { selectedColor, setColor } = useColorStore();

  useEffect(() => {
    console.log(selectedColor, "here");
  }, [selectedColor]);

  const colors = ["blue", "indigo", "pink", "red", "orange", "gray", "emerald"];

  return (
    <fieldset className="space-y-4 max-w-[400px]">
      <RadioGroup
        className="flex gap-3"
        value={selectedColor}
        onValueChange={setColor}
      >
        {colors.map((color) => (
          <RadioGroupItem
            key={color}
            value={color}
            id={`${id}-${color}`}
            aria-label={color}
            className={clsx(
              "size-8 rounded-full border-2 transition-colors shadow-sm",
              {
                "border-blue-500 bg-blue-500": color === "blue",
                "border-indigo-500 bg-indigo-500": color === "indigo",
                "border-pink-500 bg-pink-500": color === "pink",
                "border-red-500 bg-red-500": color === "red",
                "border-orange-500 bg-orange-500": color === "orange",
                "border-gray-500 bg-gray-500": color === "gray",
                "border-emerald-500 bg-emerald-500": color === "emerald",
              },
              "data-[state=checked]:ring-2 data-[state=checked]:ring-black"
            )}
          />
        ))}
      </RadioGroup>
    </fieldset>
  );
}

export { ColorPicker };
