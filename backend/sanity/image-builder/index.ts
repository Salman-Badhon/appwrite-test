import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/backend/sanity/client';
import { IGenerateImageUrlArgs, ISanityImageBuilderResult } from './interface';
import { round } from 'lodash';

/**
 * This function will return a ISanityImageBuilderResult object.
 *
 * If ONLY height OR width is provided this function will generate a best fit image with
 * respect to the provided property. The generated image will maintain editor crop settings
 * but NOT hotspot settings.
 *
 * If BOTH height and width is provided then this function will generate an image of the specified height
 * and widht and it will maintain editor hotspot and crop settings.
 *
 * If NEITHER height and widht is provided this function will return an unmodified image from sanity. This
 * will respect editors specified hotspot and crop.
 *
 * @param source
 * @param height?
 * @param width?
 * @returns ISanityImageBuilderResult
 */
export function generateImageUrl({
  source,
  height,
  width,
}: IGenerateImageUrlArgs): ISanityImageBuilderResult | undefined {
  if (!source || !source.file) {
    return undefined;
  }

  const builder = imageUrlBuilder(client);

  let urlBuilder = builder.image(source.file).auto('format');

  let imageAspectRatio = round(
    source.file.asset.metadata.dimensions.aspectRatio,
    2
  );

  let imageHeight = height
    ? height
    : round(source.file.asset.metadata.dimensions.height);

  let imageWidth = width
    ? width
    : round(source.file.asset.metadata.dimensions.width);

  if (height && width) {
    imageAspectRatio = round(width / height, 2);
    urlBuilder = urlBuilder.width(width).height(height);
  }

  if (height && !width) {
    imageWidth = round(height * imageAspectRatio);
    urlBuilder = urlBuilder.height(height).fit('min');
  }

  if (width && !height) {
    imageHeight = round(width / imageAspectRatio);
    urlBuilder = urlBuilder.width(width).fit('min');
  }

  return {
    src: urlBuilder.url(),
    lqip: source.file.asset.metadata.lqip,
    height: imageHeight,
    width: imageWidth,
    aspectRatio: imageAspectRatio,
    alt: source.alt,
  };
}
