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
      <a-tab-pane tab="Etat des Cotes" key="1">
        <!-- Test List card -->
        <a-card
          :bordered="true"
          class="header-solid mb-24"
          :bodyStyle="{ padding: 0, paddingTop: '16px' }"
        >
          <!-- Table search -->
          <div class="mx-25">
            <a-row type="flex" :gutter="24">
              <a-col :span="24" class="text-right">
                <a-input-search
                  placeholder="Rechercher"
                  style="max-width: 200px"
                />
              </a-col>
            </a-row>
          </div>
          <!-- / Table search -->
        </a-card>
        <!-- / Test List card -->
      </a-tab-pane>
      <a-tab-pane tab="Critères de délibération" key="2">
        <!-- Test List card -->
        <a-card
          :bordered="true"
          class="header-solid mb-24"
          :bodyStyle="{ padding: 0, paddingTop: '16px' }"
        >
          <!-- Table search -->
          <div class="mx-25">
            <a-row type="flex" :gutter="24">
              <a-col :span="24" class="text-right">
                <a-input-search
                  placeholder="Rechercher"
                  style="max-width: 200px"
                />
              </a-col>
            </a-row>
          </div>
          <!-- / Table search -->
        </a-card>
        <!-- / Test List card -->
      </a-tab-pane>
      <a-tab-pane tab="Discussions" key="3">
        <!-- Test List card -->
        <a-card
          :bordered="true"
          class="header-solid mb-24"
          :bodyStyle="{ padding: 0, paddingTop: '16px' }"
        >
          <!-- Table search -->
          <div class="mx-25">
            <a-row type="flex" :gutter="24">
              <a-col :span="24" class="text-right">
                <a-input-search
                  placeholder="Rechercher"
                  style="max-width: 200px"
                />
              </a-col>
            </a-row>
          </div>
          <!-- / Table search -->
        </a-card>
        <!-- / Test List card -->
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

// Salary cards data
const salaries = [
  {
    value: 2000,
    prefix: "+$",
    icon: `
										<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22">
											<g id="bank" transform="translate(0.75 0.75)">
												<path id="Shape" transform="translate(0.707 9.543)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
												<path id="Path" d="M10.25,0,20.5,9.19H0Z" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
												<path id="Path-2" data-name="Path" d="M0,.707H20.5" transform="translate(0 19.793)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="1.5"/>
											</g>
										</svg>`,
    title: "Salary",
    content: "Belong Interactive",
  },
  {
    value: 49000,
    prefix: "+$",
    icon: `
										<img src="images/logos/paypal-logo-2.png" alt="">`,
    title: "Paypal",
    content: "Freelance Payment",
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
      // Salary cards data
      salaries,

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
    }),
  },

  mounted() {
    this.$store.dispatch("getJury");
  },
};
</script>

<style lang="scss"></style>
