<template>
  <div>
    <PendingRequestWidget />
    <v-row>
      <v-col>
        <ActivitiesPendingRequest />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ActivitiesPendingRequest from "./ActivityPendingRequest.vue";
import PendingRequestWidget from "../../components/widget/PendingRequestWidget.vue";
export default {
  components: {
    ActivitiesPendingRequest,
    PendingRequestWidget,
  },
};
</script>
