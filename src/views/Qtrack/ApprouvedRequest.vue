<template>
  <div>
    <ApprouvedRequestWidget />
    <v-row>
      <v-col>
        <ActivityApprouvedRequest />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ActivityApprouvedRequest from "./ActivityApprouvedRequest.vue";
import ApprouvedRequestWidget from "../../components/widget/ApprouvedRequestWidget.vue";
export default {
  components: {
    ActivityApprouvedRequest,
    ApprouvedRequestWidget,
  },
};
</script>
