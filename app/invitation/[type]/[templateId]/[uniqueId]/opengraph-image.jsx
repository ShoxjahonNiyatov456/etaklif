import { ImageResponse } from 'next/og'
import { getInvitationByUniqueId } from '@/app/services/share'

export const runtime = 'edge'
export const alt = 'Taklifnoma'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}
export const route = '/invitation/[type]/[templateId]/[uniqueId]/opengraph-image.png'

export default async function Image({ params }) {
  try {
    const data = await getInvitationByUniqueId(params.uniqueId)
    const invitationData = data?.invitationData || data
    
    if (!invitationData) {
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 48,
              background: 'linear-gradient(to bottom right, #f5f5f5, #e0e0e0)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#666',
              padding: '40px',
              textAlign: 'center',
            }}
          >
            <div style={{ marginBottom: '20px' }}>Taklifnoma topilmadi</div>
            <div style={{
              fontSize: 24,
              opacity: 0.7
            }}>
              taklifnoma.uz
            </div>
          </div>
        ),
        { width: 1200, height: 630 }
      )
    }

    // Ma'lumotlarni olish
    const location = invitationData.location || 'Manzil ko\'rsatilmagan'
    const time = invitationData.time || 'Vaqt ko\'rsatilmagan'
    const firstName = invitationData.firstName || ''
    const secondName = invitationData.secondName || ''
    const age = invitationData.age || ''
    const date = invitationData.date || ''

    // Sana formati
    let formattedDate = date
    try {
      if (date && date.includes("-")) {
        const dateObj = new Date(date)
        if (!isNaN(dateObj.getTime())) {
          const day = dateObj.getDate()
          const months = [
            "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
            "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
          ]
          const month = months[dateObj.getMonth()]
          formattedDate = `${day} ${month}`
        }
      }
    } catch (error) {
      formattedDate = date
    }

    // Taklifnoma turini aniqlash
    const { type, templateId } = params
    
    // Shablonga asoslangan background va style yaratish
    let backgroundStyle = {}
    let titleColor = '#1e293b'
    let textColor = '#334155'
    let accentColor = '#3b82f6'
    
    // Taklifnoma turiga qarab background va ranglarni o'zgartirish
    switch(templateId) {
      case 'golden-ornament':
        backgroundStyle = {
          background: 'linear-gradient(135deg, #f6e9c4 0%, #e7c982 100%)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e7bf60'
        }
        titleColor = '#8e6512'
        textColor = '#5c4001'
        accentColor = '#d4a427'
        break
      case 'romantic':
        backgroundStyle = {
          background: 'linear-gradient(135deg, #ffecec 0%, #ffb6c1 100%)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #ff99aa'
        }
        titleColor = '#c02942'
        textColor = '#4a1218'
        accentColor = '#ff6b81'
        break
      case 'classic':
        backgroundStyle = {
          background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #bfdbfe'
        }
        titleColor = '#1e40af'
        textColor = '#1e3a8a'
        accentColor = '#3b82f6'
        break
      default:
        backgroundStyle = {
          background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          border: '2px solid #e5e7eb'
        }
    }
    
    // Taklifnoma turiga qarab titularni o'zgartirish
    let title = 'Taklifnoma'
    let subtitle = ''
    
    switch (type) {
      case 'wedding':
        title = 'Nikoh to\'yi'
        subtitle = `${firstName} va ${secondName}`
        break
      case 'birthday':
        title = 'Tug\'ilgan kun'
        subtitle = `${firstName}${age ? ` ${age}-yosh` : ''}`
        break
      case 'funeral':
        title = 'El oshi'
        subtitle = `${firstName}`
        break
      case 'jubilee':
        title = 'Yubiley'
        subtitle = `${firstName}${age ? ` ${age}-yillik` : ''}`
        break
      case 'engagement':
        title = 'Unashtiruv'
        subtitle = `${firstName} va ${secondName}`
        break
    }
    
    // Rasm mavjudligini tekshirish
    const hasImage = invitationData.uploadedImage && invitationData.uploadedImage.length > 0
    
    // Taklifnoma dizaynining shablonga asoslangan OpenGraph tasviri
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'white',
            padding: '40px',
            fontSize: 32,
            color: textColor
          }}
        >
          {/* Asosiy taklifnoma konteyner */}
          <div style={{
            width: '90%',
            height: '90%',
            borderRadius: '20px',
            overflow: 'hidden',
            padding: '2rem',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            ...backgroundStyle
          }}>
            {/* Background image if available */}
            {hasImage && (
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url(${invitationData.uploadedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }} />
            )}
            
            <div style={{
              textAlign: 'center',
              zIndex: 1,
              width: '100%',
            }}>
              {/* Taklifnoma sarlavhasi */}
              <div style={{
                fontSize: 60,
                fontWeight: 'bold',
                marginBottom: '0.5rem',
                color: titleColor
              }}>
                {title}
              </div>
              
              {/* Qo'shimcha ma'lumot (ismlar) */}
              <div style={{
                fontSize: 50,
                marginBottom: '2rem',
                color: titleColor
              }}>
                {subtitle}
              </div>
              
              {/* Taklifnoma ma'lumotlari */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                background: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '16px',
                padding: '24px',
                backdropFilter: 'blur(10px)',
                border: `1px solid rgba(255, 255, 255, 0.3)`,
                marginBottom: '20px'
              }}>
                {/* Sana */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '22px'
                  }}>
                    📅
                  </div>
                  <div style={{ fontSize: '26px' }}>
                    <span style={{ fontWeight: 'bold' }}>Sana:</span> {formattedDate}
                  </div>
                </div>
                
                {/* Vaqt */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '22px'
                  }}>
                    🕒
                  </div>
                  <div style={{ fontSize: '26px' }}>
                    <span style={{ fontWeight: 'bold' }}>Vaqt:</span> {time}
                  </div>
                </div>
                
                {/* Manzil */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px', 
                    background: accentColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '22px'
                  }}>
                    📍
                  </div>
                  <div style={{ fontSize: '26px' }}>
                    <span style={{ fontWeight: 'bold' }}>Manzil:</span> {location}
                  </div>
                </div>
              </div>
              
              {/* Taklifnoma brendi */}
              <div style={{
                fontSize: '20px',
                opacity: 0.7,
                marginTop: '12px'
              }}>
                taklifnoma.uz
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'twemoji',
      }
    )
  } catch (error) {
    console.error('Opengraph image generation error:', error)
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 48,
            background: 'linear-gradient(to bottom right, #f5f5f5, #e0e0e0)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            padding: '40px',
            textAlign: 'center',
          }}
        >
          <div style={{ marginBottom: '20px' }}>Taklifnoma</div>
          <div style={{
            fontSize: 24,
            opacity: 0.7
          }}>
            taklifnoma.uz
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }
}