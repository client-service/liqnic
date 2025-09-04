export default function IqosDeviceSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover IQOS Device
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the innovative technology and sleek design of IQOS
            devices
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/xqa2IUm5O-w?si=BFe9h6gWJfELP_iZ"
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
      </div>
    </section>
  )
}
