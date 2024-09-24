import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'typeError',
    label: 'Tipo de error'
  },
  {
    value: 'resolutionTimeFormatted',
    label: 'Tiempo de resolucion'
  },
  {
    value: 'solutionType',
    label: 'Tipo solucion'
  },
  {
    value: 'closedAt',
    label: 'Cerrado el'
  }
];

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: CircleIcon
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: StopwatchIcon
  },
  {
    value: 'done',
    label: 'Done',
    icon: CheckCircledIcon
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: CrossCircledIcon
  }
];

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon
  }
];
