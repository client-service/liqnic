export default function IqosDeviceSection() {
  return (
    <section className="py-16 px-0 bg-white">
      <div className="w-full">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How to Use IQOS Devices
          </h2>
        </div>

        <div className="w-full component-px">
          <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/xqa2IUm5O-w?rel=0&modestbranding=1&controls=1"
              title="IQOS Device Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
