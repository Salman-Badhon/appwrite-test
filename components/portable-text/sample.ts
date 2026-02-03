import { ISanityPortableText } from '@/backend/sanity/fragments/root/portable-text/interface';

// TODO: This is not currently used. We have to resolve story issues with rendering rich text story.
export const samplePortableText: ISanityPortableText = [
  {
    _key: 'fc08b2f96f32',
    _type: 'block',
    children: [
      {
        _key: '589633de81130',
        _type: 'span',
        marks: [],
        text: 'Heading 1',
      },
    ],
    markDefs: [],
    style: 'h1',
  },
  {
    _key: '37b4ab942e3c',
    _type: 'block',
    children: [
      {
        _key: '97d755eb636c',
        _type: 'span',
        marks: [],
        text: 'Heading 2',
      },
    ],
    markDefs: [],
    style: 'h2',
  },
  {
    _key: '6082cf8dcf2f',
    _type: 'block',
    children: [
      {
        _key: '39f593ee583c',
        _type: 'span',
        marks: [],
        text: 'Heading 3',
      },
    ],
    markDefs: [],
    style: 'h3',
  },
  {
    _key: '94736bec9f34',
    _type: 'block',
    children: [
      {
        _key: 'dc52d2968536',
        _type: 'span',
        marks: [],
        text: 'A headless CMS, also known as headless software or headless system, is any type of back-end content management system where the content repository, is separated or decoupled from the presentation layer (font-end). What this really means is that a headless CMS allows you to manage content in one place and still be able to deploy that content across any front-end you choose. This is key to omnichannel strategies because it lets you integrate content into any system, software, or website just by calling the APIs the headless CMS exposes.',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _key: '4654beaeecb7',
    _type: 'block',
    children: [
      {
        _key: 'b09139b1b456',
        _type: 'span',
        marks: [],
        text: '',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _key: 'effe801dbe0e',
    _type: 'block',
    children: [
      {
        _key: 'c7b31a12f7b6',
        _type: 'span',
        marks: [],
        text: 'Quote',
      },
    ],
    markDefs: [],
    style: 'blockquote',
  },
  {
    _key: '8722d288604f',
    _type: 'block',
    children: [
      {
        _key: 'e28e9f60fbec',
        _type: 'span',
        marks: [],
        text: '',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _key: '555d4526d502',
    _type: 'portableTextImage',
    alt: 'NextJS X Sanity',
    file: {
      asset: {
        url: 'https://cdn.sanity.io/images/fjujb4d7/production/a49a3a8c6bdfe19f0017fe6e4f4f876c5a729595-2560x1080.jpg',
        metadata: {
          lqip: 'data:image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAUHBv/EACEQAAIBBAICAwAAAAAAAAAAAAECAwAEBRMRIQcxEiJR/8QAFQEBAQAAAAAAAAAAAAAAAAAABQT/xAAdEQACAgEFAAAAAAAAAAAAAAABAgADEQUGMVGx/9oADAMBAAIRAxEAPwCT3OMl0iQyw/Ejkffutj4/xm/GamfW0pZuffqp1ck/tUK2d7TDWuh2QiMdg8Gp9SbCKvZj+2qibbLByF9ifJtpvpoye0YrRS+5dmnYsSST7oo8KI61hzP/2Q==',
          dimensions: {
            width: 800,
            aspectRatio: 1.6,
            height: 500,
          },
        },
      },
    },
    markDefs: undefined,
  },
  {
    _key: '2178f7d8ba74',
    _type: 'block',
    children: [
      {
        _key: '11b05a515a09',
        _type: 'span',
        marks: [],
        text: '',
      },
    ],
    markDefs: [],
    style: 'normal',
  },
  {
    _key: '8eb0fc475b12',
    _type: 'portableTextVideo',
    alt: 'World Spinning',
    type: 'file',
    url: 'https://cdn.sanity.io/files/k9rf0rwu/development/ae3cd285ed4ef92a004653c6919b8437743dcde4.mp4',
    markDefs: undefined,
  },
];
