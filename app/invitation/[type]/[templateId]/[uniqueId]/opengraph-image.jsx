import { ImageResponse } from 'next/og'
import { getInvitationByUniqueId } from '@/app/services/share'

export const runtime = 'edge'
export const alt = 'Taklifnoma'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }) {
  try {
    // Taklifnoma ma'lumotlarini olish
    const invitationData = await getInvitationByUniqueId(params.uniqueId)
    
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

    // Sana formati
    let formattedDate = ''
    try {
      if (invitationData.date) {
        if (invitationData.date.includes("-")) {
          const dateObj = new Date(invitationData.date)
          if (!isNaN(dateObj.getTime())) {
            const day = dateObj.getDate()
            const months = [
              "Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun",
              "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
            ]
            const month = months[dateObj.getMonth()]
            formattedDate = `${day} ${month}`
          } else {
            formattedDate = invitationData.date
          }
        } else {
          formattedDate = invitationData.date
        }
      }
    } catch (error) {
      formattedDate = invitationData.date || ''
    }

    // Tadbir turiga qarab sarlavha va tavsif
    let title = ''
    let description = ''
    const location = invitationData.location || 'Manzil ko\'rsatilmagan'
    const time = invitationData.time || 'Vaqt ko\'rsatilmagan'
    const firstName = invitationData.firstName || ''
    const secondName = invitationData.secondName || ''
    const age = invitationData.age || ''

    switch (params.type) {
      case 'wedding':
        title = 'To\'y taklifnomasi'
        description = `${firstName} va ${secondName} nikoh to'yi`
        break
      case 'birthday':
        title = 'Tug\'ilgan kun taklifnomasi'
        description = `${firstName} ${age}-yoshga to'lishi munosabati bilan`
        break
      case 'funeral':
        title = 'El oshi taklifnomasi'
        description = `${firstName} xotirasiga bag'ishlangan tadbir`
        break
      case 'jubilee':
        title = 'Yubiley taklifnomasi'
        description = `${firstName} ${age}-yillik yubileyi`
        break
      case 'engagement':
        title = 'Fotiha to\'yi taklifnomasi'
        description = `${firstName} fotiha to'yi`
        break
      default:
        title = 'Taklifnoma'
        description = `${firstName} taklifnomasi`
    }

    // Rasm mavjudligini tekshirish
    const hasImage = invitationData.uploadedImage && invitationData.uploadedImage.length > 0
    
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 32,
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Background with overlay */}
          {hasImage ? (
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              display: 'flex',
              backgroundImage: `url(${invitationData.uploadedImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.7)',
            }} />
          ) : (
            <div style={{ 
              position: 'absolute', 
              inset: 0,
              background: 'linear-gradient(to bottom right, #f0f9ff, #e6f7ff, #ccecff)',
            }} />
          )}
          
          {/* Content overlay */}
          <div style={{ 
            position: 'absolute',
            inset: 0,
            background: hasImage ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: hasImage ? 'white' : '#333',
          }}>
            <div style={{ 
              fontSize: 48, 
              fontWeight: 'bold', 
              marginBottom: 20,
              textShadow: hasImage ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
            }}>
              {title}
            </div>
            
            <div style={{ 
              fontSize: 40, 
              marginBottom: 30, 
              maxWidth: '80%',
              textShadow: hasImage ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
            }}>
              {description}
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '10px', 
              marginBottom: 20,
              background: 'rgba(255,255,255,0.2)',
              padding: '20px',
              borderRadius: '10px',
              backdropFilter: 'blur(5px)',
            }}>
              <div style={{ 
                fontSize: 28,
                textShadow: hasImage ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
              }}>
                Sana: {formattedDate}
              </div>
              <div style={{ 
                fontSize: 28,
                textShadow: hasImage ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
              }}>
                Vaqt: {time}
              </div>
              <div style={{ 
                fontSize: 28,
                textShadow: hasImage ? '0 1px 2px rgba(0,0,0,0.5)' : 'none',
              }}>
                Manzil: {location}
              </div>
            </div>
            
            <div style={{ 
              position: 'absolute', 
              bottom: 20, 
              fontSize: 20,
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              taklifnoma.uz
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        emoji: 'noto',
      }
    )
  } catch (error) {
    // Xatolik bo'lsa standart rasm qaytarish
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