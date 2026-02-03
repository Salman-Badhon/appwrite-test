import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  webpackFinal: async (config) => {
    if (!config.resolve) {
      return config;
    }
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../'),
    };
    return config;
  },

  stories: [
    '../components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../app/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../buildable-sections/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../examples/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  features: {
    experimentalRSC: true,
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  env: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'hws7k33l',
    NEXT_PUBLIC_SANITY_DATASET: 'production',
    NEXT_PUBLIC_SANITY_API_VERSION: '2026-02-03',
  },
};
export default config;
