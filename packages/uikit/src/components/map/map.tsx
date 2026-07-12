"use client";

import type {
  ComponentPropsWithRef,
  CSSProperties,
  ReactElement,
  ReactNode,
  Ref,
} from "react";
import {
  createContext,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Button, ButtonGroup, CloseButton, cn, Spinner } from "@heroui/react";
import maplibregl, {
  type Map as MapRef,
  type MapOptions,
  type MarkerOptions,
  type PopupOptions,
  type ProjectionSpecification,
  type StyleSpecification,
} from "maplibre-gl";

export type MapTheme = "dark" | "light";
export interface MapViewport {
  bearing: number;
  center: [number, number];
  pitch: number;
  zoom: number;
}
export interface MapStyles {
  dark?: StyleSpecification | string;
  light?: StyleSpecification | string;
}
interface MapContextValue {
  isLoaded: boolean;
  map: MapRef | null;
}
const Context = createContext<MapContextValue | null>(null);
const useMapContext = (): MapContextValue => {
  const context = useContext(Context);
  if (!context) throw new Error("Map components must be used within <Map>.");
  return context;
};
export const useMap = (): MapContextValue => useMapContext();

const emptyStyle: StyleSpecification = { layers: [], sources: {}, version: 8 };
const getViewport = (map: MapRef): MapViewport => {
  const center = map.getCenter();
  return {
    bearing: map.getBearing(),
    center: [center.lng, center.lat],
    pitch: map.getPitch(),
    zoom: map.getZoom(),
  };
};
const getDocumentTheme = (): MapTheme =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";

export interface MapRootProps extends Omit<MapOptions, "container" | "style"> {
  "aria-describedby"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: ReactNode;
  className?: string;
  id?: string;
  isLoading?: boolean;
  mapStyle?: StyleSpecification | string;
  onViewportChange?: (viewport: MapViewport) => void;
  projection?: ProjectionSpecification;
  ref?: Ref<MapRef | null>;
  role?: string;
  style?: CSSProperties;
  styles?: MapStyles;
  theme?: MapTheme;
  tabIndex?: number;
  viewport?: Partial<MapViewport>;
}
export function MapRoot({
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
  className,
  isLoading = false,
  id,
  mapStyle,
  onViewportChange,
  projection,
  ref,
  role,
  style,
  styles,
  theme,
  tabIndex,
  viewport,
  ...props
}: MapRootProps): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MapRef | null>(null);
  const [isLoaded, setLoaded] = useState(false);
  const [documentTheme, setDocumentTheme] =
    useState<MapTheme>(getDocumentTheme);
  const optionsRef = useRef(props);
  const viewportCallback = useRef(onViewportChange);
  viewportCallback.current = onViewportChange;
  const resolvedTheme = theme ?? documentTheme;
  const resolvedStyle =
    mapStyle ??
    (resolvedTheme === "dark"
      ? (styles?.dark ?? styles?.light ?? emptyStyle)
      : (styles?.light ?? styles?.dark ?? emptyStyle));
  const styleRef = useRef(resolvedStyle);

  useImperativeHandle(ref, () => map as MapRef, [map]);
  useEffect(() => {
    if (theme || typeof document === "undefined") return;
    const observer = new MutationObserver(() =>
      setDocumentTheme(getDocumentTheme()),
    );
    observer.observe(document.documentElement, {
      attributeFilter: ["class"],
      attributes: true,
    });
    return () => observer.disconnect();
  }, [theme]);
  useEffect(() => {
    if (!containerRef.current) return;
    const instance = new maplibregl.Map({
      attributionControl: { compact: true },
      container: containerRef.current,
      renderWorldCopies: false,
      style: styleRef.current as StyleSpecification | string,
      ...optionsRef.current,
      ...viewport,
    });
    const onLoad = () => {
      setLoaded(true);
      if (projection) instance.setProjection(projection);
    };
    const onMove = () => viewportCallback.current?.(getViewport(instance));
    instance.on("load", onLoad);
    instance.on("move", onMove);
    setMap(instance);
    return () => {
      instance.off("load", onLoad);
      instance.off("move", onMove);
      instance.remove();
      setMap(null);
      setLoaded(false);
    };
  }, []);
  useEffect(() => {
    if (!map) return;
    map.setStyle(resolvedStyle, { diff: false });
    setLoaded(false);
    const onStyle = () => setLoaded(true);
    map.once("style.load", onStyle);
    return () => {
      map.off("style.load", onStyle);
    };
  }, [map, resolvedStyle]);
  useEffect(() => {
    if (map && projection) map.setProjection(projection);
  }, [map, projection]);
  useEffect(() => {
    if (!map || !viewport) return;
    map.jumpTo(viewport);
  }, [map, viewport]);

  return (
    <Context value={{ isLoaded, map }}>
      <div
        aria-describedby={ariaDescribedBy}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn("map", className)}
        data-loaded={isLoaded ? "true" : undefined}
        data-loading={!isLoaded || isLoading ? "true" : undefined}
        data-slot="map"
        id={id}
        ref={containerRef}
        role={role}
        style={style}
        tabIndex={tabIndex}
      >
        {!isLoaded || isLoading ? (
          <div className="map__loader" data-slot="map-loader">
            <Spinner
              className="map__loader-spinner"
              color="current"
              size="sm"
            />
          </div>
        ) : null}
        {map ? children : null}
      </div>
    </Context>
  );
}

