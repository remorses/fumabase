// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
import {
  stdin_default
} from "./chunk-QPSDYQRG.js";

// /:https://framerusercontent.com/modules/1kTFgFAv9rLtxtBkZLlm/jVKiGWZLXuwIRbb8gwcY/bSbaQF5JR.js
import { jsx as _jsx2, jsxs as _jsxs2 } from "react/jsx-runtime";
import { addFonts as addFonts2, addPropertyControls as addPropertyControls2, ComponentViewportProvider as ComponentViewportProvider2, ControlType as ControlType2, cx as cx2, getFonts as getFonts2, SmartComponentScopedContainer as SmartComponentScopedContainer2, useActiveVariantCallback, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useOnVariantChange, useVariantState as useVariantState2, withCSS as withCSS2 } from "unframer";
import { LayoutGroup as LayoutGroup2, motion as motion2, MotionConfigContext as MotionConfigContext2 } from "unframer";
import * as React2 from "react";
import { useRef as useRef2 } from "react";

// /:https://framerusercontent.com/modules/xbNRgY65ajOeNYH2X4VI/DyT7lGx8P1nUyIQZjq1H/wQCKhuIfN.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ComponentViewportProvider, ControlType, cx, getFonts, getPropertyControls, SmartComponentScopedContainer, useComponentViewport, useLocaleInfo, useVariantState, withCSS } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var LogoHolderFonts = getFonts(stdin_default);
var LogoHolderControls = getPropertyControls(stdin_default);
var cycleOrder = ["DxGh2S0TN", "d71W4Mz7B", "IFOx9Xaf0"];
var serializationHash = "framer-M0Yx1";
var variantClassNames = { d71W4Mz7B: "framer-v-h7bp74", DxGh2S0TN: "framer-v-7k6x9y", IFOx9Xaf0: "framer-v-1d76t5w" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { duration: 0, type: "tween" };
var transition2 = { bounce: 0, delay: 0, duration: 0.6, type: "spring" };
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableEnumMap = { "1": "rJpeO5TfG", "2": "HfzpqW5M7", "3": "v60ZzFMlS", "4": "Vm1pdYezD", "5": "zi7jTfbgd", "6": "mGnwAZdNT" };
var humanReadableVariantMap = { Back: "IFOx9Xaf0", Start: "DxGh2S0TN", Switch: "d71W4Mz7B" };
var getProps = ({ first, height, id, second, width, ...props }) => {
  return { ...props, NqY05iV4n: humanReadableEnumMap[first] ?? first ?? props.NqY05iV4n ?? "rJpeO5TfG", rHuoAV0dr: humanReadableEnumMap[second] ?? second ?? props.rHuoAV0dr ?? "HfzpqW5M7", variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "DxGh2S0TN" };
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
  const { style, className, layoutId, variant, NqY05iV4n, rHuoAV0dr, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "DxGh2S0TN", ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, ...addPropertyOverrides({ d71W4Mz7B: { value: transition2 }, IFOx9Xaf0: { value: transition2 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsxs(motion.div, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-7k6x9y", className, classNames), "data-framer-name": "Start", layoutDependency, layoutId: "DxGh2S0TN", ref: refBinding, style: { ...style }, ...addPropertyOverrides({ d71W4Mz7B: { "data-framer-name": "Switch" }, IFOx9Xaf0: { "data-framer-name": "Back" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 86, width: `max(${componentViewport?.width || "100vw"}, 1px)`, y: (componentViewport?.y || 0) + (0 + ((componentViewport?.height || 86) - 0 - 86) / 2), ...addPropertyOverrides({ d71W4Mz7B: { width: `calc(${componentViewport?.width || "100vw"} + 0.5px)`, y: (componentViewport?.y || 0) + -86 }, IFOx9Xaf0: { width: `calc(${componentViewport?.width || "100vw"} + 0.5px)`, y: (componentViewport?.y || 0) + -86 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-195whwo-container", "data-framer-name": "First", layoutDependency, layoutId: "MlSBh_4_6-container", name: "First", nodeId: "MlSBh_4_6", rendersWithMotion: true, scopeId: "wQCKhuIfN", style: { filter: "none", opacity: 1, WebkitFilter: "none" }, variants: { d71W4Mz7B: { filter: "blur(6px)", opacity: 0, WebkitFilter: "blur(6px)" }, IFOx9Xaf0: { filter: "blur(6px)", opacity: 0, WebkitFilter: "blur(6px)" } }, children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "MlSBh_4_6", layoutId: "MlSBh_4_6", name: "First", style: { height: "100%", width: "100%" }, variant: NqY05iV4n, width: "100%" }) }) }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 86, width: `calc(${componentViewport?.width || "100vw"} + 0.5px)`, y: (componentViewport?.y || 0) + (componentViewport?.height || 86) - 0, ...addPropertyOverrides({ IFOx9Xaf0: { width: `max(${componentViewport?.width || "100vw"}, 1px)`, y: (componentViewport?.y || 0) + (0 + ((componentViewport?.height || 86) - 0 - 86) / 2) } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-a0cpgk-container", "data-framer-name": "First", layoutDependency, layoutId: "y0lSeNvc_-container", name: "First", nodeId: "y0lSeNvc_", rendersWithMotion: true, scopeId: "wQCKhuIfN", style: { filter: "blur(6px)", opacity: 0, WebkitFilter: "blur(6px)" }, variants: { IFOx9Xaf0: { filter: "blur(0px)", opacity: 1, WebkitFilter: "blur(0px)" } }, children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "y0lSeNvc_", layoutId: "y0lSeNvc_", name: "First", style: { height: "100%", width: "100%" }, variant: NqY05iV4n, width: "100%" }) }) }), /* @__PURE__ */ _jsx(ComponentViewportProvider, { height: 86, width: componentViewport?.width || "100vw", y: (componentViewport?.y || 0) + (componentViewport?.height || 86) - 0, ...addPropertyOverrides({ d71W4Mz7B: { width: `max(${componentViewport?.width || "100vw"}, 1px)`, y: (componentViewport?.y || 0) + (0 + ((componentViewport?.height || 86) - 0 - 86) / 2) }, IFOx9Xaf0: { width: `calc(${componentViewport?.width || "100vw"} + 0.5px)`, y: (componentViewport?.y || 0) + -86 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(SmartComponentScopedContainer, { className: "framer-k765we-container", "data-framer-name": "Second", layoutDependency, layoutId: "Cx7a_1G2o-container", name: "Second", nodeId: "Cx7a_1G2o", rendersWithMotion: true, scopeId: "wQCKhuIfN", style: { filter: "blur(6px)", opacity: 0, WebkitFilter: "blur(6px)" }, variants: { d71W4Mz7B: { filter: "blur(0px)", opacity: 1, WebkitFilter: "blur(0px)" } }, children: /* @__PURE__ */ _jsx(stdin_default, { height: "100%", id: "Cx7a_1G2o", layoutId: "Cx7a_1G2o", name: "Second", style: { height: "100%", width: "100%" }, variant: rHuoAV0dr, width: "100%" }) }) })] }) }) }) });
});
var css = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-M0Yx1.framer-rxt0qg, .framer-M0Yx1 .framer-rxt0qg { display: block; }", ".framer-M0Yx1.framer-7k6x9y { align-content: center; align-items: center; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 132px; }", ".framer-M0Yx1 .framer-195whwo-container { flex: 1 0 0px; height: 86px; position: relative; width: 1px; }", ".framer-M0Yx1 .framer-a0cpgk-container, .framer-M0Yx1 .framer-k765we-container { bottom: -86px; flex: none; height: 86px; left: 0px; position: absolute; right: 0px; z-index: 1; }", ".framer-M0Yx1.framer-v-h7bp74 .framer-195whwo-container, .framer-M0Yx1.framer-v-1d76t5w .framer-195whwo-container { flex: none; left: 0px; position: absolute; right: 0px; top: -86px; width: unset; z-index: 1; }", ".framer-M0Yx1.framer-v-h7bp74 .framer-k765we-container, .framer-M0Yx1.framer-v-1d76t5w .framer-a0cpgk-container { bottom: unset; flex: 1 0 0px; left: unset; position: relative; right: unset; width: 1px; }", ".framer-M0Yx1.framer-v-1d76t5w .framer-k765we-container { bottom: unset; right: 0px; top: -86px; }"];
var FramerwQCKhuIfN = withCSS(Component, css, "framer-M0Yx1");
var stdin_default2 = FramerwQCKhuIfN;
FramerwQCKhuIfN.displayName = "Logo Cycler";
FramerwQCKhuIfN.defaultProps = { height: 86, width: 132 };
addPropertyControls(FramerwQCKhuIfN, { variant: { options: ["DxGh2S0TN", "d71W4Mz7B", "IFOx9Xaf0"], optionTitles: ["Start", "Switch", "Back"], title: "Variant", type: ControlType.Enum }, NqY05iV4n: LogoHolderControls?.["variant"] && { ...LogoHolderControls["variant"], defaultValue: "rJpeO5TfG", description: void 0, hidden: void 0, title: "First" }, rHuoAV0dr: LogoHolderControls?.["variant"] && { ...LogoHolderControls["variant"], defaultValue: "HfzpqW5M7", description: void 0, hidden: void 0, title: "Second" } });
addFonts(FramerwQCKhuIfN, [{ explicitInter: true, fonts: [] }, ...LogoHolderFonts], { supportsExplicitInterCodegen: true });

// /:https://framerusercontent.com/modules/1kTFgFAv9rLtxtBkZLlm/jVKiGWZLXuwIRbb8gwcY/bSbaQF5JR.js
var LogoCyclerFonts = getFonts2(stdin_default2);
var cycleOrder2 = ["w2RwDIkD_", "Bgj5vcB9R", "ENxI1fTef", "H0uCvXcBc", "H2Lf9qqsI", "U0VMwKLQ7", "IewdqgJpV"];
var serializationHash2 = "framer-cdPbY";
var variantClassNames2 = { Bgj5vcB9R: "framer-v-18gqyot", ENxI1fTef: "framer-v-1papirg", H0uCvXcBc: "framer-v-pgel9i", H2Lf9qqsI: "framer-v-23j4tx", IewdqgJpV: "framer-v-oq3isu", U0VMwKLQ7: "framer-v-14xj977", w2RwDIkD_: "framer-v-4dcn3a" };
function addPropertyOverrides2(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition12 = { bounce: 0, delay: 0, duration: 0.6, type: "spring" };
var Transition2 = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx2(MotionConfigContext2.Provider, { value: contextValue, children });
};
var Variants2 = motion2.create(React2.Fragment);
var humanReadableEnumMap2 = { Horizontal: "row", Vertical: "column" };
var humanReadableVariantMap2 = { "Back (First)": "H2Lf9qqsI", "Back (Second)": "U0VMwKLQ7", "Back (Third)": "IewdqgJpV", "Swtich (First)": "Bgj5vcB9R", "Swtich (Second)": "ENxI1fTef", "Swtich (Third)": "H0uCvXcBc", Default: "w2RwDIkD_" };
var getProps2 = ({ direction, height, id, width, ...props }) => {
  return { ...props, CHO3qLUnq: humanReadableEnumMap2[direction] ?? direction ?? props.CHO3qLUnq ?? "row", variant: humanReadableVariantMap2[props.variant] ?? props.variant ?? "w2RwDIkD_" };
};
var createLayoutDependency2 = (props, variants) => {
  if (props.layoutDependency) return variants.join("-") + props.layoutDependency;
  return variants.join("-");
};
var Component2 = /* @__PURE__ */ React2.forwardRef(function(props, ref) {
  const fallbackRef = useRef2(null);
  const refBinding = ref ?? fallbackRef;
  const defaultLayoutId = React2.useId();
  const { activeLocale, setLocale } = useLocaleInfo2();
  const componentViewport = useComponentViewport2();
  const { style, className, layoutId, variant, CHO3qLUnq, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState2({ cycleOrder: cycleOrder2, defaultVariant: "w2RwDIkD_", ref: refBinding, variant, variantClassNames: variantClassNames2 });
  const layoutDependency = createLayoutDependency2(props, variants);
  const { activeVariantCallback, delay } = useActiveVariantCallback(baseVariant);
  const onAppear1g0awu2 = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("Bgj5vcB9R", true), 1e3);
  });
  const onAppearby085o = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("ENxI1fTef", true), 100);
  });
  const onAppear14htuza = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("H0uCvXcBc", true), 100);
  });
  const onAppearfi83jc = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("H2Lf9qqsI", true), 2e3);
  });
  const onAppear77bpb6 = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("U0VMwKLQ7", true), 100);
  });
  const onAppearghjhge = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("IewdqgJpV", true), 100);
  });
  const onAppear3hqimi = activeVariantCallback(async (...args) => {
    await delay(() => setVariant("w2RwDIkD_", true), 1e3);
  });
  useOnVariantChange(baseVariant, { Bgj5vcB9R: onAppearby085o, default: onAppear1g0awu2, ENxI1fTef: onAppear14htuza, H0uCvXcBc: onAppearfi83jc, H2Lf9qqsI: onAppear77bpb6, IewdqgJpV: onAppear3hqimi, U0VMwKLQ7: onAppearghjhge });
  const sharedStyleClassNames = [];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  return /* @__PURE__ */ _jsx2(LayoutGroup2, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants2, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition2, { value: transition12, children: /* @__PURE__ */ _jsxs2(motion2.div, { ...restProps, ...gestureHandlers, className: cx2(scopingClassNames, "framer-4dcn3a", className, classNames), "data-framer-name": "Default", "data-highlight": true, layoutDependency, layoutId: "w2RwDIkD_", ref: refBinding, style: { "--3m0f6q": CHO3qLUnq, "--ysm8iw": CHO3qLUnq === "column" ? "100%" : "1px", "--zw2j0h": CHO3qLUnq === "column" ? void 0 : "1 0 0px", ...style }, ...addPropertyOverrides2({ Bgj5vcB9R: { "data-framer-name": "Swtich (First)" }, ENxI1fTef: { "data-framer-name": "Swtich (Second)" }, H0uCvXcBc: { "data-framer-name": "Swtich (Third)" }, H2Lf9qqsI: { "data-framer-name": "Back (First)" }, IewdqgJpV: { "data-framer-name": "Back (Third)" }, U0VMwKLQ7: { "data-framer-name": "Back (Second)" } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx2(ComponentViewportProvider2, { height: 86, width: `max(${componentViewport?.width || "100vw"}, 150px)`, children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer2, { className: "framer-1ral9mm-container", layoutDependency, layoutId: "TdGg2zjbi-container", nodeId: "TdGg2zjbi", rendersWithMotion: true, scopeId: "bSbaQF5JR", children: /* @__PURE__ */ _jsx2(stdin_default2, { height: "100%", id: "TdGg2zjbi", layoutId: "TdGg2zjbi", NqY05iV4n: "rJpeO5TfG", rHuoAV0dr: "HfzpqW5M7", style: { width: "100%" }, variant: "DxGh2S0TN", width: "100%", ...addPropertyOverrides2({ Bgj5vcB9R: { variant: "d71W4Mz7B" }, ENxI1fTef: { variant: "d71W4Mz7B" }, H0uCvXcBc: { variant: "d71W4Mz7B" }, H2Lf9qqsI: { variant: "IFOx9Xaf0" }, IewdqgJpV: { variant: "IFOx9Xaf0" }, U0VMwKLQ7: { variant: "IFOx9Xaf0" } }, baseVariant, gestureVariant) }) }) }), /* @__PURE__ */ _jsx2(ComponentViewportProvider2, { height: 86, width: `max(${componentViewport?.width || "100vw"}, 150px)`, children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer2, { className: "framer-15kkro7-container", layoutDependency, layoutId: "YmoDHqHDG-container", nodeId: "YmoDHqHDG", rendersWithMotion: true, scopeId: "bSbaQF5JR", children: /* @__PURE__ */ _jsx2(stdin_default2, { height: "100%", id: "YmoDHqHDG", layoutId: "YmoDHqHDG", NqY05iV4n: "v60ZzFMlS", rHuoAV0dr: "Vm1pdYezD", style: { width: "100%" }, variant: "DxGh2S0TN", width: "100%", ...addPropertyOverrides2({ ENxI1fTef: { variant: "d71W4Mz7B" }, H0uCvXcBc: { variant: "d71W4Mz7B" }, H2Lf9qqsI: { variant: "d71W4Mz7B" }, IewdqgJpV: { variant: "IFOx9Xaf0" }, U0VMwKLQ7: { variant: "IFOx9Xaf0" } }, baseVariant, gestureVariant) }) }) }), /* @__PURE__ */ _jsx2(ComponentViewportProvider2, { height: 86, width: `max(${componentViewport?.width || "100vw"}, 150px)`, children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer2, { className: "framer-m19xl-container", layoutDependency, layoutId: "SJe9B2dq5-container", nodeId: "SJe9B2dq5", rendersWithMotion: true, scopeId: "bSbaQF5JR", children: /* @__PURE__ */ _jsx2(stdin_default2, { height: "100%", id: "SJe9B2dq5", layoutId: "SJe9B2dq5", NqY05iV4n: "zi7jTfbgd", rHuoAV0dr: "mGnwAZdNT", style: { width: "100%" }, variant: "DxGh2S0TN", width: "100%", ...addPropertyOverrides2({ H0uCvXcBc: { variant: "d71W4Mz7B" }, H2Lf9qqsI: { variant: "d71W4Mz7B" }, IewdqgJpV: { variant: "IFOx9Xaf0" }, U0VMwKLQ7: { variant: "d71W4Mz7B" } }, baseVariant, gestureVariant) }) }) })] }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-cdPbY.framer-qiadox, .framer-cdPbY .framer-qiadox { display: block; }", ".framer-cdPbY.framer-4dcn3a { align-content: center; align-items: center; display: flex; flex-direction: var(--3m0f6q); flex-wrap: wrap; gap: 0px; height: min-content; justify-content: center; overflow: hidden; padding: 0px; position: relative; width: 609px; }", ".framer-cdPbY .framer-1ral9mm-container, .framer-cdPbY .framer-15kkro7-container, .framer-cdPbY .framer-m19xl-container { flex: var(--zw2j0h); height: auto; min-width: 150px; position: relative; width: var(--ysm8iw); }"];
var FramerbSbaQF5JR = withCSS2(Component2, css2, "framer-cdPbY");
var stdin_default3 = FramerbSbaQF5JR;
FramerbSbaQF5JR.displayName = "Trusted by Logo Cycler (6)";
FramerbSbaQF5JR.defaultProps = { height: 86, width: 609 };
addPropertyControls2(FramerbSbaQF5JR, { variant: { options: ["w2RwDIkD_", "Bgj5vcB9R", "ENxI1fTef", "H0uCvXcBc", "H2Lf9qqsI", "U0VMwKLQ7", "IewdqgJpV"], optionTitles: ["Default", "Swtich (First)", "Swtich (Second)", "Swtich (Third)", "Back (First)", "Back (Second)", "Back (Third)"], title: "Variant", type: ControlType2.Enum }, CHO3qLUnq: { defaultValue: "row", displaySegmentedControl: true, optionIcons: ["direction-horizontal", "direction-vertical"], options: ["row", "column"], optionTitles: ["Horizontal", "Vertical"], title: "Direction", type: ControlType2.Enum } });
addFonts2(FramerbSbaQF5JR, [{ explicitInter: true, fonts: [] }, ...LogoCyclerFonts], { supportsExplicitInterCodegen: true });

export {
  stdin_default3 as stdin_default
};
