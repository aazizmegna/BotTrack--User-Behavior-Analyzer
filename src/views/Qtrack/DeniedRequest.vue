<template>
  <div>
    <DeniedRequestWidget />
    <v-row>
      <v-col>
        <ActivityDeniedRequest />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ActivityDeniedRequest from "./ActivityDeniedRequest.vue";
import DeniedRequestWidget from "../../components/widget/DeniedRequestWidget.vue";
export default {
  components: {
    ActivityDeniedRequest,
    DeniedRequestWidget,
  },
};
</script>
