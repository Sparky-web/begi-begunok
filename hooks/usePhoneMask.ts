"use client"

import type React from "react"

export function usePhoneMask() {
  const formatPhoneNumber = (value: string): string => {
    if (!value) return ""

    // Remove all non-digit characters
    const phoneNumber = value.replace(/\D/g, "")

    // Apply the mask
    if (phoneNumber.length === 0) {
      return ""
    } else if (phoneNumber.length <= 1) {
      return `+7 (${phoneNumber}`
    } else if (phoneNumber.length <= 4) {
      return `+7 (${phoneNumber.slice(0, 3)}`
    } else if (phoneNumber.length <= 7) {
      return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`
    } else if (phoneNumber.length <= 9) {
      return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`
    } else {
      return `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`
    }
  }

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value)
    e.target.value = formattedValue
  }

  return { handlePhoneInput, formatPhoneNumber }
}

