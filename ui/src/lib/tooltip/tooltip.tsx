import styles from './tooltip.module.css';

import {
  autoPlacement,
  autoUpdate,
  offset,
  Placement,
  safePolygon,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react-dom-interactions';
import classNames from 'classnames';
import {
  cloneElement,
  FunctionComponentElement,
  useMemo,
  useState,
} from 'react';
import { mergeRefs } from 'react-merge-refs';

export enum TooltipTheme {
  Light,
  Dark,
}

interface TooltipProps {
  content: string | JSX.Element;
  placement?: Placement;
  children: FunctionComponentElement<JSX.Element>;
  delay?:
    | number
    | Partial<{
        open: number;
        close: number;
      }>;
  interactive?: boolean;
  theme?: TooltipTheme;
}

export function Tooltip({
  children,
  content,
  placement,
  delay,
  interactive = false,
  theme = TooltipTheme.Light,
}: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    ...(placement && { placement }),
    open,
    onOpenChange: setOpen,
    middleware: [offset(2), ...(!placement ? [autoPlacement()] : [])],
    whileElementsMounted: autoUpdate,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      delay: delay ?? {
        open: 0,
        close: 100,
      },
      ...(interactive && { handleClose: safePolygon() }),
    }),
    useFocus(context),
    useRole(context, { role: 'tooltip' }),
    useDismiss(context),
  ]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => (children.ref ? mergeRefs([reference, children.ref]) : reference),
    [reference, children]
  );

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <div
          ref={floating}
          className={classNames(
            'pointer-events-none rounded-md px-2 py-1 text-sm shadow',
            {
              'bg-white text-gray-700': theme === TooltipTheme.Light,
              'bg-gray-700 text-white': theme === TooltipTheme.Dark,
            },
            styles['container']
          )}
          style={{
            position: strategy,
            top: y ?? 0,
            left: x ?? 0,
            zIndex: 10,
          }}
          {...getFloatingProps()}
        >
          {content}
        </div>
      )}
    </>
  );
}

export default Tooltip;
