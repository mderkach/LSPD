<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row justify="center">
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск по имени"
          flat
          full-width
        >
          <v-row>
            <v-col
              cols="6"
            >
              <v-text-field
                label="Имя"
              />
            </v-col>
            <v-col
              cols="6"
            >
              <v-text-field
                label="Фамилия"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn color="secondary">
                Найти
              </v-btn>
            </v-col>
          </v-row>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск по номеру телефона"
          flat
          full-width
        >
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Номер телефона"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn color="secondary">
                Найти
              </v-btn>
            </v-col>
          </v-row>
        </material-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <material-card
          color="blue lighten-1"
          title="Поиск ТС"
          flat
          full-width
        >
          <v-row>
            <v-col
              cols="12"
            >
              <v-text-field
                label="Номер ТС"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
            >
              <v-btn color="secondary">
                Найти
              </v-btn>
            </v-col>
          </v-row>
        </material-card>
      </v-col>
      <v-col>
        <material-card
          color="green lighten-1"
          title="Результаты поиска"
          flat
          full-width
        >
          <v-data-table
            :headers="result.headers"
            :items="result.items"
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
        result: {
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
              text: 'Номер телефона',
              value: 'phone',
            },
            {
              sortable: false,
              text: 'Номер ТС',
              value: 'vehicle',
            },
            {
              sortable: false,
              text: 'Собственность',
              value: 'property',
            },
            {
              sortable: false,
              text: 'Профессия',
              value: 'profession',
            },
            {
              sortable: false,
              text: 'Статус',
              value: 'status',
            },
          ],
          items: [
            {
              id: 1,
              name: 'Ugly',
              surname: 'Mazafaker',
              age: 45,
              phone: 9379992,
              vehicle: 'BAGUVIX',
              property: 'ASD QWE',
              profession: 'Unemployed',
              status: 'Не в розыске',
            },
          ],
        },
      }
    },
  }
</script>
