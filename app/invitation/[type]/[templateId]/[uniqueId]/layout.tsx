import React from 'react'
import { Metadata } from 'next';

export default function InvitationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
export async function generateMetadata({ params }: { params: { type: string, templateId: string } }): Promise<Metadata> {
  return {
    other: {
      'telegram:card': 'summary_large_image',
      'telegram:site': '@taklifnoma_uz',
      'telegram:creator': '@taklifnoma_uz',
    }
  };
}