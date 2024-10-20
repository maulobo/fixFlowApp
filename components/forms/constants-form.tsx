export const formFields = [
  {
    name: 'orderNumber',
    formLabel: 'Numero de Orden',
    placeholder: 'Order Number',
    type: 'input',
    required: true
  },
  {
    name: 'product',
    formLabel: 'Producto',
    placeholder: 'Search product',
    type: 'search',
    options: [],
    required: true
  },
  {
    name: 'variant',
    formLabel: 'Variante',
    type: 'variantSelect',
    options: [],
    required: true
  },
  {
    name: 'status',
    formLabel: 'status',
    type: 'select',
    options: ['Hablado', 'No Hablado', 'Empaquetado'],
    required: true
  },
  {
    name: 'solutionType',
    formLabel: 'Tipo de Solución',
    type: 'selectSolution',
    options: [
      'Reenvio',
      'Cupon',
      'Devolucion',
      'Regalo',
      'Cambio de producto',
      'Logistica inversa'
    ],
    required: false
  }
];

export const solutionTypes = [
  'Reenvio',
  'Cupon',
  'Devolucion',
  'Regalo',
  'Cambio de producto',
  'Logistica inversa'
];
export const statuses = ['Hablado', 'No Hablado', 'Empaquetado'];
const claimReasons = [
  'Error empaquetado',
  'Cambio despacho',
  'Devolucion',
  'Error Logistica',
  'Otro',
  'Sin Stock',
  'Garantia',
  'Retorno',
  'Cambio previo al envio'
];
