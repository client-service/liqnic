export default function AvatarBox({
  src = "/logo.png",
  alt = "Avatar",
  checked,
}: {
  src?: string;
  alt?: string;
  checked?: boolean;
}) {
  return (
    <div className="relative mb-4 flex w-24 items-center justify-center rounded-xl overflow-hidden">
      {/* ✅ Avatar Image */}
      <img
        src={src}
        alt={alt}
        width={50}
        height={50}
        className="object-cover w-full h-full rounded-xl"
      />

      {/* ✅ Optional Checkmark */}
      {checked && (
        <div className="absolute -right-[5px] -top-1 flex size-5 items-center justify-center rounded-full border border-white bg-[#3B82F6] shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M5.8335 10.4167L9.16683 13.75L14.1668 6.25"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
