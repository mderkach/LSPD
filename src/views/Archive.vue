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
                          @click="close('case')"
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
                                  OFFICER INFORMATION
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
                              Имя и фамилия: <br>
                              {{ item.name }} {{ item.surname }}
                            </v-col>
                            <v-col cols="6">
                              Пол:<br>
                              {{ item.sex }}
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
              <v-dialog
                v-model="submit_delete"
                max-width="40vw"
              >
                <v-card>
                  <v-card-title class="headline">
                    Вы уверены, что хотите удалить данную запись?
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          Подтвердите удаление дела:
                        </v-col>
                        <v-col cols="4">
                          Имя и фамилия: <br>
                          {{ item.name }} {{ item.surname }}
                        </v-col>
                        <v-col cols="4">
                          Обвинение: <br>
                          {{ item.violation }}
                        </v-col>
                        <v-col cols="4">
                          Дата внесения в архив: <br>
                          {{ item.date }}
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />
                    <v-btn
                      color="green darken-1"
                      text
                      @click="close('submit_delete')"
                    >
                      Отмена
                    </v-btn>

                    <v-btn
                      color="red"
                      text
                      @click="deleteCase(item)"
                    >
                      Удалить
                    </v-btn>
                    <v-spacer />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:item.action="{ item }">
              <v-container>
                <v-row
                  class="flex-nowrap"
                  justify="center"
                >
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="light-blue darken-4"
                        icon
                        small
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
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="orange darken-2"
                        icon
                        small
                        v-on="on"
                        @click="editCase(item)"
                      >
                        <v-icon
                          small
                        >
                          mdi-file-edit-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Редактировать</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        color="red darken-2"
                        icon
                        small
                        v-on="on"
                        @click="submitDelete(item)"
                      >
                        <v-icon
                          small
                        >
                          mdi-delete-empty-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Удалить</span>
                  </v-tooltip>
                </v-row>
              </v-container>
            </template>
          </v-data-table>
        </material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { archive } from '@/mixins/archive'
  import { criminalRecord } from '@/mixins/criminalRecord'
  import { snack } from '@/mixins/snack'
  // eslint-disable-next-line
  import { mdiFileSearchOutline, mdiFileEditOutline, mdiDeleteEmptyOutline, mdiClose } from '@mdi/js'

  export default {
    mixins: [archive, criminalRecord, snack],
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
              text: 'Пол',
              value: 'sex',
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
        seal: require('../assets/seal.png'),
      }
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
