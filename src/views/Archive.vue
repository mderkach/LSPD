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
                max-width="40vw"
              >
                <v-card class="case">
                  <v-card-title>
                    <v-row>
                      <v-col
                        cols="6"
                      >
                        <span class="headline">Просмотр дела</span>
                      </v-col>
                      <v-col
                        cols="6"
                        class="text-right"
                      >
                        <v-btn
                          text
                          icon
                          @click="close"
                        >
                          <v-icon
                            small
                          >
                            mdi-close
                          </v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-row>
                            <v-col cols="6">
                              <img
                                class="department-logo"
                                :src="seal"
                                alt=""
                              >
                            </v-col>
                            <v-col
                              cols="6"
                            >
                              {{ item.department }}, Criminal Case Record
                              <v-row class="my-4">
                                <v-col
                                  cols="12"
                                  style="background-color: #000; color: #fff; text-align: center"
                                >
                                  OFICER INFORMATION
                                </v-col>
                                <v-col cols="6">
                                  Имя:
                                </v-col>
                                <v-col cols="6">
                                  Фамилия:
                                </v-col>
                                <v-col cols="6">
                                  Должность и звание:
                                </v-col>
                                <v-col cols="6">
                                  Дата внесения в архив: <br>
                                  {{ item.date }}
                                </v-col>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              cols="12"
                              style="background-color: #000; color: #fff; text-align: center"
                            >
                              CASE DETAILS
                            </v-col>
                            <v-col cols="6">
                              Имя: <br>
                              {{ item.name }}
                            </v-col>
                            <v-col cols="6">
                              Фамилия:<br>
                              {{ item.surname }}
                            </v-col>
                            <v-col cols="6">
                              Возраст: <br>
                              {{ item.age }}
                            </v-col>
                            <v-col cols="6">
                              Обвинение: <br>
                              {{ item.violation }}
                            </v-col>
                            <v-col cols="6">
                              Срок заключения: <br>
                              {{ item.term }}
                            </v-col>
                            <v-col cols="6">
                              Материальное взыскание: <br>
                              {{ item.fine_amount }}
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col cols="12">
                          <v-row>
                            <v-col
                              cols="12"
                              style="background-color: #000; color: #fff; text-align: center"
                            >
                              CASE DESCRIPTION
                            </v-col>
                            <v-col cols="12">
                              {{ item.descr }}
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
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
                    icon
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
  import { mdiFileSearchOutline, mdiClose } from '@mdi/js'

  export default {
    data () {
      return {
        archive: {
          headers: [
            {
              align: 'center',
              sortable: false,
              text: 'ID',
              value: 'id',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Имя',
              value: 'name',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Фамилия',
              value: 'surname',
            },
            {
              align: 'center',
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
              align: 'center',
              sortable: false,
              text: 'Дата',
              value: 'date',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Ведомство',
              value: 'department',
            },
            {
              align: 'center',
              sortable: false,
              text: 'Действия',
              value: 'action',
            },
          ],
          items: [],
        },
        dialog: false,
        item: {
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
        defaultCase: {
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
        seal: require('../assets/seal.png'),
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
        this.item = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultCase)
        }, 300)
      },
    },

  }
</script>

<style lang="scss">
.department {
  &-logo {
    width: 200px;
    height: 200px;
  }
}

.v-dialog {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
