import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary dark:bg-input/30 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border shadow-xs transition-all outline-none",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        "aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:border-primary data-[state=checked]:bg-primary",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CheckCircle2 className="size-3 text-primary-foreground" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem }
