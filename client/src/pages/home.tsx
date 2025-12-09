import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

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

interface ColorRowProps {
  index: number;
  color: string;
  onColorChange: (color: string) => void;
}

function ColorRow({ index, color, onColorChange }: ColorRowProps) {
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
    <>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground w-4 font-medium">
          {index + 1}
        </span>
        <Input
          id={`color-input-${index}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder="#FF5733"
          maxLength={7}
          className={`font-mono text-sm h-8 px-2 ${
            isInvalid
              ? "border-destructive focus-visible:ring-destructive"
              : ""
          } ${shouldShake ? "animate-shake" : ""}`}
          aria-label={`Color ${index + 1} hex input`}
          aria-invalid={isInvalid}
          data-testid={`color-input-${index}`}
        />
      </div>

      <div className="flex items-center justify-center">
        <input
          type="color"
          value={color.toLowerCase()}
          onChange={handlePickerChange}
          className="h-8 w-12 rounded border border-input cursor-pointer bg-transparent transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
          aria-label={`Color ${index + 1} picker`}
          data-testid={`color-picker-${index}`}
        />
      </div>

      <div
        className="h-8 w-full rounded border transition-colors duration-200"
        style={{ backgroundColor: color }}
        data-testid={`color-preview-${index}`}
        aria-label={`Color ${index + 1} preview`}
        role="img"
      />
    </>
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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="mb-4 text-center">
          <h1
            className="text-xl font-semibold tracking-tight text-foreground"
            data-testid="page-title"
          >
            Hex Color Manager
          </h1>
          <p className="text-muted-foreground text-sm">
            Введіть hex-код або оберіть колір на палітрі
          </p>
        </header>

        <main className="bg-card border rounded-lg p-4">
          <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 gap-y-2 items-center">
            <div className="text-xs font-medium text-muted-foreground pb-1">
              Hex Code
            </div>
            <div className="text-xs font-medium text-muted-foreground pb-1 text-center">
              Picker
            </div>
            <div className="text-xs font-medium text-muted-foreground pb-1">
              Preview
            </div>

            {colors.map((color, index) => (
              <ColorRow
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
