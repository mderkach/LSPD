<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="red darken-3"
          title="В розыске"
          text="Опасные преступники и пропавшие"
          flat
          full-width
        >
          <v-data-table
            :headers="mostWanted.headers"
            :items="mostWanted.items"
            hide-default-footer
          />
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <material-card
          color="brown darken-1"
          title="Штрафы"
          text="Неоплаченные штрафы"
          flat
          full-width
        >
          <v-data-table
            :headers="fee.headers"
            :items="fee.items"
            hide-default-footer
          />
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        mostWanted: {
          headers: [
            {
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              sortable: false,
              text: 'Номер телефона',
              value: 'phone',
            },
          ],
          items: [
            {
              id: 5,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
            },
            {
              id: 2,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
            },
          ],
        },
        fee: {
          headers: [
            {
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              sortable: false,
              text: 'Номер телефона',
              value: 'phone',
            },
            {
              sortable: false,
              text: 'Неоплаченных штрафов',
              value: 'unpayed',
            },
            {
              sortable: false,
              text: 'Общая сумма',
              value: 'total',
            },
          ],
          items: [
            {
              id: 1,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
              unpayed: '2',
              total: '10 000',
            },
            {
              id: 2,
              name: 'Dakota Rice',
              age: '34',
              phone: '99-999',
              unpayed: '4',
              total: '500',
            },
          ],
        },
      }
    },
    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
