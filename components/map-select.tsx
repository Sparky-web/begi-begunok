"use client"

import { useEffect, useRef, useState } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css"

// Normally you would store this in .env.local
mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"

interface Point {
  lng: number
  lat: number
}

interface MapSelectProps {
  onSelectLocation: (point: Point) => void
  initialCenter?: Point
}

export default function MapSelect({ onSelectLocation, initialCenter }: MapSelectProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const marker = useRef<mapboxgl.Marker | null>(null)

  const [lng] = useState(initialCenter?.lng || 37.6173)
  const [lat] = useState(initialCenter?.lat || 55.7558)
  const [zoom] = useState(11)

  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    })

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: "Поиск адреса...",
      language: "ru",
      countries: "ru",
      bbox: [36.8, 55.5, 38.2, 56.0], // Moscow bounding box
    })

    map.current.addControl(geocoder)

    const handleClick = (e: mapboxgl.MapMouseEvent) => {
      const { lng, lat } = e.lngLat

      if (marker.current) {
        marker.current.remove()
      }

      marker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current!)

      onSelectLocation({ lng, lat })
    }

    map.current.on("click", handleClick)

    geocoder.on("result", (event) => {
      const [lng, lat] = event.result.center

      if (marker.current) {
        marker.current.remove()
      }

      marker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current!)

      onSelectLocation({ lng, lat })
    })

    return () => {
      map.current?.remove()
    }
  }, [lng, lat, zoom, onSelectLocation])

  return <div ref={mapContainer} className="h-[400px] w-full rounded-lg" />
}

