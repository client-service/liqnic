"use client"

import { useEffect, useRef, useState, useCallback } from "react"

type Props = {
  src: string
  poster?: string
}

export default function IllumaAd({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [showUnmuteHint, setShowUnmuteHint] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Auto-play when scrolled into view ──────────────────────────────────────
  const tryPlay = useCallback(async () => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    try {
      await video.play()
      setIsPlaying(true)
      setMuted(true)
      setShowUnmuteHint(true)
    } catch {
      setIsPlaying(false)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay()
          } else {
            videoRef.current?.pause()
            setIsPlaying(false)
            setShowUnmuteHint(false)
          }
        })
      },
      { threshold: 0.4 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [tryPlay])

  // ── Buffering detection ────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => setIsBuffering(false)
    const onCanPlay = () => setIsBuffering(false)
    video.addEventListener("waiting", onWaiting)
    video.addEventListener("playing", onPlaying)
    video.addEventListener("canplay", onCanPlay)
    return () => {
      video.removeEventListener("waiting", onWaiting)
      video.removeEventListener("playing", onPlaying)
      video.removeEventListener("canplay", onCanPlay)
    }
  }, [])

  // ── Progress bar ──────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }
    video.addEventListener("timeupdate", onTimeUpdate)
    return () => video.removeEventListener("timeupdate", onTimeUpdate)
  }, [])

  // ── Controls auto-hide on mobile ──────────────────────────────────────────
  const revealControls = useCallback(() => {
    setShowControls(true)
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current)
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000)
  }, [])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
    setShowUnmuteHint(false)
  }, [])

  const handleUnmuteOverlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = false
    setMuted(false)
    setShowUnmuteHint(false)
    if (video.paused) video.play().catch(() => {})
  }, [])

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    video.currentTime = ratio * video.duration
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative w-full aspect-video group bg-black"
      onMouseMove={revealControls}
      onTouchStart={revealControls}
    >
      {/* ── Video ── */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop
        playsInline
        muted // start muted — required for autoplay
        preload="metadata" // loads poster + duration, skips full download
        className="w-full h-full object-cover"
        // removed scale-110 — was causing GPU compositing overhead
      />

      {/* ── Buffering spinner ── */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
        </div>
      )}

      {/* ── Controls overlay ── */}
      {/* visible on hover (desktop) or on touch reveal (mobile) */}
      <div
        className={`absolute top-4 right-4 flex gap-2 z-20 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <button
          onClick={toggleMute}
          aria-label={muted ? "Unmute" : "Mute"}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          {muted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>

        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition"
        >
          {isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>

      {/* ── Progress bar (click to seek) ── */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10 cursor-pointer group/progress"
        onClick={handleSeek}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-[#C5A163] transition-all duration-200 group-hover/progress:h-[6px]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
