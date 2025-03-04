"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import mapboxgl from "mapbox-gl"
import "mapbox-gl/dist/mapbox-gl.css"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Loader2 } from "lucide-react"
import { searchAddress, reverseGeocode, type DadataAddress } from "@/services/dadata"
import { debounce } from "lodash"

// Normally you would store this in .env.local
mapboxgl.accessToken = "pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw"

interface Point {
  lng: number
  lat: number
  address?: string
}

interface DeliveryMapProps {
  onSourceAddressChange: (address: string) => void
  onDestinationAddressChange: (address: string) => void
  sourceAddress: string
  destinationAddress: string
}

export default function DeliveryMap({
  onSourceAddressChange,
  onDestinationAddressChange,
  sourceAddress,
  destinationAddress,
}: DeliveryMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const sourceMarker = useRef<mapboxgl.Marker | null>(null)
  const destinationMarker = useRef<mapboxgl.Marker | null>(null)
  const [sourcePoint, setSourcePoint] = useState<Point | null>(null)
  const [destinationPoint, setDestinationPoint] = useState<Point | null>(null)
  const [suggestions, setSuggestions] = useState<DadataAddress[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [activeInput, setActiveInput] = useState<"source" | "destination" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const sourcePointRef = useRef<Point | null>(null)
  const destinationPointRef = useRef<Point | null>(null)

  // Handle point selection on map
  const handlePointSelection = useCallback(
    async (lng: number, lat: number) => {
      if (!map.current) return

      // Get address from coordinates using Dadata reverse geocoding
      try {
        setIsLoading(true)
        const address = await reverseGeocode(lat, lng)
        setIsLoading(false)

        if (!sourcePointRef.current) {
          // First point selection - set source point
          if (sourceMarker.current) {
            sourceMarker.current.remove()
          }
          sourceMarker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current)
          sourcePointRef.current = { lng, lat, address }
          setSourcePoint({ lng, lat, address })
          onSourceAddressChange(address)
        } else if (!destinationPointRef.current) {
          // Second point selection - set destination point
          if (destinationMarker.current) {
            destinationMarker.current.remove()
          }
          destinationMarker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current)
          destinationPointRef.current = { lng, lat, address }
          setDestinationPoint({ lng, lat, address })
          onDestinationAddressChange(address)
        }
      } catch (error) {
        console.error("Error fetching address:", error)
        setIsLoading(false)
      }
    },
    [onSourceAddressChange, onDestinationAddressChange],
  )

  // Initialize map only once
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [37.6173, 55.7558], // Moscow coordinates
      zoom: 11,
    })

    map.current.on("click", (e) => {
      const { lng, lat } = e.lngLat
      handlePointSelection(lng, lat)
    })

    return () => {
      if (map.current) {
        map.current.remove()
      }
    }
  }, [])

  // Debounced function to search for addresses
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.length > 2) {
        setIsLoading(true)
        try {
          const results = await searchAddress(query)
          setSuggestions(results)
          setShowSuggestions(true)
        } catch (error) {
          console.error("Error searching for address:", error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300),
    [],
  )

  // Handle address input change
  const handleAddressChange = useCallback(
    (address: string, type: "source" | "destination") => {
      if (type === "source") {
        onSourceAddressChange(address)
      } else {
        onDestinationAddressChange(address)
      }

      setActiveInput(type)
      debouncedSearch(address)
    },
    [debouncedSearch, onSourceAddressChange, onDestinationAddressChange],
  )

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback(
    (suggestion: DadataAddress) => {
      const lat = Number.parseFloat(suggestion.data.geo_lat)
      const lng = Number.parseFloat(suggestion.data.geo_lon)
      const address = suggestion.value

      if (activeInput === "source") {
        onSourceAddressChange(address)
        if (map.current) {
          if (sourceMarker.current) {
            sourceMarker.current.remove()
          }
          sourceMarker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current)
          sourcePointRef.current = { lng, lat, address }
          setSourcePoint({ lng, lat, address })
          map.current.flyTo({ center: [lng, lat], zoom: 14 })
        }
      } else if (activeInput === "destination") {
        onDestinationAddressChange(address)
        if (map.current) {
          if (destinationMarker.current) {
            destinationMarker.current.remove()
          }
          destinationMarker.current = new mapboxgl.Marker({ color: "#ff8a00" }).setLngLat([lng, lat]).addTo(map.current)
          destinationPointRef.current = { lng, lat, address }
          setDestinationPoint({ lng, lat, address })
          map.current.flyTo({ center: [lng, lat], zoom: 14 })
        }
      }

      setSuggestions([])
      setShowSuggestions(false)
      setActiveInput(null)
    },
    [activeInput, onSourceAddressChange, onDestinationAddressChange],
  )

  const handleReset = () => {
    if (sourceMarker.current) {
      sourceMarker.current.remove()
    }
    if (destinationMarker.current) {
      destinationMarker.current.remove()
    }
    if (map.current) {
      if (map.current.getLayer("route")) {
        map.current.removeLayer("route")
      }
      if (map.current.getSource("route")) {
        map.current.removeSource("route")
      }
    }
    sourcePointRef.current = null
    destinationPointRef.current = null
    setSourcePoint(null)
    setDestinationPoint(null)
    onSourceAddressChange("")
    onDestinationAddressChange("")
  }

  // Draw line between points
  useEffect(() => {
    if (!map.current || !sourcePoint || !destinationPoint) return

    // Remove existing route layer and source
    if (map.current.getLayer("route")) {
      map.current.removeLayer("route")
    }
    if (map.current.getSource("route")) {
      map.current.removeSource("route")
    }

    map.current.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [
            [sourcePoint.lng, sourcePoint.lat],
            [destinationPoint.lng, destinationPoint.lat],
          ],
        },
      },
    })

    map.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#ff8a00",
        "line-width": 3,
        "line-opacity": 0.8,
      },
    })

    // Fit map to show both points
    const bounds = new mapboxgl.LngLatBounds()
    bounds.extend([sourcePoint.lng, sourcePoint.lat])
    bounds.extend([destinationPoint.lng, destinationPoint.lat])
    map.current.fitBounds(bounds, { padding: 100 })
  }, [sourcePoint, destinationPoint])

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4">
        <div className="relative">
          <Label htmlFor="source-address" className="text-sm sm:text-base">
            Адрес отправления
          </Label>
          <div className="relative">
            <Input
              id="source-address"
              value={sourceAddress}
              onChange={(e) => handleAddressChange(e.target.value, "source")}
              placeholder="Введите адрес отправления"
              className="mt-1 pr-10 text-sm sm:text-base"
              onFocus={() => setActiveInput("source")}
            />
            {isLoading && activeInput === "source" ? (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {showSuggestions && activeInput === "source" && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-primary/10 cursor-pointer text-sm"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion.value}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <Label htmlFor="destination-address" className="text-sm sm:text-base">
            Адрес получения
          </Label>
          <div className="relative">
            <Input
              id="destination-address"
              value={destinationAddress}
              onChange={(e) => handleAddressChange(e.target.value, "destination")}
              placeholder="Введите адрес получения"
              className="mt-1 pr-10 text-sm sm:text-base"
              onFocus={() => setActiveInput("destination")}
            />
            {isLoading && activeInput === "destination" ? (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            )}
          </div>
          {showSuggestions && activeInput === "destination" && suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 hover:bg-primary/10 cursor-pointer text-sm"
                  onClick={() => handleSuggestionSelect(suggestion)}
                >
                  {suggestion.value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xs sm:text-sm text-muted-foreground">
          {!sourcePoint
            ? "Выберите точку отправления на карте или найдите адрес"
            : !destinationPoint
              ? "Выберите точку получения на карте или найдите адрес"
              : "Маршрут построен"}
        </div>
        {(sourcePoint || destinationPoint) && (
          <button
            onClick={handleReset}
            className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Сбросить точки
          </button>
        )}
      </div>
      <div className="relative">
        <div ref={mapContainer} className="h-[300px] sm:h-[400px] w-full rounded-lg" />
        {isLoading && !activeInput && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50 rounded-lg">
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
}

