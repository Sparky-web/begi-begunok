"use client"

import type React from "react"

import { useEffect, useState, forwardRef } from "react"
import { Input } from "@/components/ui/input"

interface PhoneInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  className?: string
  onChange?: (value: string) => void
  value?: string
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, value: propValue, ...props }, ref) => {
    const [value, setValue] = useState(propValue || "+7 (___) ___-__-__")

    useEffect(() => {
      if (propValue !== undefined) {
        setValue(formatPhoneNumber(propValue))
      }
    }, [propValue])

    const formatPhoneNumber = (input: string): string => {
      // Keep only digits
      const digits = input.replace(/\D/g, "")

      // Always keep +7 prefix
      const prefix = "+7"

      // Format the rest of the digits
      let formatted = prefix

      if (digits.length > 0) {
        formatted += ` (${digits.substring(1, 4).padEnd(3, "_")}`
      } else {
        formatted += " (___"
      }

      if (digits.length > 4) {
        formatted += `) ${digits.substring(4, 7).padEnd(3, "_")}`
      } else {
        formatted += ") ___"
      }

      if (digits.length > 7) {
        formatted += `-${digits.substring(7, 9).padEnd(2, "_")}`
      } else {
        formatted += "-__"
      }

      if (digits.length > 9) {
        formatted += `-${digits.substring(9, 11).padEnd(2, "_")}`
      } else {
        formatted += "-__"
      }

      return formatted
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputVal = e.target.value
      const cursorPosition = e.target.selectionStart || 0

      // Only process if input is different from current value
      if (inputVal !== value) {
        // Extract digits from current input
        let digits = inputVal.replace(/\D/g, "")

        // Don't let digits exceed 11 characters (including +7)
        if (digits.length > 11) {
          digits = digits.substring(0, 11)
        }

        // Always start with 7 for Russia
        if (digits.length > 0 && digits[0] !== "7") {
          digits = "7" + digits.substring(Math.min(1, digits.length))
        }

        // Format phone number
        const formattedValue = formatPhoneNumber(digits)
        setValue(formattedValue)

        // Call the onChange prop with raw digits
        if (onChange) {
          onChange(digits)
        }

        // Schedule cursor position update after state update
        setTimeout(() => {
          if (e.target) {
            try {
              // Try to maintain cursor position logically
              let newPosition = cursorPosition

              // If backspace was pressed
              if (inputVal.length < value.length) {
                newPosition = Math.max(0, cursorPosition - 1)
              }
              // If new digit was added
              else if (inputVal.length > value.length) {
                // Move cursor forward if we're at a formatting character
                if ([" ", "(", ")", "-"].includes(formattedValue.charAt(newPosition))) {
                  newPosition += 1
                }
              }

              e.target.setSelectionRange(newPosition, newPosition)
            } catch (e) {
              // Ignore selection errors
            }
          }
        }, 0)
      }
    }

    return <Input type="tel" ref={ref} className={className} value={value} onChange={handleInputChange} {...props} />
  },
)

PhoneInput.displayName = "PhoneInput"

export default PhoneInput

