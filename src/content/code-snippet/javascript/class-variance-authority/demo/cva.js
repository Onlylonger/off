import { clsx } from "./classnames";

export const cx = clsx;

export const cva = (base, config) => (props) => {
  if (config?.variants == null) return cx(base, props?.class, props?.className);

  const { variants, defaultVariants } = config;

  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props?.[variant];
    const defaultVariantProp = defaultVariants?.[variant];

    if (variantProp === null) return null;

    const variantKey =
      falsyToString(variantProp) || falsyToString(defaultVariantProp);

    return variants[variant][variantKey];
  });

  const propsWithoutUndefined =
    props &&
    Object.entries(props).reduce((acc, [key, value]) => {
      if (value === undefined) {
        return acc;
      }

      acc[key] = value;
      return acc;
    }, {});

  const getCompoundVariantClassNames = config?.compoundVariants?.reduce(
    (
      acc,
      { class: cvClass, className: cvClassName, ...compoundVariantOptions },
    ) =>
      Object.entries(compoundVariantOptions).every(([key, value]) =>
        Array.isArray(value)
          ? value.includes(
              {
                ...defaultVariants,
                ...propsWithoutUndefined,
              }[key],
            )
          : {
              ...defaultVariants,
              ...propsWithoutUndefined,
            }[key] === value,
      )
        ? [...acc, cvClass, cvClassName]
        : acc,
    [],
  );

  return cx(
    base,
    getVariantClassNames,
    getCompoundVariantClassNames,
    props?.class,
    props?.className,
  );
};
