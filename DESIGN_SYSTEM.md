# Minimalist Design System

## **Design Philosophy**
**"Less is More" - Brutalist/Minimalist Approach**

- **Ultra Simple**: Focus on content, not decoration
- **Monochromatic**: Black, white, and one primary color only
- **Functional**: Every element serves a purpose
- **Timeless**: No trendy effects that will look outdated

## **Color Palette**

### **Core Colors**
```css
Primary: #3B82F6 (Blue-500)
Primary-hover: #2563EB (Blue-600)
Primary-light: #DBEAFE (Blue-50)
```

### **Theme Colors**
```css
Light Mode:
  --color-background: #FFFFFF
  --color-text: #000000
  --color-text-secondary: #6B7280
  --color-border: #E5E7EB
  --color-surface: #F9FAFB

Dark Mode:
  --color-background: #000000
  --color-text: #FFFFFF
  --color-text-secondary: #9CA3AF
  --color-border: #374151
  --color-surface: #111827
```

### **Usage Rules**
- **Primary color**: Only for active states, CTAs, and important highlights
- **Text**: Black on white (light mode), white on black (dark mode)
- **Icons**: Follow text color, primary for active states
- **Borders**: Subtle gray, consistent across all elements
- **NO**: Secondary colors, gradients, shadows, or complex color schemes

## **Typography**

### **Font Stack**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

### **Font Sizes**
```css
H1: 32px/36px, font-weight: 600 (semibold)
H2: 24px/28px, font-weight: 600
H3: 20px/24px, font-weight: 500 (medium)
Body: 16px/20px, font-weight: 400 (regular)
Caption: 14px/18px, font-weight: 400
Small: 12px/16px, font-weight: 400
```

### **Font Weights**
- **Regular (400)**: Body text, descriptions
- **Medium (500)**: Subtitles, labels
- **Semibold (600)**: Headlines, important text
- **NO**: Light, extra bold, or other weights

## **Layout & Spacing**

### **Grid System**
```css
Container: Full width with horizontal padding
Mobile: 16px padding
Tablet: 24px padding
Desktop: 32px padding
```

### **Spacing Scale**
```css
xs: 4px   - Icon spacing
sm: 8px   - Element spacing
md: 16px  - Component spacing
lg: 24px  - Section spacing
xl: 32px  - Page spacing
2xl: 48px - Hero spacing
```

### **Border Radius**
```css
All elements: 8px (consistent)
No other radius values
```

## **Component Design**

### **Buttons**
```css
Primary Button:
  background: var(--color-primary)
  color: white
  border: none
  padding: 12px 24px
  border-radius: 8px
  font-weight: 500
  
Secondary Button:
  background: transparent
  color: var(--color-primary)
  border: 1px solid var(--color-primary)
  padding: 12px 24px
  border-radius: 8px
  
Ghost Button:
  background: transparent
  color: var(--color-text)
  border: 1px solid var(--color-border)
  padding: 12px 24px
  border-radius: 8px
```

### **Cards**
```css
Card:
  background: var(--color-background)
  border: 1px solid var(--color-border)
  border-radius: 8px
  padding: 16px
  
No shadows, gradients, or hover effects
Focus state: border-color: var(--color-primary)
```

### **Forms**
```css
Input:
  background: transparent
  border: 1px solid var(--color-border)
  border-radius: 8px
  padding: 12px 16px
  height: 48px
  font-size: 16px
  
Focus state: border-color: var(--color-primary)
Error state: border-color: #EF4444
```

### **Navigation**
```css
Tab Bar (Mobile):
  background: var(--color-background)
  border-top: 1px solid var(--color-border)
  height: 60px
  
Tab Item:
  color: var(--color-text-secondary)
  active: var(--color-primary)
  
Header:
  background: var(--color-background)
  border-bottom: 1px solid var(--color-border)
  height: 60px
```

## **Icons**

### **Style Guidelines**
- **Type**: Outline icons only (Lucide)
- **Sizes**: 20px (small), 24px (medium), 28px (large)
- **Colors**: 
  - Default: var(--color-text)
  - Secondary: var(--color-text-secondary)
  - Active: var(--color-primary)
- **NO**: Filled icons, colored icons, or icon fonts

### **Usage**
```css
Icon:
  stroke-width: 1.5px
  color: inherit
  
Active Icon:
  color: var(--color-primary)
```

## **Images**

### **Product Images**
```css
Product Thumbnail:
  aspect-ratio: 1/1
  border-radius: 8px
  border: 1px solid var(--color-border)
  
Product Detail:
  aspect-ratio: 4/3
  border-radius: 8px
  border: 1px solid var(--color-border)
```

### **Placeholders**
```css
Image Placeholder:
  background: var(--color-surface)
  border: 1px solid var(--color-border)
  display: flex
  align-items: center
  justify-content: center
  
Placeholder Icon:
  color: var(--color-text-secondary)
  size: 24px
```

