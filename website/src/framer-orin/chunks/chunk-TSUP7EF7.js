// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
import {
  AspectRatioLogo
} from "./chunk-UTD4IIYV.js";
import {
  stdin_default
} from "./chunk-LCDELW7M.js";

// /:https://framerusercontent.com/modules/kEeVkdjpzLsLk0MDzoTi/e5bhZQCHgptTv8RUXBTw/CO1ETPl7X.js
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ChildrenCanSuspend, ComponentViewportProvider, ControlType, cx, getFonts, Link, PathVariablesContext, SmartComponentScopedContainer, useActiveVariantCallback, useComponentViewport, useLocaleInfo, useQueryData, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var AspectRatioLogoFonts = getFonts(AspectRatioLogo);
var cycleOrder = ["ry1TL0nCL", "FcCTKt2S9"];
var serializationHash = "framer-43OuP";
var variantClassNames = { FcCTKt2S9: "framer-v-1ed0de", ry1TL0nCL: "framer-v-1qt7o0h" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var QueryData = ({ query: query2, pageSize, children }) => {
  const data = useQueryData(query2);
  return children(data);
};
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { "Logo mark": "FcCTKt2S9", Logo: "ry1TL0nCL" };
var getProps = ({ click, height, id, width, ...props }) => {
  return { ...props, KvhM2k7WB: click ?? props.KvhM2k7WB, variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "ry1TL0nCL" };
};
var createLayoutDependency = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const fallbackRef = useRef(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React.useId();
  const { activeLocale, setLocale } = useLocaleInfo();
  const componentViewport = useComponentViewport();
  const { style, className, layoutId, variant, KvhM2k7WB, gYAtMCnvHTOtFpMtAw, d9UHM1Pl5TOtFpMtAw, nry0JnSv2TOtFpMtAw, o67aZ_FyRTOtFpMtAw, k2CHhHMepTOtFpMtAw, idTOtFpMtAw, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "ry1TL0nCL", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const onTaplgcjvr = activeVariantCallback(async (...args) => {
    setGestureState({ isPressed: false });
    if (KvhM2k7WB) {
      const res = await KvhM2k7WB(...args);
      if (res === false) return false;
    }
  });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsx(Link, { href: { webPageId: "augiA20Il" }, motionChild: true, nodeId: "ry1TL0nCL", openInNewTab: false, scopeId: "CO1ETPl7X", children: /* @__PURE__ */ _jsx(motion.a, { ...restProps, ...gestureHandlers, className: `${cx(scopingClassNames, "framer-1qt7o0h", className, classNames)} framer-1m7yjiz`, "data-framer-name": "Logo", "data-highlight": true, layoutDependency, layoutId: "ry1TL0nCL", onTap: onTaplgcjvr, ref: refBinding, style: { ...style }, ...addPropertyOverrides({ FcCTKt2S9: { "data-framer-name": "Logo mark" } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-1fqelop", "data-framer-name": "Customization Frame", layoutDependency, layoutId: "TOtFpMtAw", children: /* @__PURE__ */ _jsx(ChildrenCanSuspend, { children: /* @__PURE__ */ _jsx(QueryData, { query: { from: { alias: "TOtFpMtAw", data: stdin_default, type: "Collection" }, limit: { type: "LiteralValue", value: 1 }, select: [{ collection: "TOtFpMtAw", name: "gYAtMCnvH", type: "Identifier" }, { collection: "TOtFpMtAw", name: "d9UHM1Pl5", type: "Identifier" }, { collection: "TOtFpMtAw", name: "nry0JnSv2", type: "Identifier" }, { collection: "TOtFpMtAw", name: "o67aZ_FyR", type: "Identifier" }, { collection: "TOtFpMtAw", name: "k2CHhHMep", type: "Identifier" }, { collection: "TOtFpMtAw", name: "id", type: "Identifier" }] }, children: (collection, paginationInfo, loadMore) => /* @__PURE__ */ _jsx(_Fragment, { children: collection?.map(({ d9UHM1Pl5: d9UHM1Pl5TOtFpMtAw2, gYAtMCnvH: gYAtMCnvHTOtFpMtAw2, id: idTOtFpMtAw2, k2CHhHMep: k2CHhHMepTOtFpMtAw2, nry0JnSv2: nry0JnSv2TOtFpMtAw2, o67aZ_FyR: o67aZ_FyRTOtFpMtAw2 }, index) => {
    d9UHM1Pl5TOtFpMtAw2 ??= true;
    nry0JnSv2TOtFpMtAw2 ??= true;
    k2CHhHMepTOtFpMtAw2 ??= "";
    return /* @__PURE__ */ _jsx(LayoutGroup, { id: `TOtFpMtAw-${idTOtFpMtAw2}`, children: /* @__PURE__ */ _jsx(PathVariablesContext.Provider, { value: { k2CHhHMep: k2CHhHMepTOtFpMtAw2 }, children: /* @__PURE__ */ _jsx(motion.div, { className: "framer-1rsdn2a", "data-framer-name": "Content", layoutDependency, layoutId: "OHrM1XKdO", children: /* @__PURE__ */ _jsx(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-16hrkv2-container", draggable: "false", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "gI9CyG8Z9-container", nodeId: "gI9CyG8Z9", rendersWithMotion: true, scopeId: "CO1ETPl7X", style: { filter: "invert(0)", WebkitFilter: "invert(0)" }, children: /* @__PURE__ */ _jsx(AspectRatioLogo, { fixedHeight: 24, height: "100%", id: "gI9CyG8Z9", invertColors: nry0JnSv2TOtFpMtAw2, layoutId: "gI9CyG8Z9", logoFile: gYAtMCnvHTOtFpMtAw2, noColor: d9UHM1Pl5TOtFpMtAw2, width: "100%", ...addPropertyOverrides({ FcCTKt2S9: { logoFile: o67aZ_FyRTOtFpMtAw2 } }, baseVariant, gestureVariant) }) }) }) }) }) }, idTOtFpMtAw2);
  }) }) }) }) }) }) }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-43OuP.framer-1m7yjiz, .framer-43OuP .framer-1m7yjiz { display: block; }", ".framer-43OuP.framer-1qt7o0h { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; text-decoration: none; width: min-content; }", ".framer-43OuP .framer-1fqelop { align-content: flex-start; align-items: flex-start; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; padding: 0px; position: relative; width: min-content; }", ".framer-43OuP .framer-1rsdn2a { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: flex-start; padding: 0px; position: relative; width: min-content; }", ".framer-43OuP .framer-16hrkv2-container { -webkit-user-select: none; flex: none; height: auto; pointer-events: none; position: relative; user-select: none; width: auto; }"];
var FramerCO1ETPl7X = withCSS(Component, css, "framer-43OuP");
var stdin_default2 = FramerCO1ETPl7X;
FramerCO1ETPl7X.displayName = "Logo";
FramerCO1ETPl7X.defaultProps = { height: 24, width: 62 };
addPropertyControls(FramerCO1ETPl7X, { variant: { options: ["ry1TL0nCL", "FcCTKt2S9"], optionTitles: ["Logo", "Logo mark"], title: "Variant", type: ControlType.Enum }, KvhM2k7WB: { title: "Click", type: ControlType.EventHandler } });
addFonts(FramerCO1ETPl7X, [{ explicitInter: true, fonts: [] }, ...AspectRatioLogoFonts], { supportsExplicitInterCodegen: true });

export {
  stdin_default2 as stdin_default
};