interface MarkerContextValue {
  map: MapRef | null;
  marker: maplibregl.Marker;
}
const MarkerContext = createContext<MarkerContextValue | null>(null);
const useMarker = () => {
  const context = useContext(MarkerContext);
  if (!context)
    throw new Error("Marker components must be used within <Map.Marker>.");
  return context;
};
export interface MapMarkerProps extends MarkerOptions {
  children?: ReactNode;
  latitude: number;
  longitude: number;
  onClick?: (event: MouseEvent) => void;
  onDrag?: (position: { lat: number; lng: number }) => void;
  onDragEnd?: (position: { lat: number; lng: number }) => void;
  onDragStart?: (position: { lat: number; lng: number }) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
}
export function MapMarker({
  children,
  draggable = false,
  latitude,
  longitude,
  onClick,
  onDrag,
  onDragEnd,
  onDragStart,
  onMouseEnter,
  onMouseLeave,
  ...options
}: MapMarkerProps): ReactElement | null {
  const { map } = useMapContext();
  const [marker, setMarker] = useState<maplibregl.Marker | null>(null);
  const optionsRef = useRef(options);
  const callbacks = useRef({
    onClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
  });
  callbacks.current = {
    onClick,
    onDrag,
    onDragEnd,
    onDragStart,
    onMouseEnter,
    onMouseLeave,
  };
  useEffect(() => {
    const element = document.createElement("div");
    element.className = "map__marker";
    element.dataset["slot"] = "map-marker";
    const instance = new maplibregl.Marker({
      ...optionsRef.current,
      draggable,
      element,
    }).setLngLat([longitude, latitude]);
    setMarker(instance);
    return () => {
      instance.remove();
    };
  }, []);
  useEffect(() => {
    if (!map || !marker) return;
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [map, marker]);
  useEffect(() => {
    marker?.setLngLat([longitude, latitude]);
  }, [latitude, longitude, marker]);
  useEffect(() => {
    marker?.setDraggable(draggable);
  }, [draggable, marker]);
  useEffect(() => {
    if (!marker) return;
    const element = marker.getElement();
    const position = () => {
      const value = marker.getLngLat();
      return { lat: value.lat, lng: value.lng };
    };
    const click = (event: MouseEvent) => callbacks.current.onClick?.(event);
    const enter = (event: MouseEvent) =>
      callbacks.current.onMouseEnter?.(event);
    const leave = (event: MouseEvent) =>
      callbacks.current.onMouseLeave?.(event);
    const start = () => callbacks.current.onDragStart?.(position());
    const drag = () => callbacks.current.onDrag?.(position());
    const end = () => callbacks.current.onDragEnd?.(position());
    element.addEventListener("click", click);
    element.addEventListener("mouseenter", enter);
    element.addEventListener("mouseleave", leave);
    marker.on("dragstart", start);
    marker.on("drag", drag);
    marker.on("dragend", end);
    return () => {
      element.removeEventListener("click", click);
      element.removeEventListener("mouseenter", enter);
      element.removeEventListener("mouseleave", leave);
      marker.off("dragstart", start);
      marker.off("drag", drag);
      marker.off("dragend", end);
    };
  }, [marker]);
  return marker ? (
    <MarkerContext value={{ map, marker }}>{children}</MarkerContext>
  ) : null;
}
export interface MapMarkerContentProps extends ComponentPropsWithRef<"div"> {}
export function MapMarkerContent({
  children,
  className,
  ...props
}: MapMarkerContentProps): ReactElement {
  const { marker } = useMarker();
  return createPortal(
    <div
      {...props}
      className={cn("map__marker-content", className)}
      data-slot="map-marker-content"
    >
      {children ?? <MapMarkerDot />}
    </div>,
    marker.getElement(),
  );
}
export interface MapMarkerDotProps extends ComponentPropsWithRef<"span"> {
  color?: string;
  ringColor?: string;
}
export function MapMarkerDot({
  className,
  color,
  ringColor,
  style,
  ...props
}: MapMarkerDotProps): ReactElement {
  return (
    <span
      {...props}
      className={cn("map__default-marker", className)}
      data-slot="map-default-marker"
      style={
        {
          ...style,
          "--map-marker-color": color,
          "--map-marker-ring-color": ringColor,
        } as CSSProperties
      }
    />
  );
}
export interface MapMarkerLabelProps extends ComponentPropsWithRef<"div"> {
  position?: "bottom" | "top";
}
export function MapMarkerLabel({
  children,
  className,
  position = "top",
  ...props
}: MapMarkerLabelProps): ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "map__marker-label",
        `map__marker-label--${position}`,
        className,
      )}
      data-position={position}
      data-slot="map-marker-label"
    >
      {children}
    </div>
  );
}

