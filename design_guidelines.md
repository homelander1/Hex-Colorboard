# Design Guidelines: Hex Color Manager

## Design Approach

**System-Based Approach**: Clean, minimal utility design inspired by modern developer tools and design applications. This is a functional color management tool where clarity and usability are paramount. Reference the simplicity of Linear's interface and the functional clarity of Figma's color tools.

**Core Principle**: Let the colors be the visual focus. The interface should be clean, efficient, and get out of the way of the user's color work.

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, and 8** throughout (e.g., `p-4`, `gap-6`, `m-8`)

**Container Structure**:
- Main container: `max-w-4xl` centered with `px-6` horizontal padding
- Vertical spacing between major sections: `py-8` to `py-12`

**Grid Layout**:
- Desktop (lg): 2-column grid (`grid-cols-2`)
- Tablet (md): 2-column grid (`grid-cols-2`)
- Mobile: Single column (`grid-cols-1`)
- Gap between items: `gap-6`

---

## Typography

**Font Stack**: Use Inter or System UI fonts via Google Fonts

**Hierarchy**:
- Page Title: `text-2xl`, `font-semibold`, `tracking-tight`
- Labels: `text-sm`, `font-medium`
- Input Text: `text-base`, `font-mono` (for hex values)
- Helper Text: `text-xs`, `font-normal`

---

## Component Structure

### Color Item Component (Repeated 10 times)

Each color item consists of three synchronized elements in a compact card:

**Card Container**:
- Rounded corners: `rounded-lg`
- Border: `border` with `border-2` thickness
- Padding: `p-4`
- Spacing between internal elements: `gap-3`

**Layout Within Card**:
```
[Large Color Preview Square]
[Color Picker] [Hex Input Field]
```

**1. Color Preview Square**:
- Size: `h-24` `w-full`
- Rounded: `rounded-md`
- Border: `border-2`
- Position: Top of card, spanning full width

**2. Color Picker Input**:
- Native `<input type="color">` element
- Size: `h-10` `w-16`
- Rounded: `rounded`
- Cursor: `cursor-pointer`
- Border: `border-2`

**3. Hex Input Field**:
- Type: `text`
- Width: Flex-grow to fill remaining space
- Height: `h-10`
- Padding: `px-3`
- Font: Monospace
- Placeholder: "#FF5733" (example hex values)
- Rounded: `rounded`
- Border: `border-2`
- Max-length: 7 characters

**Flex Layout for Picker + Input**:
- Container: `flex`, `gap-2`, `items-center`
- Color picker: Fixed width
- Hex input: `flex-1` (takes remaining space)

### Validation States

**Invalid Hex Input**:
- Border becomes thicker/emphasized: `border-2`
- Add shake animation on invalid entry (subtle, 200ms)

**Valid State**:
- Standard border treatment
- Smooth color transition when updating preview

---

## Page Structure

**Header Section**:
- Page title: "Hex Color Manager" or "Color Palette Creator"
- Subtitle/description: Brief explanation (1 line)
- Spacing below header: `mb-8`

**Main Grid Section**:
- Container for all 10 color items
- Grid layout as specified above
- Each item numbered visually (1-10) with small label: `text-xs` in top-left of card

**Optional Actions Section** (bottom):
- Export/Copy All Colors button
- Reset All button
- Centered, `mt-8`, horizontal layout with `gap-3`

---

## Interaction Patterns

**Color Synchronization**:
- Changing color picker → updates hex input + preview square
- Typing valid hex → updates color picker + preview square
- Real-time updates (no submit button needed)

**Focus States**:
- Inputs receive visible focus ring: `focus:ring-2`, `focus:ring-offset-2`
- Clear visual feedback for keyboard navigation

**Hover States**:
- Color picker: Subtle scale effect `hover:scale-105`
- Inputs: Slight border emphasis

---

## Accessibility

- All inputs have associated labels (visually hidden or visible)
- Color picker and hex input are keyboard accessible
- Focus indicators clearly visible
- ARIA labels for screen readers ("Color 1 hex input", "Color 1 picker")
- Sufficient contrast for all text and borders

---

## Responsive Behavior

**Desktop (lg+)**:
- 2-column grid, spacious layout
- Color preview squares more prominent

**Tablet (md)**:
- Maintain 2-column grid
- Slightly reduced padding

**Mobile**:
- Single column
- Color preview squares maintain aspect ratio
- Increased touch target sizes for inputs
- Stack all elements vertically within cards

---

## Visual Rhythm

- Consistent card heights create clean grid alignment
- Uniform spacing creates predictable, scannable interface
- Color previews dominate visually, making the tool's purpose immediately clear
- No competing visual elements or distractions