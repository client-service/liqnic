import IllumaAd from "./illuma-ad"

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
            <IllumaAd
              src="https://res.cloudinary.com/dtc5wqlst/video/upload/v1778725728/iqos_iluma_ad_2_tb8hx0.mp4"
              poster="/images/video-thumbnail.jpg" // optional
            />
          </div>
        </div>
      </div>
    </section>
  )
}
