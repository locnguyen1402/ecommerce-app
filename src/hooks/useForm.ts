import { useForm, UseFormProps, FieldValues, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';

interface UseFormWithValidationProps<T extends FieldValues> extends UseFormProps<T> {
  schema: yup.ObjectSchema<T>;
  onSuccess?: (data: T) => void | Promise<void>;
  onError?: (errors: any) => void;
  showToastOnError?: boolean;
  showToastOnSuccess?: boolean;
  successMessage?: string;
}

interface UseFormWithValidationReturn<T extends FieldValues> extends UseFormReturn<T> {
  handleSubmitWithValidation: (onValid: (data: T) => void | Promise<void>) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
}

export function useFormWithValidation<T extends FieldValues>({
  schema,
  onSuccess,
  onError,
  showToastOnError = true,
  showToastOnSuccess = false,
  successMessage = 'Form submitted successfully',
  ...formProps
}: UseFormWithValidationProps<T>): UseFormWithValidationReturn<T> {
  const form = useForm<T>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    ...formProps,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = form;

  const handleSubmitWithValidation = useCallback(
    (onValid: (data: T) => void | Promise<void>) =>
      handleSubmit(
        async (data: T) => {
          try {
            // Call the provided onValid function
            await onValid(data);
            
            // Call the success callback if provided
            if (onSuccess) {
              await onSuccess(data);
            }

            // Show success toast if enabled
            if (showToastOnSuccess) {
              Toast.show({
                type: 'success',
                text1: 'Success',
                text2: successMessage,
                position: 'top',
              });
            }
          } catch (error: any) {
            console.error('Form submission error:', error);

            // Handle different types of errors
            if (error?.response?.data?.errors) {
              // Handle server validation errors
              const serverErrors = error.response.data.errors;
              Object.keys(serverErrors).forEach((field) => {
                setError(field as any, {
                  type: 'server',
                  message: serverErrors[field],
                });
              });
            } else if (error?.message) {
              // Show error toast if enabled
              if (showToastOnError) {
                Toast.show({
                  type: 'error',
                  text1: 'Error',
                  text2: error.message,
                  position: 'top',
                });
              }
            }

            // Call the error callback if provided
            if (onError) {
              onError(error);
            }
          }
        },
        (errors) => {
          // Handle form validation errors
          console.error('Form validation errors:', errors);
          
          if (showToastOnError) {
            const firstError = Object.values(errors)[0] as any;
            Toast.show({
              type: 'error',
              text1: 'Validation Error',
              text2: firstError?.message || 'Please check your input',
              position: 'top',
            });
          }

          if (onError) {
            onError(errors);
          }
        }
      ),
    [handleSubmit, onSuccess, onError, showToastOnError, showToastOnSuccess, successMessage, setError]
  );

  return {
    ...form,
    handleSubmitWithValidation,
    isSubmitting,
  };
}

// Helper hook for handling async operations with loading states
export function useAsyncOperation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async <T>(
    operation: () => Promise<T>,
    options?: {
      onSuccess?: (result: T) => void;
      onError?: (error: any) => void;
      showToastOnError?: boolean;
      showToastOnSuccess?: boolean;
      successMessage?: string;
    }
  ): Promise<T | null> => {
    const {
      onSuccess,
      onError,
      showToastOnError = true,
      showToastOnSuccess = false,
      successMessage = 'Operation completed successfully',
    } = options || {};

    setIsLoading(true);
    setError(null);

    try {
      const result = await operation();
      
      if (onSuccess) {
        onSuccess(result);
      }

      if (showToastOnSuccess) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: successMessage,
          position: 'top',
        });
      }

      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred';
      setError(errorMessage);

      if (showToastOnError) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage,
          position: 'top',
        });
      }

      if (onError) {
        onError(err);
      }

      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    execute,
    reset,
  };
}

// Hook for form field validation with debouncing
export function useFieldValidation<T>(
  schema: yup.Schema<T>,
  debounceMs: number = 300
) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateField = useCallback(
    debounce(async (value: T) => {
      setIsValidating(true);
      
      try {
        await schema.validate(value);
        setValidationError(null);
        setIsValid(true);
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          setValidationError(error.message);
          setIsValid(false);
        }
      } finally {
        setIsValidating(false);
      }
    }, debounceMs),
    [schema, debounceMs]
  );

  const reset = useCallback(() => {
    setValidationError(null);
    setIsValid(null);
    setIsValidating(false);
  }, []);

  return {
    validateField,
    isValidating,
    validationError,
    isValid,
    reset,
  };
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Import useState for useFieldValidation
import { useState } from 'react';