## **Interactive States**

### **Hover Effects**
```css
Button Hover:
  Primary: background slightly darker
  Secondary: background: var(--color-surface)
  Ghost: background: var(--color-surface)
  
Card Hover:
  border-color: var(--color-primary)
  
Link Hover:
  color: var(--color-primary)
```

### **Focus States**
```css
All Interactive Elements:
  outline: 2px solid var(--color-primary)
  outline-offset: 2px
  
Form Inputs:
  border-color: var(--color-primary)
  outline: none
```

### **Active States**
```css
Button Active:
  transform: translateY(1px)
  
Tab Active:
  color: var(--color-primary)
  
Navigation Active:
  color: var(--color-primary)
```

## **Loading States**

### **Skeleton Loading**
```css
Skeleton:
  background: var(--color-surface)
  border: 1px solid var(--color-border)
  border-radius: 8px
  
No shimmer animation
Simple static placeholder
```

### **Spinners**
```css
Loading Spinner:
  color: var(--color-primary)
  size: 20px
  stroke-width: 2px
  
Simple rotating circle
No complex animations
```

## **Ecommerce-Specific Elements**

### **Product Cards**
```css
Product Card:
  width: 180px (mobile), 200px (desktop)
  border: 1px solid var(--color-border)
  border-radius: 8px
  padding: 12px
  
Product Image: 150px height
Product Title: 1-2 lines, truncated
Product Price: Large, bold
Add to Cart Button: Full width, primary
```

### **Price Display**
```css
Regular Price:
  font-size: 18px
  font-weight: 600
  color: var(--color-text)
  
Sale Price:
  font-size: 18px
  font-weight: 600
  color: var(--color-primary)
  
Original Price:
  font-size: 14px
  text-decoration: line-through
  color: var(--color-text-secondary)
```

### **Stock Status**
```css
In Stock:
  color: var(--color-primary)
  font-size: 14px
  
Out of Stock:
  color: var(--color-text-secondary)
  font-size: 14px
  
Low Stock:
  color: #F59E0B
  font-size: 14px
```

### **Cart Badge**
```css
Cart Badge:
  background: var(--color-primary)
  color: white
  border-radius: 50%
  font-size: 12px
  font-weight: 600
  min-width: 20px
  height: 20px
  
Position: top-right of cart icon
```

## **Responsive Design**

### **Breakpoints**
```css
Mobile: 0-640px
Tablet: 641-1024px
Desktop: 1025px+
```

### **Grid Layouts**
```css
Product Grid:
  Mobile: 2 columns
  Tablet: 3 columns
  Desktop: 4 columns
  
Gap: 16px
```

### **Touch Targets**
```css
Minimum tap target: 44px x 44px
Button height: 48px
Input height: 48px
Icon buttons: 44px x 44px
```

## **Animation Guidelines**

### **Allowed Animations**
- Simple fade in/out
- Basic slide transitions
- Loading spinners
- Simple scale on press (0.95x)

### **Forbidden Animations**
- Complex keyframe animations
- Bounce effects
- Parallax scrolling
- Hover scale effects
- Transition delays

## **Accessibility**

### **Color Contrast**
- Text on background: 4.5:1 ratio minimum
- Primary color on white: AAA compliant
- All interactive elements clearly distinguishable

### **Focus Management**
- Visible focus indicators
- Logical tab order
- Focus trapping in modals

### **Screen Reader Support**
- Semantic HTML elements
- Proper aria labels
- Alternative text for images

## **Implementation Notes**

### **CSS Variables Setup**
```css
:root {
  --color-primary: #3B82F6;
  --color-background: #FFFFFF;
  --color-text: #000000;
  --color-text-secondary: #6B7280;
  --color-border: #E5E7EB;
  --color-surface: #F9FAFB;
  --border-radius: 8px;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
}

[data-theme="dark"] {
  --color-background: #000000;
  --color-text: #FFFFFF;
  --color-text-secondary: #9CA3AF;
  --color-border: #374151;
  --color-surface: #111827;
}
```

### **Utility Classes**
```css
.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-text-secondary); }
.border-primary { border-color: var(--color-primary); }
.bg-surface { background-color: var(--color-surface); }
.rounded { border-radius: var(--border-radius); }
```

## **Quality Checklist**

### **Before Implementing Any Component**
- [ ] Uses only approved colors
- [ ] Consistent 8px border radius
- [ ] Proper contrast ratios
- [ ] Works in both light and dark modes
- [ ] No unnecessary decorative elements
- [ ] Touch-friendly sizing (44px minimum)
- [ ] Semantic HTML structure
- [ ] Accessible focus states

### **Final Review**
- [ ] No gradients or shadows used
- [ ] Icons are outline style only
- [ ] Typography follows scale exactly
- [ ] Spacing uses defined scale
- [ ] Component looks identical in both themes
- [ ] Interactive states are clearly defined
- [ ] Loading states are simple and functional