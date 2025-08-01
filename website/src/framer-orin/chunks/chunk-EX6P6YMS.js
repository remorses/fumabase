// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
import {
  stdin_default
} from "./chunk-J43OPFLQ.js";
import {
  className,
  css,
  fonts
} from "./chunk-JWNC3KJW.js";
import {
  stdin_default as stdin_default2
} from "./chunk-ALVRX4HO.js";

// /:https://framerusercontent.com/modules/63lT7C0WI3kGRtmIwBCe/5snLIldWPpemGbbNo9xp/ziNM6mmJ8.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ComponentViewportProvider, ControlType, cx, getFonts, getFontsFromSharedStyle, Instance, RichText, SmartComponentScopedContainer, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";

// /:https://framerusercontent.com/modules/A6IQieYZBIWBoB8ZBKw7/C5uhdFp6v9AJZ42u5l5W/sQrIs9_t0.js
import { fontStore } from "unframer";
fontStore.loadFonts(["BI;Raveo Variable/variable/v0", "BI;Raveo Variable/variable/v0VF=Im9wc3oiIDE0LCAid2dodCIgNTUw", "BI;Raveo Variable/variable/v0VF=Im9wc3oiIDE0LCAid2dodCIgNTUw", "BI;Raveo Variable/variable/v0VF=Im9wc3oiIDE0LCAid2dodCIgNTUw"]);
var variationAxes = [{ defaultValue: 14, maxValue: 32, minValue: 14, name: "Optical size", tag: "opsz" }, { defaultValue: 400, maxValue: 900, minValue: 100, name: "Weight", tag: "wght" }];
var fonts2 = [{ explicitInter: true, fonts: [{ family: "Raveo Variable", source: "builtIn", style: "normal", url: "https://framerusercontent.com/assets/JEdA86oNqHX1i1CLD92Q7jTxV8.woff2", variationAxes, weight: "1000" }] }];
var css2 = ['.framer-D0GFO .framer-styles-preset-ujo3da:not(.rich-text-wrapper), .framer-D0GFO .framer-styles-preset-ujo3da.rich-text-wrapper p { --framer-font-family: "Raveo Variable Variable", sans-serif; --framer-font-family-bold: "Raveo Variable Variable", sans-serif; --framer-font-family-bold-italic: "Raveo Variable Variable", sans-serif; --framer-font-family-italic: "Raveo Variable Variable", sans-serif; --framer-font-open-type-features: normal; --framer-font-size: 14px; --framer-font-style: normal; --framer-font-style-bold: normal; --framer-font-style-bold-italic: normal; --framer-font-style-italic: normal; --framer-font-variation-axes: "opsz" 14, "wght" 550; --framer-font-variation-axes-bold: "opsz" 14, "wght" 550; --framer-font-variation-axes-bold-italic: "opsz" 14, "wght" 550; --framer-font-variation-axes-italic: "opsz" 14, "wght" 550; --framer-font-weight: 1000; --framer-font-weight-bold: 1000; --framer-font-weight-bold-italic: 1000; --framer-font-weight-italic: 1000; --framer-letter-spacing: 0em; --framer-line-height: 1.5em; --framer-paragraph-spacing: 20px; --framer-text-alignment: left; --framer-text-color: var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, #ffffff); --framer-text-decoration: none; --framer-text-stroke-color: initial; --framer-text-stroke-width: initial; --framer-text-transform: none; }'];
var className2 = "framer-D0GFO";