const PopupContent = ({
  children,
  className,
  closeButton,
  onClose,
}: {
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
  onClose: () => void;
}) => (
  <div
    className={cn("map__popup-content", className)}
    data-close-button={closeButton || undefined}
  >
    {closeButton ? (
      <CloseButton
        aria-label="Close popup"
        className="map__popup-close-button"
        onPress={onClose}
      />
    ) : null}
    {children}
  </div>
);
export interface MapMarkerPopupProps extends Omit<PopupOptions, "closeButton"> {
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
}
export function MapMarkerPopup({
  children,
  className,
  closeButton = false,
  ...options
}: MapMarkerPopupProps): ReactElement | null {
  const { map, marker } = useMarker();
  const [state, setState] = useState<{
    container: HTMLDivElement;
    popup: maplibregl.Popup;
  } | null>(null);
  const optionsRef = useRef(options);
  useEffect(() => {
    const container = document.createElement("div");
    const popup = new maplibregl.Popup({
      offset: 16,
      ...optionsRef.current,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setDOMContent(container);
    setState({ container, popup });
    return () => {
      popup.remove();
    };
  }, []);
  useEffect(() => {
    if (!map || !state) return;
    marker.setPopup(state.popup);
    return () => {
      marker.setPopup(null);
    };
  }, [map, marker, state]);
  return state
    ? createPortal(
        <PopupContent
          className={className ?? ""}
          closeButton={closeButton}
          onClose={() => {
            state.popup.remove();
          }}
        >
          {children}
        </PopupContent>,
        state.container,
      )
    : null;
}
export interface MapMarkerTooltipProps extends Omit<
  PopupOptions,
  "closeButton"
> {
  children: ReactNode;
  className?: string;
}
export function MapMarkerTooltip({
  children,
  className,
  ...options
}: MapMarkerTooltipProps): ReactElement | null {
  const { map, marker } = useMarker();
  const [state, setState] = useState<{
    container: HTMLDivElement;
    popup: maplibregl.Popup;
  } | null>(null);
  const optionsRef = useRef(options);
  useEffect(() => {
    const container = document.createElement("div");
    const popup = new maplibregl.Popup({
      offset: 16,
      ...optionsRef.current,
      closeButton: false,
      closeOnClick: true,
    })
      .setMaxWidth("none")
      .setDOMContent(container);
    setState({ container, popup });
    return () => {
      popup.remove();
    };
  }, []);
  useEffect(() => {
    if (!map || !state) return;
    const element = marker.getElement();
    const enter = () => state.popup.setLngLat(marker.getLngLat()).addTo(map);
    const leave = () => state.popup.remove();
    element.addEventListener("mouseenter", enter);
    element.addEventListener("mouseleave", leave);
    return () => {
      element.removeEventListener("mouseenter", enter);
      element.removeEventListener("mouseleave", leave);
    };
  }, [map, marker, state]);
  return state
    ? createPortal(
        <div
          className={cn("map__tooltip", className)}
          data-slot="map-marker-tooltip"
        >
          {children}
        </div>,
        state.container,
      )
    : null;
}
export interface MapPopupProps extends Omit<PopupOptions, "closeButton"> {
  children: ReactNode;
  className?: string;
  closeButton?: boolean;
  latitude: number;
  longitude: number;
  onClose?: () => void;
}
export function MapPopup({
  children,
  className,
  closeButton = false,
  latitude,
  longitude,
  onClose,
  ...options
}: MapPopupProps): ReactElement | null {
  const { map } = useMapContext();
  const [state, setState] = useState<{
    container: HTMLDivElement;
    popup: maplibregl.Popup;
  } | null>(null);
  const optionsRef = useRef(options);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const container = document.createElement("div");
    const popup = new maplibregl.Popup({
      offset: 16,
      ...optionsRef.current,
      closeButton: false,
    })
      .setMaxWidth("none")
      .setLngLat([longitude, latitude])
      .setDOMContent(container);
    setState({ container, popup });
    return () => {
      popup.remove();
    };
  }, []);
  useEffect(() => {
    if (!map || !state) return;
    const close = () => closeRef.current?.();
    state.popup.on("close", close);
    state.popup.addTo(map);
    return () => {
      state.popup.off("close", close);
      state.popup.remove();
    };
  }, [map, state]);
  useEffect(() => {
    state?.popup.setLngLat([longitude, latitude]);
  }, [latitude, longitude, state]);
  return state
    ? createPortal(
        <PopupContent
          className={className ?? ""}
          closeButton={closeButton}
          onClose={() => {
            state.popup.remove();
          }}
        >
          {children}
        </PopupContent>,
        state.container,
      )
    : null;
}

