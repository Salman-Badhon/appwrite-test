/**
 * In the backend images can have the alt field as optional or required.
 * When we are creating types for our backend schemas we have to mimic it accurately,
 * so we use generics to set our image alt field as required or optional.
 *
 * This should only receive the generics `string` or `string | undefined`
 */
export interface ISanityImage {
  file?: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          height: number;
          width: number;
          aspectRatio: number;
        };
        lqip: string;
      };
    };
    crop?: ISanityCrop | null;
    hotspot?: ISanityHotspot | null;
  };
  alt?: string;
}

interface ISanityCrop {
  bottom: number;
  left: number;
  right: number;
  top: number;
  _type: string;
}

interface ISanityHotspot {
  height: number;
  width: number;
  x: number;
  y: number;
  _type: string;
}
