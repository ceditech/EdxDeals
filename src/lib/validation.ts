import { z } from "zod";

// Base login form validation schema
const baseLoginSchema = z.object({
  username: z.string()
    .min(4, "Username must be at least 4 characters")
    .refine(val => {
      const emailRegex = /^\S+@\S+\.\S+$/;
      const phoneRegex = /^\+?\d{10,15}$/;
      return emailRegex.test(val) || phoneRegex.test(val.replace(/[\s\-\(\)]/g, ''));
    }, {
      message: "Enter a valid email address or phone number"
    }),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
  userType: z.enum(['user', 'seller'], {
    required_error: "Please select account type"
  }),
});

// Login form validation schema with user type
export const loginSchema = baseLoginSchema;

// Seller-specific login fields (if needed in future)
export const sellerLoginSchema = baseLoginSchema.extend({
  // Add seller-specific login fields here if needed
});

// Base registration form validation schema
const baseRegisterSchema = z.object({
  userType: z.enum(['user', 'seller'], {
    required_error: "Please select account type"
  }),
  firstName: z.string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s]+$/, "First name can only contain letters"),
  lastName: z.string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),
  email: z.string()
    .email("Enter a valid email address")
    .max(100, "Email is too long"),
  phone: z.string()
    .refine(val => {
      const phoneRegex = /^\+?\d{10,15}$/;
      return phoneRegex.test(val.replace(/[\s\-\(\)]/g, ''));
    }, {
      message: "Enter a valid phone number (10-15 digits)"
    }),
  addressLine1: z.string()
    .min(1, "Address is required")
    .max(100, "Address is too long"),
  addressLine2: z.string()
    .max(100, "Address line 2 is too long")
    .optional(),
  country: z.string()
    .min(2, "Country is required"),
  city: z.string()
    .min(1, "City is required")
    .max(50, "City name is too long"),
  state: z.string()
    .min(1, "State/Province is required")
    .max(50, "State/Province name is too long"),
  postalCode: z.string()
    .min(1, "Postal code is required")
    .max(20, "Postal code is too long"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password is too long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password"),
});

// User registration schema
export const registerSchema = baseRegisterSchema.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Seller registration schema with additional fields
export const sellerRegisterSchema = baseRegisterSchema.extend({
  companyName: z.string()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),
  businessType: z.string()
    .min(1, "Business type is required"),
  companySize: z.string()
    .min(1, "Company size is required"),
  industry: z.string()
    .min(1, "Industry is required"),
  website: z.string()
    .url("Enter a valid website URL")
    .optional()
    .or(z.literal("")),
  taxId: z.string()
    .min(1, "Tax ID is required for seller accounts")
    .max(50, "Tax ID is too long"),
  businessDescription: z.string()
    .min(10, "Business description must be at least 10 characters")
    .max(500, "Business description is too long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Type exports for form data
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SellerRegisterFormData = z.infer<typeof sellerRegisterSchema>;