export type MapControlsPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";
export interface MapControlsProps extends ComponentPropsWithRef<"div"> {
  position?: MapControlsPosition;
}
export function MapControls({
  children,
  className,
  position = "bottom-right",
  ...props
}: MapControlsProps): ReactElement {
  return (
    <div
      {...props}
      className={cn("map__controls", `map__controls--${position}`, className)}
      data-position={position}
      data-slot="map-controls"
    >
      {children ?? <MapZoomControl />}
    </div>
  );
}
export type MapControlGroupProps = ComponentPropsWithRef<typeof ButtonGroup>;
export function MapControlGroup({
  children,
  className,
  orientation = "vertical",
  size = "sm",
  variant = "tertiary",
  ...props
}: MapControlGroupProps): ReactElement {
  return (
    <ButtonGroup
      {...props}
      className={cn("map__control-group", className) ?? ""}
      data-slot="map-control-group"
      orientation={orientation}
      size={size}
      variant={variant}
    >
      {children}
    </ButtonGroup>
  );
}
export type MapControlButtonProps = Omit<
  ComponentPropsWithRef<typeof Button>,
  "aria-label"
> & { label: string };
export function MapControlButton({
  children,
  className,
  label,
  type = "button",
  ...props
}: MapControlButtonProps): ReactElement {
  return (
    <Button
      {...props}
      isIconOnly
      aria-label={label}
      className={cn("map__control-button", className) ?? ""}
      data-slot="map-control-button"
      type={type}
    >
      {children}
    </Button>
  );
}
export type MapControlSeparatorProps = ComponentPropsWithRef<
  typeof ButtonGroup.Separator
