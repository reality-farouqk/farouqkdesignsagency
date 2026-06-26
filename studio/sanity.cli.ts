import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '48lk1atq',
    dataset: 'production'
  },
  deployment: {
    appId: 'p9abobyrn4fvo21qey8jr5zo',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
