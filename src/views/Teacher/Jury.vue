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
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="Etat de cotes">
            <!-- Test List card -->
            <a-card
              :bordered="true"
              class="header-solid mb-24"
              :bodyStyle="{ padding: 0, paddingTop: '16px' }"
            >
              <a-table class="mt-20"
                :columns="columns"
                :data-source="cotes_state[deliberation.id]"
                :pagination="{pageSize: pageSize,}"
              >

                <template slot="date" slot-scope="date">{{ moment(date).format("D MMM YYYY") }}</template>

                <template slot="actions" slot-scope="id" v-if="false">
                  <a-button icon="delete" type="danger" class="btn-status border-danger mr-5">
                    Rejeter.
                  </a-button>	
                  <a-button icon="edit" type="primary" class="btn-status border-primary mr-5">
                    Valider.
                  </a-button>		
                </template>	

              </a-table>
            </a-card>
            <!-- / Test List card -->
          </a-tab-pane>

          <a-tab-pane key="2" tab="Critères de délibération">
          </a-tab-pane>

          <a-tab-pane key="3" tab="Discussions">
          </a-tab-pane>
        </a-tabs>
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

      // First table's number of rows per page.
      pageSize: 10,

      columns: columns,

      cotes_state: {
        8: [
          {
            'course': 'aze',
          }
        ]
      },

      is_member: false,

      role: 0,
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
    this.$store.dispatch('getSessions', this.$route.params.promo_id)
  },

  watch: {
    deliberations(value) {
      value.forEach(element => {
        this.cotes_state[element.id] = element.cotes   
      });
      console.log(this.cotes_state)
    }
  }
};
</script>

<style lang="scss"></style>
