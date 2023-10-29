import Image, { StaticImageData } from 'next/image'

export const Background = (staticImageData: StaticImageData) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -10,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Image
        alt='BG'
        src={staticImageData.src}
        width={staticImageData.width}
        height={staticImageData.height}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  )
}