>;
export function MapControlSeparator({
  className,
  ...props
}: MapControlSeparatorProps): ReactElement {
  return (
    <ButtonGroup.Separator
      {...props}
      className={cn("map__control-separator", className) ?? ""}
      data-slot="map-control-separator"
    />
  );
}
const ControlIcon = ({ icon }: { icon: string }) => (
  <span aria-hidden className="map__control-icon">
    {icon}
  </span>
);
export interface MapZoomControlProps extends Omit<
  MapControlGroupProps,
  "children"
> {
  duration?: number;
  step?: number;
}
export function MapZoomControl({
  duration = 300,
  step = 1,
  ...props
}: MapZoomControlProps): ReactElement {
  const { map } = useMapContext();
  return (
    <MapControlGroup {...props}>
      <MapControlButton
        isDisabled={!map}
        label="Zoom in"
        onPress={() => map?.zoomTo(map.getZoom() + step, { duration })}
      >
        <ControlIcon icon="+" />
      </MapControlButton>
      <MapControlButton
        isDisabled={!map}
        label="Zoom out"
        onPress={() => map?.zoomTo(map.getZoom() - step, { duration })}
      >
        <MapControlSeparator />
        <ControlIcon icon="−" />
      </MapControlButton>
    </MapControlGroup>
  );
}
export interface MapCompassControlProps extends Omit<
  MapControlGroupProps,
  "children"
> {
  duration?: number;
}
export function MapCompassControl({
  duration = 300,
  ...props
}: MapCompassControlProps): ReactElement {
  const { map } = useMapContext();
  return (
    <MapControlGroup {...props}>
      <MapControlButton
        isDisabled={!map}
        label="Reset bearing to north"
        onPress={() => map?.resetNorthPitch({ duration })}
      >
        <ControlIcon icon="◆" />
      </MapControlButton>
    </MapControlGroup>
  );
}
export interface MapLocateControlProps extends Omit<
  MapControlGroupProps,
  "children"
> {
  duration?: number;
  onLocate?: (coords: { latitude: number; longitude: number }) => void;
  onLocateError?: (error: GeolocationPositionError) => void;
  zoom?: number;
}
export function MapLocateControl({
  duration = 1500,
  onLocate,
  onLocateError,
  zoom = 14,
  ...props
}: MapLocateControlProps): ReactElement {
  const { map } = useMapContext();
  const [loading, setLoading] = useState(false);
  const available =
    typeof navigator !== "undefined" && "geolocation" in navigator;
  const locate = () => {
    if (!map || !available) return;
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (result) => {
        const coords = {
          latitude: result.coords.latitude,
          longitude: result.coords.longitude,
        };
        map.flyTo({
          center: [coords.longitude, coords.latitude],
          duration,
          zoom,
        });
        onLocate?.(coords);
        setLoading(false);
      },
      (error) => {
        onLocateError?.(error);
        setLoading(false);
      },
    );
  };
  return (
    <MapControlGroup {...props}>
      <MapControlButton
        isDisabled={!map || !available || loading}
        label="Find my location"
        onPress={locate}
      >
        {loading ? <Spinner size="sm" /> : <ControlIcon icon="⌾" />}
      </MapControlButton>
    </MapControlGroup>
  );
}
export interface MapFullscreenControlProps extends Omit<
  MapControlGroupProps,
  "children"
> {
  onFullscreenError?: (error: unknown) => void;
}
export function MapFullscreenControl({
  onFullscreenError,
  ...props
}: MapFullscreenControlProps): ReactElement {
  const { map } = useMapContext();
  const toggle = () => {
    const element = map?.getContainer();
    if (!element) return;
    (document.fullscreenElement
      ? document.exitFullscreen()
      : element.requestFullscreen()
    ).catch(onFullscreenError);
  };
  return (
    <MapControlGroup {...props}>
      <MapControlButton
        isDisabled={!map || !document.fullscreenEnabled}
        label="Toggle fullscreen"
        onPress={toggle}
      >
        <ControlIcon icon="⛶" />
      </MapControlButton>
    </MapControlGroup>
  );
}

