export const errorTypeButtons = [
  {
    name: 'devolucion',
    description: 'Gradient button with perfect corners',
    href: 'devolucion',
    component: (
      <button className="relative p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative  rounded-[6px] bg-black  px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          Devolucion
        </div>
      </button>
    )
  },
  {
    name: 'Falta de stock',
    description: 'Gradient button with perfect corners',
    href: 'stock',
    component: (
      <button className="relative p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative  rounded-[6px] bg-black  px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          Stock
        </div>
      </button>
    )
  },
  {
    name: 'Garantia',
    description: 'Gradient button with perfect corners',
    href: 'garantia',
    component: (
      <button className="relative p-[3px]">
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
        <div className="group relative  rounded-[6px] bg-black  px-8 py-2 text-white transition duration-200 hover:bg-transparent">
          Garantia
        </div>
      </button>
    )
  }
];
