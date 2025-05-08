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

// Default rasmlar
const DEFAULT_IMAGES = {
  wedding: 'https://res.cloudinary.com/ds7uywpld/image/upload/v1744642148/invitations/av26tkcvws1d50tqfclc.webp',
  birthday: 'https://res.cloudinary.com/ds7uywpld/image/upload/v1743767337/invitations/dckjuhjwvbcmtqz2ceqj.jpg',
  funeral: 'https://res.cloudinary.com/ds7uywpld/image/upload/v1744628821/invitations/rbafrj2m2fdqiavxqcnr.jpg',
  jubilee: 'https://res.cloudinary.com/ds7uywpld/image/upload/v1744631369/invitations/yb19akzuhis3jsqrqyxs.jpg',
  engagement: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.photobookcanada.com%2Fideas%2Feverything-you-need-to-know-engagement-party-faqs%2F&psig=AOvVaw3Ppe4PvzVYKMljFySS44Wz&ust=1746805832638000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCIDUlP6clI0DFQAAAAAdAAAAABAE'
}

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
    let titleColor = '#ffffff'
    let textColor = '#ffffff'
    let accentColor = '#ffffff'

    // Rasm manzili
    const backgroundImage = invitationData.uploadedImage || DEFAULT_IMAGES[type] || DEFAULT_IMAGES.wedding

    // Taklifnoma turiga qarab background va ranglarni o'zgartirish
    switch (templateId) {
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
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }} />

          {/* Content overlay */}
          <div style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#ffffff'
          }}>
            {/* Taklifnoma sarlavhasi */}
            <div style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: '1rem',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {title}
            </div>

            {/* Qo'shimcha ma'lumot (ismlar) */}
            <div style={{
              fontSize: 56,
              marginBottom: '2rem',
              textAlign: 'center',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
            }}>
              {subtitle}
            </div>

            {/* Taklifnoma ma'lumotlari */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              background: 'rgba(0, 0, 0, 0.6)',
              borderRadius: '16px',
              padding: '24px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              width: '80%'
            }}>
              {/* Sana */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '32px' }}>📅</div>
                <div style={{ fontSize: '32px' }}>
                  {formattedDate}
                </div>
              </div>

              {/* Vaqt */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '32px' }}>🕒</div>
                <div style={{ fontSize: '32px' }}>
                  {time}
                </div>
              </div>

              {/* Manzil */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ fontSize: '32px' }}>📍</div>
                <div style={{ fontSize: '32px' }}>
                  {location}
                </div>
              </div>
            </div>

            {/* Taklifnoma brendi */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              fontSize: '24px',
              opacity: 0.8
            }}>
              taklifnoma.uz
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