export interface MapRouteProps {
  color?: string;
  coordinates: [number, number][];
  dashArray?: number[];
  id?: string;
  interactive?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  opacity?: number;
  width?: number;
}
export function MapRoute({
  color = "#4285F4",
  coordinates,
  dashArray,
  id = "route",
  interactive = true,
  onClick,
  onMouseEnter,
  onMouseLeave,
  opacity = 0.8,
  width = 3,
}: MapRouteProps): null {
  const { isLoaded, map } = useMapContext();
  const sourceId = `${id}-source`;
  const layerId = `${id}-layer`;
  useEffect(() => {
    if (!isLoaded || !map) return;
    if (!map.getSource(sourceId))
      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "Feature",
          properties: {},
          geometry: { type: "LineString", coordinates },
        },
      });
    if (!map.getLayer(layerId))
      map.addLayer({
        id: layerId,
        source: sourceId,
        type: "line",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": color,
          "line-opacity": opacity,
          "line-width": width,
          ...(dashArray ? { "line-dasharray": dashArray } : {}),
        },
      });
    return () => {
      if (map.getLayer(layerId)) map.removeLayer(layerId);
      if (map.getSource(sourceId)) map.removeSource(sourceId);
    };
  }, [
    color,
    coordinates,
    dashArray,
    isLoaded,
    layerId,
    map,
    opacity,
    sourceId,
    width,
  ]);
  useEffect(() => {
    if (!isLoaded || !map || !interactive) return;
    const click = () => onClick?.();
    const enter = () => {
      map.getCanvas().style.cursor = "pointer";
      onMouseEnter?.();
    };
    const leave = () => {
      map.getCanvas().style.cursor = "";
      onMouseLeave?.();
    };
    map.on("click", layerId, click);
    map.on("mouseenter", layerId, enter);
    map.on("mouseleave", layerId, leave);
    return () => {
      map.off("click", layerId, click);
      map.off("mouseenter", layerId, enter);
      map.off("mouseleave", layerId, leave);
    };
  }, [
    interactive,
    isLoaded,
    layerId,
    map,
    onClick,
    onMouseEnter,
    onMouseLeave,
  ]);
  return null;
}

type MapComponent = typeof MapRoot & {
  CompassControl: typeof MapCompassControl;
  ControlButton: typeof MapControlButton;
  ControlGroup: typeof MapControlGroup;
  ControlSeparator: typeof MapControlSeparator;
  Controls: typeof MapControls;
  FullscreenControl: typeof MapFullscreenControl;
  LocateControl: typeof MapLocateControl;
  Marker: typeof MapMarker;
  MarkerContent: typeof MapMarkerContent;
  MarkerDot: typeof MapMarkerDot;
  MarkerLabel: typeof MapMarkerLabel;
  MarkerPopup: typeof MapMarkerPopup;
  MarkerTooltip: typeof MapMarkerTooltip;
  Popup: typeof MapPopup;
  Root: typeof MapRoot;
  Route: typeof MapRoute;
  ZoomControl: typeof MapZoomControl;
};
export const Map: MapComponent = Object.assign(MapRoot, {
  CompassControl: MapCompassControl,
  ControlButton: MapControlButton,
  ControlGroup: MapControlGroup,
  ControlSeparator: MapControlSeparator,
  Controls: MapControls,
  FullscreenControl: MapFullscreenControl,
  LocateControl: MapLocateControl,
  Marker: MapMarker,
  MarkerContent: MapMarkerContent,
  MarkerDot: MapMarkerDot,
  MarkerLabel: MapMarkerLabel,
  MarkerPopup: MapMarkerPopup,
  MarkerTooltip: MapMarkerTooltip,
  Popup: MapPopup,
  Root: MapRoot,
  Route: MapRoute,
  ZoomControl: MapZoomControl,
});
