import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'etaklif.vercel.app'
export const contentType = 'image/png'
export const size = {
  width: 1200,
  height: 630,
}
export const route = '/opengraph-image.png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 32,
          background: 'linear-gradient(to right, #f5f5f5, #e0e0e0)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom right, #f0f9ff, #e6f7ff, #ccecff)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            textAlign: 'center',
            color: '#333',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              marginBottom: 20,
              background: 'linear-gradient(to right, #3b82f6, #4f46e5)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            etaklif.vercel.app
          </div>

          <div
            style={{
              fontSize: 32,
              marginBottom: 40,
              maxWidth: '80%',
            }}
          >
            Zamonaviy taklifnomalar platformasi
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            <div
              style={{
                padding: '10px 20px',
                background: '#3b82f6',
                color: 'white',
                borderRadius: '8px',
                fontSize: 24,
              }}
            >
              To'ylar
            </div>
            <div
              style={{
                padding: '10px 20px',
                background: '#4f46e5',
                color: 'white',
                borderRadius: '8px',
                fontSize: 24,
              }}
            >
              Tug'ilgan kunlar
            </div>
            <div
              style={{
                padding: '10px 20px',
                background: '#7c3aed',
                color: 'white',
                borderRadius: '8px',
                fontSize: 24,
              }}
            >
              Yubileylar
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
} 