"use server"

import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

type FormData = z.infer<typeof formSchema>

export async function submitContactForm(formData: FormData) {
  try {
    // Validate form data
    const validatedData = formSchema.parse(formData)

    // Get the Web3Forms API key from environment variables (server-side only)
    const web3FormsKey = process.env.WEB3FORMS_KEY

    if (!web3FormsKey) {
      return {
        success: false,
        message: "Server configuration error. Please try again later or contact directly via email.",
      }
    }

    // Submit to Web3Forms
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        ...validatedData,
      }),
    })

    const data = await response.json()

    if (data.success) {
      return {
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      }
    } else {
      return {
        success: false,
        message: data.message || "Something went wrong. Please try again.",
      }
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        message: "Validation error. Please check your input.",
        errors: error.errors,
      }
    }

    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    }
  }
}
