<template>
    <v-card height="150" dark>
    <v-footer v-bind="localAttrs" padless dark class="text-center">
      <v-card flat tile width="100%">
        <v-card-text>
          <v-btn class="mx-4" icon>
            <v-icon size="24px">mdi-github</v-icon>
          </v-btn>
          <v-btn class="mx-4" icon>
            <v-icon size="24px">mdi-magnify</v-icon>
          </v-btn>          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          @{{ new Date().getFullYear() }} — <strong>Made with love in Brazil</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>