// /:https://framerusercontent.com/modules/63lT7C0WI3kGRtmIwBCe/5snLIldWPpemGbbNo9xp/ziNM6mmJ8.js
var MainSiteGridBorderFonts = getFonts(stdin_default2);
var cycleOrder = ["Y26fovixd", "Aaocw2h0y"];
var serializationHash = "framer-4pfUn";
var variantClassNames = { Aaocw2h0y: "framer-v-1y9kfuv", Y26fovixd: "framer-v-7zzd0p" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { Default: "Y26fovixd", Phone: "Aaocw2h0y" };
var getProps = ({ height, icon, id, sub, title, width, ...props }) => {
  return { ...props, brrCljmh4: icon ?? props.brrCljmh4 ?? stdin_default, p6B54ip8f: sub ?? props.p6B54ip8f ?? "Sharper visuals, cleaner code\xA0", variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "Y26fovixd", WstzaoIHQ: title ?? props.WstzaoIHQ ?? "Enter your URL" };
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
  const { style, className: className3, layoutId, variant, WstzaoIHQ, p6B54ip8f, brrCljmh4, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "Y26fovixd", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className2, className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsxs(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-7zzd0p", className3, classNames), "data-framer-name": "Default", layoutDependency, layoutId: "Y26fovixd", ref: refBinding, style: { ...style }, ...addPropertyOverrides({ Aaocw2h0y: { "data-framer-name": "Phone" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx(motion.div, { className: "framer-1pp0v9o", "data-framer-name": "Icon Wrap", layoutDependency, layoutId: "GAfg9iMYg", style: { backgroundColor: "var(--token-ab91763a-bd8d-4b8f-92c1-f89e2462855c, rgb(28, 28, 28))", borderBottomLeftRadius: 188, borderBottomRightRadius: 188, borderTopLeftRadius: 188, borderTopRightRadius: 188 }, children: /* @__PURE__ */ _jsx(Instance, { animated: true, className: "framer-1msr35u", Component: brrCljmh4, layoutDependency, layoutId: "ZrTp4y7AL", style: { "--1m6trwb": 0, "--21h8s6": "var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))", "--pgex8v": 1.5 } }) }), /* @__PURE__ */ _jsxs(motion.div, { className: "framer-qeoqkb", "data-framer-name": "Text", layoutDependency, layoutId: "CEIOfR4mk", children: [/* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255)))" }, children: "Enter your URL" }) }), className: "framer-1hxbneb", fonts: ["Inter"], layoutDependency, layoutId: "d4kygzA5X", style: { "--extracted-r6o4lv": "var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: WstzaoIHQ, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides({ Aaocw2h0y: { children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255)))" }, children: "Enter your URL" }) }) } }, baseVariant, gestureVariant) }), /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-c9mga6", "data-styles-preset": "Xa6VJQy2p", style: { "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5)))" }, children: "Sharper visuals, cleaner code\xA0" }) }), className: "framer-68v3n6", fonts: ["Inter"], layoutDependency, layoutId: "xud6yIs9E", style: { "--extracted-r6o4lv": "var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: p6B54ip8f, verticalAlignment: "top", withExternalLayout: true, ...addPropertyOverrides({ Aaocw2h0y: { children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-c9mga6", "data-styles-preset": "Xa6VJQy2p", style: { "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-8acf10b0-fc55-42ff-8ac5-80a79dc47979, rgba(255, 255, 255, 0.5)))" }, children: "Sharper visuals, cleaner code\xA0" }) }) } }, baseVariant, gestureVariant) })] }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: (componentViewport?.height || 174) - 0, width: componentViewport?.width || "100vw", y: (componentViewport?.y || 0) + 0, ...addPropertyOverrides({ Aaocw2h0y: { height: (componentViewport?.height || 92) - 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-1kmred5-container", layoutDependency, layoutId: "aQfXk_OGf-container", nodeId: "aQfXk_OGf", rendersWithMotion: true, scopeId: "ziNM6mmJ8", children: /* @__PURE__ */ _jsx(stdin_default2, { height: "100%", id: "aQfXk_OGf", layoutId: "aQfXk_OGf", style: { height: "100%", width: "100%" }, variant: "yzIFdYlxZ", width: "100%" }) }) })] }) }) }) });
});
var css3 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-4pfUn.framer-1x9xjtv, .framer-4pfUn .framer-1x9xjtv { display: block; }", ".framer-4pfUn.framer-7zzd0p { align-content: center; align-items: center; display: flex; flex-direction: column; flex-wrap: nowrap; height: 174px; justify-content: space-between; overflow: visible; padding: 34px 34px 0px 34px; position: relative; width: 390px; }", ".framer-4pfUn .framer-1pp0v9o { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 10px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-4pfUn .framer-1msr35u { flex: none; height: var(--framer-aspect-ratio-supported, 24px); position: relative; width: 24px; }", ".framer-4pfUn .framer-qeoqkb { align-content: center; align-items: center; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 0px 0px 34px 0px; position: relative; width: 100%; z-index: 4; }", ".framer-4pfUn .framer-1hxbneb { flex: none; height: auto; position: relative; white-space: pre-wrap; width: 322px; word-break: break-word; word-wrap: break-word; }", ".framer-4pfUn .framer-68v3n6 { flex: none; height: auto; max-width: 240px; position: relative; white-space: pre-wrap; width: 100%; word-break: break-word; word-wrap: break-word; z-index: 1; }", ".framer-4pfUn .framer-1kmred5-container { -webkit-user-select: none; bottom: 0px; flex: none; left: 0px; pointer-events: none; position: absolute; right: 0px; top: 0px; user-select: none; z-index: 2; }", ".framer-4pfUn.framer-v-1y9kfuv.framer-7zzd0p { flex-direction: row; gap: 14px; height: min-content; justify-content: flex-start; padding: 24px; }", ".framer-4pfUn.framer-v-1y9kfuv .framer-qeoqkb { align-content: flex-start; align-items: flex-start; flex: 1 0 0px; padding: 0px; width: 1px; }", ...css2, ...css];
var FramerziNM6mmJ8 = withCSS(Component, css3, "framer-4pfUn");
var stdin_default3 = FramerziNM6mmJ8;
FramerziNM6mmJ8.displayName = "Process Steps/Step Card";
FramerziNM6mmJ8.defaultProps = { height: 174, width: 390 };
addPropertyControls(FramerziNM6mmJ8, { variant: { options: ["Y26fovixd", "Aaocw2h0y"], optionTitles: ["Default", "Phone"], title: "Variant", type: ControlType.Enum }, WstzaoIHQ: { defaultValue: "Enter your URL", displayTextArea: false, title: "Title", type: ControlType.String }, p6B54ip8f: { defaultValue: "Sharper visuals, cleaner code\xA0", displayTextArea: false, title: "Sub", type: ControlType.String }, brrCljmh4: { defaultValue: { identifier: "module:BLjRczXRCa2XMZlRX1af/3JLV0naPYn0LHwD9pOLX/ljGcHeWyh.js:default", moduleId: "BLjRczXRCa2XMZlRX1af" }, setModuleId: "omX0gWFPqDwhaiWwf6ab", title: "Icon", type: ControlType.VectorSetItem } });
addFonts(FramerziNM6mmJ8, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...MainSiteGridBorderFonts, ...getFontsFromSharedStyle(fonts2), ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });

export {
  stdin_default3 as stdin_default
};
