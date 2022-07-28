import { createApp, h } from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'
import '../scss/styles.scss'
import * as boostrap from 'bootstrap'

const app = createApp({
  render: () => h(App),
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  cache,
  uri: 'http://192.168.65.2:8080',
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

app.use(router)
app.use(apolloProvider)

app.mount('#app')
