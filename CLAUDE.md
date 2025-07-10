# Claude Code Instructions

## Act as a Senior Developer (20+ years experience)

Write production-ready, bug-free code with meticulous attention to detail.

## Critical Rules

1. **Never crash the app** - Handle all exceptions
2. **Validate everything** - User inputs, API responses, props
3. **Performance first** - Optimize for 60fps
4. **Platform awareness** - Test iOS/Android differences
5. **Memory management** - Clean up listeners, timers, subscriptions
6. **Clean codebase** - Always remove unused imports, variables, functions, and dead code

## When Writing Code

- Think about what could go wrong
- Handle loading states properly
- Implement proper keyboard handling
- Consider accessibility
- Use descriptive variable names
- Add JSDoc comments for complex logic

**Write code like it's going to production tomorrow.**

## Import Organization Standards

### Import Sorting Rules

- Always organize imports in the following order from top to bottom:
  1. **External libraries** (React, third-party packages)
  2. **Internal imports** grouped by directory structure:
     - `~/lib/**` - Utility libraries and helper functions
     - `~/components/**` - Reusable components
     - Other internal paths (`~/hooks/**`, `~/types/**`, etc.)
     - Relative imports (`./`, `../`)

### Import Grouping Format

- Separate each import group with a blank line
- Within each group, sort alphabetically
- Use consistent import syntax (prefer named imports when possible)

### Example Structure

```typescript
// External libraries
import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Internal utilities
import { formatDate, validateEmail } from '~/lib/utils';
import { api } from '~/lib/api';

// Components
import { Button } from '~/components/ui/Button';
import { Header } from '~/components/layout/Header';

// Relative imports
import { LocalComponent } from './LocalComponent';
import type { Props } from '../types';
```
