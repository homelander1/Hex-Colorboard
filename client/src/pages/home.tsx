import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DEFAULT_COLORS = [
  "#FF5733",
  "#33FF57",
  "#3357FF",
  "#FF33F5",
  "#F5FF33",
  "#33FFF5",
  "#FF8C33",
  "#8C33FF",
  "#33FF8C",
  "#FF3333",
];

function isValidHex(hex: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

function expandShortHex(hex: string): string {
  if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
    const r = hex[1];
    const g = hex[2];
    const b = hex[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  return hex;
}

function normalizeHex(value: string): string {
  let hex = value.trim();
  if (!hex.startsWith("#")) {
    hex = "#" + hex;
  }
  return hex;
}

interface ColorItemProps {
  index: number;
  color: string;
  onColorChange: (color: string) => void;
}

function ColorItem({ index, color, onColorChange }: ColorItemProps) {
  const [inputValue, setInputValue] = useState(color);
  const [isInvalid, setIsInvalid] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  useEffect(() => {
    if (shouldShake) {
      const timer = setTimeout(() => setShouldShake(false), 300);
      return () => clearTimeout(timer);
    }
  }, [shouldShake]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    const normalized = normalizeHex(value);
    if (isValidHex(normalized)) {
      setIsInvalid(false);
      const expanded = expandShortHex(normalized);
      onColorChange(expanded);
    } else {
      const minLength = normalized.startsWith("#") ? 4 : 3;
      if (value.length >= minLength && !isValidHex(normalized)) {
        setIsInvalid(true);
      }
    }
  };

  const handleInputBlur = () => {
    const normalized = normalizeHex(inputValue);
    if (isValidHex(normalized)) {
      const expanded = expandShortHex(normalized);
      setInputValue(expanded);
      setIsInvalid(false);
      onColorChange(expanded);
    } else {
      if (inputValue.length > 0 && !isValidHex(normalized)) {
        setShouldShake(true);
        setIsInvalid(true);
      }
      setInputValue(color);
      setTimeout(() => setIsInvalid(false), 300);
    }
  };

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setInputValue(newColor.toUpperCase());
    setIsInvalid(false);
    onColorChange(newColor);
  };

  return (
    <Card className="p-4 flex flex-col gap-3 border-2 rounded-lg">
      <div className="flex items-center justify-between gap-2">
        <Label
          htmlFor={`color-input-${index}`}
          className="text-xs text-muted-foreground font-medium"
        >
          Color {index + 1}
        </Label>
      </div>

      <div
        className="h-24 w-full rounded-md border-2 transition-colors duration-200"
        style={{ backgroundColor: color }}
        data-testid={`color-preview-${index}`}
        aria-label={`Color ${index + 1} preview showing ${color}`}
        role="img"
      />

      <div className="flex gap-2 items-center">
        <div className="relative">
          <input
            type="color"
            value={color.toLowerCase()}
            onChange={handlePickerChange}
            className="h-10 w-16 rounded border-2 border-input cursor-pointer bg-transparent p-0.5 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label={`Color ${index + 1} picker`}
            data-testid={`color-picker-${index}`}
          />
        </div>

        <div className="flex-1 relative">
          <Input
            id={`color-input-${index}`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder="#FF5733"
            maxLength={7}
            className={`font-mono text-base h-10 px-3 focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
              isInvalid
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            } ${shouldShake ? "animate-shake" : ""}`}
            aria-label={`Color ${index + 1} hex input`}
            aria-invalid={isInvalid}
            aria-describedby={isInvalid ? `color-error-${index}` : undefined}
            data-testid={`color-input-${index}`}
          />
          {isInvalid && (
            <span
              id={`color-error-${index}`}
              className="sr-only"
              role="alert"
              aria-live="polite"
            >
              Invalid hex color format. Use #RGB or #RRGGBB format.
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Home() {
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);

  const handleColorChange = (index: number, newColor: string) => {
    setColors((prev) => {
      const updated = [...prev];
      updated[index] = newColor;
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8 md:py-12">
        <header className="mb-8">
          <h1
            className="text-2xl font-semibold tracking-tight text-foreground"
            data-testid="page-title"
          >
            Hex Color Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Введіть hex-код кольору або оберіть на палітрі
          </p>
        </header>

        <main>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {colors.map((color, index) => (
              <ColorItem
                key={index}
                index={index}
                color={color}
                onColorChange={(newColor) => handleColorChange(index, newColor)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
