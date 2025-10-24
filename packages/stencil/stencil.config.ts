import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'stencil-test',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    reactOutputTarget({
      stencilPackageName: '@stencil-test/stencil',
      // outDir: '../../packages/react/lib/components/stencil-generated/index/ts',
      outDir: '../../packages/react/lib/components',
      // customElementsDir: 'dist/components',
    }),
    vueOutputTarget({
      componentCorePackage: '@stencil-test/stencil',
      proxiesFile: '../../packages/vue/lib/components.ts',
      includeDefineCustomElements: true,
      customElementsDir: 'dist/components',
    }),
  ],
  testing: {
    browserHeadless: 'shell',
  },
};
