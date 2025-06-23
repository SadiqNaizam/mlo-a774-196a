import React from 'react';
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

interface CuisineFilterChipProps {
  /**
   * The name of the cuisine to display.
   */
  cuisine: string;
  /**
   * Whether the chip is currently selected.
   */
  isSelected: boolean;
  /**
   * Callback function triggered when the chip is clicked.
   */
  onSelect: (cuisine: string) => void;
  /**
   * Optional additional class names for styling.
   */
  className?: string;
}

/**
 * A small, pill-shaped, selectable component for filtering by cuisine type.
 * It acts as a styled toggle button.
 */
const CuisineFilterChip: React.FC<CuisineFilterChipProps> = ({
  cuisine,
  isSelected,
  onSelect,
  className
}) => {
  console.log(`CuisineFilterChip loaded for: ${cuisine}`);

  const handlePressedChange = () => {
    // We call the onSelect prop to let the parent component handle the state logic.
    onSelect(cuisine);
  };

  return (
    <Toggle
      pressed={isSelected}
      onPressedChange={handlePressedChange}
      aria-label={`Filter by ${cuisine}`}
      className={cn(
        "h-9 rounded-full border-input bg-transparent px-4 py-2 text-sm shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary",
        className
      )}
    >
      {cuisine}
    </Toggle>
  );
};

export default CuisineFilterChip;