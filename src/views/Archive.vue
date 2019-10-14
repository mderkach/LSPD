<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
      >
        <material-card
          color="red darken-3"
          title="Архив"
          text="Список дел"
          flat
          full-width
        >
          <v-data-table
            :headers="archive.headers"
            :items="archive.items"
            :items-per-page="5"
          >
            <template v-slot:top>
              <v-dialog
                v-model="dialog"
                max-width="80vw"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">Просмотр дела</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row />
                    </v-container>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="accent"
                    v-on="on"
                    @click="showCase(item)"
                  >
                    <v-icon
                      small
                    >
                      mdi-file-search-outline
                    </v-icon>
                  </v-btn>
                </template>
                <span>Просмотр дела</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import axios from 'axios'
  // eslint-disable-next-line
  import { mdiFileSearchOutline } from '@mdi/js'

  export default {
    data () {
      return {
        archive: {
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
              text: 'Фамилия',
              value: 'surname',
            },
            {
              sortable: false,
              text: 'Возраст',
              value: 'age',
            },
            {
              sortable: false,
              text: 'Нарушение',
              value: 'violation',
            },
            {
              sortable: false,
              text: 'Дата',
              value: 'date',
            },
            {
              sortable: false,
              text: 'Ведомство',
              value: 'department',
            },
            {
              sortable: false,
              text: 'Действия',
              value: 'action',
            },
          ],
          items: [],
        },
        dialog: false,
        case: {
          name: '',
          surname: '',
          age: 0,
          department: '',
          date: '',
          fine_amount: 0,
          violation: '',
          descr: '',
          term: 0,
        },
      }
    },
    mounted () {
      this.insertRecords()
    },
    methods: {
      getRecords () {
        return axios.get('http://194.87.144.130:3000/api/lspd_criminalrecord?_size=100')
      },
      insertRecords () {
        let self = this
        axios.all([self.getRecords()])
          .then(axios.spread(function (recordsList) {
            let records = recordsList.data
            records.forEach(item => {
              self.archive.items.push(item)
            })
          }
          )
          )
      },
      showCase (item) {
        this.case = Object.assign({}, item)
        console.log(this.case)
      },
    },

  }
</script>
