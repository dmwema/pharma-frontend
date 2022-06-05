<!-- 
	This is the Billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <h5 v-if="is_member">{{ role }}</h5>

    <a-row type="flex" :gutter="24">
      <!-- Billing Information Column -->
      <a-col :span="24" :md="16" class="mb-24">
        <!-- Billing Information Card -->
        <CardBillingInfo></CardBillingInfo>
        <!-- / Billing Information Card -->
      </a-col>
      <!-- Billing Information Column -->
      <!-- Invoices Column -->
      <a-col :span="24" :md="8" class="mb-24">
        <!-- Invoices Card -->
        <CardInvoices :data="juries.members"></CardInvoices>
        <!-- / Invoices Card -->
      </a-col>
      <!-- / Invoices Column -->
    </a-row>

    <a-tabs default-active-key="1">
      <a-tab-pane v-for="deliberation in deliberations" :key="deliberation.id" :tab="deliberation.title">
        
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Vuex from "vuex";

import CardCredit from "../../components/Cards/CardCredit";
import WidgetSalary from "../../components/Widgets/WidgetSalary";
import CardPaymentMethods from "../../components/Cards/CardPaymentMethods";
import CardInvoices from "../../components/Cards/CardInvoices";
import CardBillingInfo from "../../components/Cards/CardBillingInfo";
import CardTransactions from "../../components/Cards/CardTransactions";


const columns = [
  {
    title: 'ID',
    dataIndex: 'key',
    sorter: (a, b) => a.id - b.id,
    sortDirections: ['descend', 'ascend'],
    scopedSlots: { customRender: 'id' },
  },
  {
    title: 'COURS',
    dataIndex: 'course',
    sorter: (a, b) => a.date_work - b.date_work,
    sortDirections: ['descend', 'ascend'],
    scopedSlots: { customRender: 'date_work' },
  },
  {
    title: 'DÉJÀ DEPOSÉ',
    dataIndex: 'has_sent',
    sorter: (a, b) => a.title.length - b.title.length,
    sortDirections: ['descend', 'ascend'],
    scopedSlots: { customRender: 'title' },
  },
  {
    title: 'DATE DU DEPOT',
    dataIndex: 'date',
    sorter: (a, b) => a.description.length - b.description.length,
    sortDirections: ['descend', 'ascend'],
    scopedSlots: { customRender: 'description' },
  },
  {
    title: '',
    dataIndex: 'id',
    scopedSlots: { customRender: 'actions' },
  },
];

// "Invoices" list data.
const invoiceData = [];

// "Your Transactions" list data.
const transactionsData = [
  {
    period: "NEWEST",
  },
  {
    title: "Netflix",
    datetime: "27 March 2021, at 12:30 PM",
    amount: "2,500",
    type: -1, // 0 is for pending, 1 is for deposit, -1 is for withdrawal.
    status: "danger",
  },
  {
    title: "Apple",
    datetime: "27 March 2021, at 04:30 AM",
    amount: "2,000",
    type: 1,
    status: "success",
  },
  {
    period: "YESTERDAY",
  },
  {
    title: "Stripe",
    datetime: "26 March 2021, at 12:30 AM",
    amount: "750",
    type: 1,
    status: "success",
  },
  {
    title: "HubSpot",
    datetime: "26 March 2021, at 11:30 AM",
    amount: "1,050",
    type: 1,
    status: "success",
  },
  {
    title: "Creative Tim",
    datetime: "26 March 2021, at 07:30 AM",
    amount: "2,400",
    type: 1,
    status: "success",
  },
  {
    title: "Webflow",
    datetime: "26 March 2021, at 04:00 AM",
    amount: "Pending",
    type: 0,
    status: "warning",
  },
  {
    title: "Apple",
    datetime: "27 March 2021, at 04:30 AM",
    amount: "2,000",
    type: 1,
    status: "success",
  },
  {
    title: "Stripe",
    datetime: "26 March 2021, at 12:30 AM",
    amount: "750",
    type: 1,
    status: "success",
  },
];

export default {
  components: {
    CardCredit,
    WidgetSalary,
    CardPaymentMethods,
    CardInvoices,
    CardBillingInfo,
    CardTransactions,
  },
  data() {
    return {

      is_member: false,

      role: 0,

      // Associating "Invoices" list data with its corresponding property.
      invoiceData,

      // Associating "Your Transactions" list data with its corresponding property.
      transactionsData,
    };
  },

  watch: {
    juries(jury) {
      if (jury !== undefined) {
        jury.members.forEach((member) => {
          if (member.id === this.user.professor.id) {
            this.is_member = true;
            this.role = member.role + " du jury";
          }
        });
      }
    },
  },

  computed: {
    ...Vuex.mapGetters({
      user: "auth/user",
      postToJury: "postToJury",
      juries: "jury",
			deliberations: "deliberations",
    }),
  },

  mounted() {
    this.$store.dispatch("getJury");
    this.$store.dispatch("getDeliberationCotes", {});
		this.$store.dispatch("getDeliberations", this.$route.params.promotion_id);
  },
};
</script>

<style lang="scss"></style>
