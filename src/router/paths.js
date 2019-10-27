/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    path: '',
    // Relative to /src/views
    view: 'Dashboard',
    name: 'Сводка',
  },
  {
    path: '/searchuser',
    name: 'Поиск личности',
    view: 'SearchUser',
    props: true,
  },
  {
    path: '/newrecord',
    name: 'Новая запись',
    view: 'NewRecord',
  },
  {
    path: '/archive',
    name: 'Архив',
    view: 'Archive',
  },
]
