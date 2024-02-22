/* eslint-disable @typescript-eslint/no-explicit-any */
export type UnionToIntersection<T> = (
  T extends any ? (t: T) => any : never
) extends (t: infer U) => any
  ? U
  : never;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type WithHooks<HookName, Properties> = WithHooksImpl<
  Properties,
  HookName
>;

export type WithHooksImpl<
  Properties,
  HookName,
  HookNameSub extends HookName = HookName,
> = Properties &
  Partial<
    UnionToIntersection<
      HookNameSub extends string
        ? {
            [K in HookNameSub]: WithHooksImpl<
              Properties,
              Exclude<HookName, HookNameSub>
            >;
          }
        : never
    >
  >;

/* eslint-disable @typescript-eslint/ban-types */
declare function basic<
  CssFn,
  Rule = WithHooks<
    CssFn extends (_: { on?: infer On }) => unknown
      ? Exclude<Exclude<On, Function>[number][0], object>
      : never,
    ReturnType<CssFn>
  >,
>(css: CssFn): (rule: Rule, ...rule: (Rule | undefined)[]) => ReturnType<CssFn>;
/* eslint-enable @typescript-eslint/ban-types */
