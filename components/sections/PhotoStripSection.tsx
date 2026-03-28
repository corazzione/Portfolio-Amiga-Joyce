export function PhotoStripSection() {
  const photos = Array.from({ length: 5 })

  return (
    <section className="py-12 overflow-hidden">
      <div
        className="flex gap-5 items-start justify-center"
        style={{
          maskImage:
            'radial-gradient(46% 266%, #000 0%, #000 52%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(46% 266%, #000 0%, #000 52%, transparent 100%)',
        }}
      >
        {photos.map((_, i) => {
          const isCenter = i === 2

          if (isCenter) {
            return (
              <div
                key={i}
                className="flex-shrink-0"
                style={{
                  width: '272px',
                  height: '281px',
                  background: '#EFE8DC',
                  boxShadow:
                    'rgba(0,0,0,0.07) 0px 0.8px 3.5px -0.4px, rgba(0,0,0,0.07) 0px 2.1px 8.9px -0.75px, rgba(0,0,0,0.06) 0px 5px 21px -1.125px',
                }}
              >
                <div
                  className="bg-dark/10"
                  style={{
                    margin: '8px 8px 28px 8px',
                    width: '256px',
                    height: '245px',
                  }}
                />
              </div>
            )
          }

          return (
            <div
              key={i}
              className="flex-shrink-0 bg-dark/10"
              style={{ width: '257px', height: '251px' }}
            />
          )
        })}
      </div>
    </section>
  )
}
