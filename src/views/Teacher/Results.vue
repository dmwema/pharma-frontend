<!-- 
	This is the Billing page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
  <div>
    <h5>Résultat de la délibération</h5>

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
              v-model="query"
              @change="onSearchChange"
            />
          </a-col>
        </a-row>
      </div>
      <!-- / Table search -->

      <!-- Test table -->
      <a-table
        class="mt-20"
        :columns="columns"
        :data-source="data"
        :pagination="{ pageSize: pageSize }"
      >
        <template slot="id" slot-scope="id">#{{ id }}</template>

        <template slot="coupon" slot-scope="id">
          <a-button
            @click="showEditModal(id)"
            icon="file"
            type="primary"
            class="btn-status border-primary mr-5"
          >
          </a-button>
        </template>
      </a-table>
      <!-- / Orders table -->
    </a-card>
    <!-- / Test List card -->
  </div>
</template>

<script>
import Vuex from "vuex";

// Table columns
const columns = [
  {
    title: "ID",
    dataIndex: "key",
    sorter: (a, b) => a.key - b.key,
    sortDirections: ["descend", "ascend"],
    scopedSlots: { customRender: "key" },
  },
  {
    title: "Nom comptet",
    dataIndex: "fullname",
    sorter: (a, b) => a.fullname.length - b.fullname.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Légers",
    dataIndex: "legers",
    sorter: (a, b) => a.annual.length - b.annual.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Graves",
    dataIndex: "graves",
    sorter: (a, b) => a.exam.length - b.exam.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Vides",
    dataIndex: "nulls",
    sorter: (a, b) => a.moy.length - b.moy.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "%",
    dataIndex: "pourc",
    sorter: (a, b) => a.pourc.length - b.pourc.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: "Dec.",
    dataIndex: "dec",
    sorter: (a, b) => a.dec.length - b.dec.length,
    sortDirections: ["descend", "ascend"],
  },
  {
    title: '',
    dataIndex: 'id',
    scopedSlots: { customRender: 'coupon' },
  },
];

// Table rows
const data = [];
export default {
  data() {
    return {
      // Table columns
      columns,

      // First table's number of rows per page.
      pageSize: 10,

      // Second table's number of rows per page.
      pageSize2: 10,

      // Second table's search query.
      query: "",

      //modal visibility
      visible: false,

      //modal visibility
      visible2: false,

      formLayout: "horizontal",

      form: this.$form.createForm(this, { name: "coordinated" }),

      form_edit: this.$form.createForm(this, { name: "editform" }),

      // Table's selected rows
      selectedRowKeys: [],
    };
  },

  methods: {
    // Event listener for input change on table search field.
    onSearchChange() {
      if (this.query.length > 0) {
        this.data = data.filter((row) => {
          for (const key in row) {
            if (
              row[key]
                .toString()
                .toLowerCase()
                .includes(this.query.trim().toLowerCase())
            )
              return true;
          }
          return false;
        });
      } else {
        this.data = data;
      }
    },
  },

  computed: {
    ...Vuex.mapGetters({
      data: "results",
      selectedStudent: "selectedStudent",
    }),
  },

  mounted() {
    this.$store.dispatch("getStudents");
    this.$store.dispatch("getResult", this.$route.params.deliberation_id);
  },
};
</script>

<style lang="scss"></style>
