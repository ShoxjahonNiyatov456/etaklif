import React from 'react'

export default function InvitationLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}

// Statik meta ma'lumotlar
export const metadata = {
  other: {
    // Telegram meta tags
    'telegram:card': 'summary_large_image',
    'telegram:site': '@taklifnoma_uz',
    'telegram:creator': '@taklifnoma_uz',
  }
}