// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
import {
  AnimatedGradientBackground,
  GodRaysComp
} from "./chunk-RQZ56BDS.js";
import {
  stdin_default as stdin_default2
} from "./chunk-HOQ3FAZW.js";
import {
  className,
  css,
  fonts
} from "./chunk-6NFSISF2.js";
import {
  stdin_default
} from "./chunk-LCDELW7M.js";

// /:https://framerusercontent.com/modules/cZjylpkt7ZCPVIF8ABWA/JtpcQkAzyxDILW09UDzL/DDFedjKAC.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addFonts, addPropertyControls, ControlType, cx, getFonts, getFontsFromSharedStyle, RichText, useComponentViewport, useLocaleInfo, useVariantState, withCSS, withFX } from "unframer";
import { LayoutGroup, motion, MotionConfigContext } from "unframer";
import * as React from "react";
import { useRef } from "react";
var LoaderFonts = getFonts(stdin_default2);
var LoaderWithFX = withFX(stdin_default2);
var enabledGestures = { b7eOTPEdT: { hover: true } };
var cycleOrder = ["b7eOTPEdT", "KtJXuTrAP", "JsFnc46Fk", "cq4TYNeCx", "EYtyXzZeq"];
var serializationHash = "framer-P7oOA";
var variantClassNames = { b7eOTPEdT: "framer-v-qmgsm0", cq4TYNeCx: "framer-v-nsh1e8", EYtyXzZeq: "framer-v-gohv4e", JsFnc46Fk: "framer-v-uohzb4", KtJXuTrAP: "framer-v-1bofamw" };
function addPropertyOverrides(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition1 = { bounce: 0, delay: 0, duration: 0.4, type: "spring" };
var transition2 = { delay: 0, duration: 0.5, ease: [0.44, 0, 0.56, 1], type: "tween" };
var animation = { opacity: 1, rotate: 360, rotateX: 0, rotateY: 0, scale: 1, skewX: 0, skewY: 0, x: 0, y: 0 };
var transformTemplate1 = (_, t) => `translate(-50%, -50%) ${t}`;
var transformTemplate2 = (_, t) => `translateY(-50%) ${t}`;
var isSet = (value) => {
  if (Array.isArray(value)) return value.length > 0;
  return value !== void 0 && value !== null && value !== "";
};
var Transition = ({ value, children }) => {
  const config = React.useContext(MotionConfigContext);
  const transition = value ?? config.transition;
  const contextValue = React.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx(MotionConfigContext.Provider, { value: contextValue, children });
};
var Variants = motion.create(React.Fragment);
var humanReadableVariantMap = { Default: "b7eOTPEdT", Dot: "EYtyXzZeq", Error: "cq4TYNeCx", Loading: "KtJXuTrAP", Success: "JsFnc46Fk" };
var getProps = ({ additional, error, height, id, label, success, width, ...props }) => {
  return { ...props, puP6A2dz_: additional ?? props.puP6A2dz_, SB93GG782: success ?? props.SB93GG782 ?? "Thanks for your application!", SMZpJms0Q: label ?? props.SMZpJms0Q ?? "Apply for", v5N8mGmrX: error ?? props.v5N8mGmrX ?? "Something went wrong", variant: humanReadableVariantMap[props.variant] ?? props.variant ?? "b7eOTPEdT" };
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
  const { style, className: className2, layoutId, variant, SMZpJms0Q, puP6A2dz_, SB93GG782, v5N8mGmrX, ...restProps } = getProps(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState({ cycleOrder, defaultVariant: "b7eOTPEdT", enabledGestures, ref: refBinding, variant, variantClassNames });
  const layoutDependency = createLayoutDependency(props, variants);
  const sharedStyleClassNames = [className];
  const scopingClassNames = cx(serializationHash, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (baseVariant === "KtJXuTrAP") return true;
    return false;
  };
  const visible = isSet(puP6A2dz_);
  return /* @__PURE__ */ _jsx(LayoutGroup, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx(Variants, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx(Transition, { value: transition1, children: /* @__PURE__ */ _jsxs(motion.button, { ...restProps, ...gestureHandlers, className: cx(scopingClassNames, "framer-qmgsm0", className2, classNames), "data-framer-name": "Default", "data-reset": "button", draggable: "false", layoutDependency, layoutId: "b7eOTPEdT", ref: refBinding, style: { backdropFilter: "blur(2px)", backgroundColor: "var(--token-4fef9130-aa55-4351-8ed5-cfba481137a7, rgb(255, 255, 255))", borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, filter: "none", WebkitBackdropFilter: "blur(2px)", WebkitFilter: "none", ...style }, variants: { "b7eOTPEdT-hover": { filter: "brightness(0.8)", WebkitFilter: "brightness(0.8)" }, cq4TYNeCx: { backgroundColor: "rgba(219, 44, 44, 0.15)" }, JsFnc46Fk: { backgroundColor: "rgba(255, 255, 255, 0)" } }, ...addPropertyOverrides({ "b7eOTPEdT-hover": { "data-framer-name": void 0 }, cq4TYNeCx: { "data-framer-name": "Error" }, EYtyXzZeq: { "data-framer-name": "Dot" }, JsFnc46Fk: { "data-framer-name": "Success" }, KtJXuTrAP: { "data-framer-name": "Loading" } }, baseVariant, gestureVariant), children: [isDisplayed() && /* @__PURE__ */ _jsx(LoaderWithFX, { __framer__loop: animation, __framer__loopEffectEnabled: true, __framer__loopPauseOffscreen: true, __framer__loopRepeatDelay: 0, __framer__loopRepeatType: "loop", __framer__loopTransition: transition2, __perspectiveFX: false, __smartComponentFX: true, __targetOpacity: 0, animated: true, className: "framer-1ks31km", layoutDependency, layoutId: "RUU3Zske0", style: { "--13bnw74": "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", opacity: 0 }, transformTemplate: transformTemplate1, variants: { KtJXuTrAP: { opacity: 1 } }, ...addPropertyOverrides({ KtJXuTrAP: { __targetOpacity: 1 } }, baseVariant, gestureVariant) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-atw89t", "data-framer-name": "Success", layoutDependency, layoutId: "ryRqIptNb", style: { filter: "blur(2px)", opacity: 0, scale: 0.9, WebkitFilter: "blur(2px)" }, transformTemplate: transformTemplate1, variants: { JsFnc46Fk: { filter: "blur(0px)", opacity: 1, scale: 1, WebkitFilter: "blur(0px)" } }, ...addPropertyOverrides({ JsFnc46Fk: { transformTemplate: void 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-19e7a84f-9c9f-4761-ac3b-54ec81f5f8e0, rgb(0, 230, 197)))" }, children: "Thanks for your application!" }) }), className: "framer-guq5gn", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "l39ioVxkt", style: { "--extracted-r6o4lv": "var(--token-19e7a84f-9c9f-4761-ac3b-54ec81f5f8e0, rgb(0, 230, 197))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: SB93GG782, verticalAlignment: "top", withExternalLayout: true }) }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1xmenn2", "data-framer-name": "Error", layoutDependency, layoutId: "R_4MlO8Vq", style: { filter: "blur(2px)", opacity: 0, scale: 0.9, WebkitFilter: "blur(2px)" }, transformTemplate: transformTemplate1, variants: { cq4TYNeCx: { filter: "blur(0px)", opacity: 1, scale: 1, WebkitFilter: "blur(0px)" } }, ...addPropertyOverrides({ cq4TYNeCx: { transformTemplate: void 0 } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-1e8433a6-dbc9-469b-bb1a-972dd419d298, rgb(219, 44, 44)))" }, children: "Something went wrong" }) }), className: "framer-hwzeqw", "data-framer-name": "Text", fonts: ["Inter"], layoutDependency, layoutId: "uEmIec4Jw", style: { "--extracted-r6o4lv": "var(--token-1e8433a6-dbc9-469b-bb1a-972dd419d298, rgb(219, 44, 44))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: v5N8mGmrX, verticalAlignment: "top", withExternalLayout: true }) }), /* @__PURE__ */ _jsxs(motion.div, { className: "framer-nkutpy", "data-framer-name": "Label", layoutDependency, layoutId: "oXXceo2Ko", style: { filter: "none", opacity: 1, scale: 1, WebkitFilter: "none" }, variants: { "b7eOTPEdT-hover": { filter: "none", opacity: 1, scale: 1, WebkitFilter: "none" }, cq4TYNeCx: { filter: "blur(2px)", opacity: 0, scale: 1.1, WebkitFilter: "blur(2px)" }, EYtyXzZeq: { filter: "blur(2px)", opacity: 0, scale: 1.1, WebkitFilter: "blur(2px)" }, JsFnc46Fk: { filter: "blur(2px)", opacity: 0, scale: 1.1, WebkitFilter: "blur(2px)" }, KtJXuTrAP: { filter: "blur(2px)", opacity: 0, scale: 1.1, WebkitFilter: "blur(2px)" } }, ...addPropertyOverrides({ cq4TYNeCx: { transformTemplate: transformTemplate1 }, JsFnc46Fk: { transformTemplate: transformTemplate2 } }, baseVariant, gestureVariant), children: [/* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0)))" }, children: "Apply for " }) }), className: "framer-1m7oxp6", fonts: ["Inter"], layoutDependency, layoutId: "Hk7Q00Vrg", style: { "--extracted-r6o4lv": "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: SMZpJms0Q, verticalAlignment: "top", withExternalLayout: true }), visible && /* @__PURE__ */ _jsx(RichText, { __fromCanvasComponent: true, children: /* @__PURE__ */ _jsx(React.Fragment, { children: /* @__PURE__ */ _jsx(motion.p, { className: "framer-styles-preset-ujo3da", "data-styles-preset": "sQrIs9_t0", style: { "--framer-text-color": "var(--extracted-r6o4lv, var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0)))" }, children: "Apply for" }) }), className: "framer-yna080", "data-framer-name": "Additional", fonts: ["Inter"], layoutDependency, layoutId: "ixuBEVFZz", style: { "--extracted-r6o4lv": "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline" }, text: puP6A2dz_, verticalAlignment: "top", withExternalLayout: true })] }), /* @__PURE__ */ _jsx(motion.div, { className: "framer-1abkj4w", "data-framer-name": "BG", layoutDependency, layoutId: "OK4Q3x2f1", style: { backgroundColor: "var(--token-19e7a84f-9c9f-4761-ac3b-54ec81f5f8e0, rgb(0, 230, 197))", borderBottomLeftRadius: 100, borderBottomRightRadius: 100, borderTopLeftRadius: 100, borderTopRightRadius: 100, opacity: 0 }, variants: { JsFnc46Fk: { opacity: 0.1 } } })] }) }) }) });
});
var css2 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-P7oOA.framer-1y56j1k, .framer-P7oOA .framer-1y56j1k { display: block; }", ".framer-P7oOA.framer-qmgsm0 { align-content: center; align-items: center; cursor: pointer; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 6px; height: 40px; justify-content: center; overflow: hidden; padding: 0px 18px 0px 18px; position: relative; width: min-content; will-change: var(--framer-will-change-override, transform); }", ".framer-P7oOA .framer-1ks31km { flex: none; height: var(--framer-aspect-ratio-supported, 24px); left: 50%; position: absolute; top: 50%; width: 24px; z-index: 5; }", ".framer-P7oOA .framer-atw89t, .framer-P7oOA .framer-1xmenn2 { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 0px; height: min-content; justify-content: center; left: 50%; overflow: visible; padding: 0px; position: absolute; top: 50%; width: min-content; z-index: 1; }", ".framer-P7oOA .framer-guq5gn, .framer-P7oOA .framer-hwzeqw, .framer-P7oOA .framer-1m7oxp6, .framer-P7oOA .framer-yna080 { flex: none; height: auto; position: relative; white-space: pre; width: auto; }", ".framer-P7oOA .framer-nkutpy { align-content: center; align-items: center; display: flex; flex: none; flex-direction: row; flex-wrap: nowrap; gap: 3.5px; height: min-content; justify-content: center; overflow: visible; padding: 0px; position: relative; width: min-content; }", ".framer-P7oOA .framer-1abkj4w { bottom: 0px; flex: none; left: 0px; overflow: hidden; position: absolute; right: 0px; top: 0px; will-change: var(--framer-will-change-override, transform); z-index: 0; }", ".framer-P7oOA.framer-v-uohzb4.framer-qmgsm0, .framer-P7oOA.framer-v-nsh1e8.framer-qmgsm0 { cursor: default; }", ".framer-P7oOA.framer-v-uohzb4 .framer-atw89t, .framer-P7oOA.framer-v-nsh1e8 .framer-1xmenn2 { left: unset; position: relative; top: unset; }", ".framer-P7oOA.framer-v-uohzb4 .framer-nkutpy { left: 55px; position: absolute; top: 50%; }", ".framer-P7oOA.framer-v-nsh1e8 .framer-nkutpy { left: 50%; position: absolute; top: 50%; z-index: 1; }", ".framer-P7oOA.framer-v-gohv4e.framer-qmgsm0 { width: 40px; }", ...css];
var FramerDDFedjKAC = withCSS(Component, css2, "framer-P7oOA");
var stdin_default3 = FramerDDFedjKAC;
FramerDDFedjKAC.displayName = "Submit Form Button";
FramerDDFedjKAC.defaultProps = { height: 40, width: 98 };
addPropertyControls(FramerDDFedjKAC, { variant: { options: ["b7eOTPEdT", "KtJXuTrAP", "JsFnc46Fk", "cq4TYNeCx", "EYtyXzZeq"], optionTitles: ["Default", "Loading", "Success", "Error", "Dot"], title: "Variant", type: ControlType.Enum }, SMZpJms0Q: { defaultValue: "Apply for", displayTextArea: false, title: "Label", type: ControlType.String }, puP6A2dz_: { defaultValue: "", title: "Additional", type: ControlType.String }, SB93GG782: { defaultValue: "Thanks for your application!", placeholder: "", title: "Success", type: ControlType.String }, v5N8mGmrX: { defaultValue: "Something went wrong", description: "", title: "Error", type: ControlType.String } });
addFonts(FramerDDFedjKAC, [{ explicitInter: true, fonts: [{ family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F", url: "https://framerusercontent.com/assets/5vvr9Vy74if2I6bQbJvbw7SY1pQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116", url: "https://framerusercontent.com/assets/EOr0mi4hNtlgWNn9if640EZzXCo.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+1F00-1FFF", url: "https://framerusercontent.com/assets/Y9k9QrlZAqio88Klkmbd8VoMQc.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0370-03FF", url: "https://framerusercontent.com/assets/OYrD2tBIBPvoJXiIHnLoOXnY9M.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF", url: "https://framerusercontent.com/assets/JeYwfuaPfZHQhEG8U5gtPDZ7WQ.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD", url: "https://framerusercontent.com/assets/vQyevYAyHtARFwPqUzQGpnDs.woff2", weight: "400" }, { family: "Inter", source: "framer", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB", url: "https://framerusercontent.com/assets/b6Y37FthZeALduNqHicBT6FutY.woff2", weight: "400" }] }, ...LoaderFonts, ...getFontsFromSharedStyle(fonts)], { supportsExplicitInterCodegen: true });

// /:https://framerusercontent.com/modules/itWCgwiffNgs2L6G7eTz/d7Ca5kqNFMzASBpMD3m0/S73kH8mB9.js
import { jsx as _jsx2, jsxs as _jsxs2, Fragment as _Fragment } from "react/jsx-runtime";
import { addFonts as addFonts2, addPropertyControls as addPropertyControls2, ChildrenCanSuspend, ComponentViewportProvider, ControlType as ControlType2, cx as cx2, getFonts as getFonts2, PathVariablesContext, SmartComponentScopedContainer, useComponentViewport as useComponentViewport2, useLocaleInfo as useLocaleInfo2, useQueryData, useVariantState as useVariantState2, withCSS as withCSS2 } from "unframer";
import { LayoutGroup as LayoutGroup2, motion as motion2, MotionConfigContext as MotionConfigContext2 } from "unframer";
import * as React2 from "react";
import { useRef as useRef2 } from "react";
var AnimatedGradientBackgroundFonts = getFonts2(AnimatedGradientBackground);
var GodRaysFonts = getFonts2(GodRaysComp);
var cycleOrder2 = ["L_tcvPgN5", "NEJfao5u7", "me0hpdY6q", "DkJYqhgVo", "Xpe3HqTAH", "EzLKPJMu8", "mX8pCQxuV", "T9igwG61s", "hbGvLF35h"];
var serializationHash2 = "framer-jYVhE";
var variantClassNames2 = { DkJYqhgVo: "framer-v-1js5mkj", EzLKPJMu8: "framer-v-mb5h5h", hbGvLF35h: "framer-v-13xsc79", L_tcvPgN5: "framer-v-1swsbr1", me0hpdY6q: "framer-v-19ddhsk", mX8pCQxuV: "framer-v-783kql", NEJfao5u7: "framer-v-1ekw7y1", T9igwG61s: "framer-v-1oaoh3w", Xpe3HqTAH: "framer-v-91bf62" };
function addPropertyOverrides2(overrides, ...variants) {
  const nextOverrides = {};
  variants?.forEach((variant) => variant && Object.assign(nextOverrides, overrides[variant]));
  return nextOverrides;
}
var transition12 = { bounce: 0.2, delay: 0, duration: 0.4, type: "spring" };
var QueryData = ({ query: query2, pageSize, children }) => {
  const data = useQueryData(query2);
  return children(data);
};
var Transition2 = ({ value, children }) => {
  const config = React2.useContext(MotionConfigContext2);
  const transition = value ?? config.transition;
  const contextValue = React2.useMemo(() => ({ ...config, transition }), [JSON.stringify(transition)]);
  return /* @__PURE__ */ _jsx2(MotionConfigContext2.Provider, { value: contextValue, children });
};
var Variants2 = motion2.create(React2.Fragment);
var humanReadableVariantMap2 = { "Connections Bottom": "T9igwG61s", "Connections Center": "mX8pCQxuV", "Dot Speed": "EzLKPJMu8", "Lines No Mask": "hbGvLF35h", Dots: "me0hpdY6q", Lines: "NEJfao5u7", Pulser: "DkJYqhgVo", Radial: "L_tcvPgN5", Speed: "Xpe3HqTAH" };
var getProps2 = ({ height, id, width, ...props }) => {
  return { ...props, variant: humanReadableVariantMap2[props.variant] ?? props.variant ?? "L_tcvPgN5" };
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
  const { style, className: className2, layoutId, variant, ZXLLKdK8xgo44S8TrN, k2CHhHMepgo44S8TrN, idgo44S8TrN, ...restProps } = getProps2(props);
  const { baseVariant, classNames, clearLoadingGesture, gestureHandlers, gestureVariant, isLoading, setGestureState, setVariant, variants } = useVariantState2({ cycleOrder: cycleOrder2, defaultVariant: "L_tcvPgN5", ref: refBinding, variant, variantClassNames: variantClassNames2 });
  const layoutDependency = createLayoutDependency2(props, variants);
  const sharedStyleClassNames = [];
  const scopingClassNames = cx2(serializationHash2, ...sharedStyleClassNames);
  const isDisplayed = () => {
    if (["DkJYqhgVo", "Xpe3HqTAH", "EzLKPJMu8", "mX8pCQxuV", "T9igwG61s"].includes(baseVariant)) return false;
    return true;
  };
  const isDisplayed1 = () => {
    if (["DkJYqhgVo", "Xpe3HqTAH", "EzLKPJMu8", "mX8pCQxuV", "T9igwG61s"].includes(baseVariant)) return true;
    return false;
  };
  return /* @__PURE__ */ _jsx2(LayoutGroup2, { id: layoutId ?? defaultLayoutId, children: /* @__PURE__ */ _jsx2(Variants2, { animate: variants, initial: false, children: /* @__PURE__ */ _jsx2(Transition2, { value: transition12, children: /* @__PURE__ */ _jsx2(motion2.div, { ...restProps, ...gestureHandlers, className: cx2(scopingClassNames, "framer-1swsbr1", className2, classNames), "data-framer-name": "Radial", layoutDependency, layoutId: "L_tcvPgN5", ref: refBinding, style: { backgroundColor: "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", ...style }, ...addPropertyOverrides2({ DkJYqhgVo: { "data-framer-name": "Pulser" }, EzLKPJMu8: { "data-framer-name": "Dot Speed" }, hbGvLF35h: { "data-framer-name": "Lines No Mask" }, me0hpdY6q: { "data-framer-name": "Dots" }, mX8pCQxuV: { "data-framer-name": "Connections Center" }, NEJfao5u7: { "data-framer-name": "Lines" }, T9igwG61s: { "data-framer-name": "Connections Bottom" }, Xpe3HqTAH: { "data-framer-name": "Speed" } }, baseVariant, gestureVariant), children: /* @__PURE__ */ _jsx2(motion2.div, { className: "framer-1to5mdb", "data-framer-name": "Customization Frame", layoutDependency, layoutId: "go44S8TrN", children: /* @__PURE__ */ _jsx2(ChildrenCanSuspend, { children: /* @__PURE__ */ _jsx2(QueryData, { query: { from: { alias: "go44S8TrN", data: stdin_default, type: "Collection" }, limit: { type: "LiteralValue", value: 1 }, select: [{ collection: "go44S8TrN", name: "ZXLLKdK8x", type: "Identifier" }, { collection: "go44S8TrN", name: "k2CHhHMep", type: "Identifier" }, { collection: "go44S8TrN", name: "id", type: "Identifier" }] }, children: (collection, paginationInfo, loadMore) => /* @__PURE__ */ _jsx2(_Fragment, { children: collection?.map(({ id: idgo44S8TrN2, k2CHhHMep: k2CHhHMepgo44S8TrN2, ZXLLKdK8x: ZXLLKdK8xgo44S8TrN2 }, index) => {
    ZXLLKdK8xgo44S8TrN2 ??= 0;
    k2CHhHMepgo44S8TrN2 ??= "";
    return /* @__PURE__ */ _jsx2(LayoutGroup2, { id: `go44S8TrN-${idgo44S8TrN2}`, children: /* @__PURE__ */ _jsx2(PathVariablesContext.Provider, { value: { k2CHhHMep: k2CHhHMepgo44S8TrN2 }, children: /* @__PURE__ */ _jsx2(motion2.div, { className: "framer-4hhbz2", "data-framer-name": "Content", layoutDependency, layoutId: "aMJQ3I8vO", children: /* @__PURE__ */ _jsxs2(motion2.div, { className: "framer-2l5ilk", "data-framer-name": "BG", layoutDependency, layoutId: "El4Ml2GSV", style: { filter: `hue-rotate(${ZXLLKdK8xgo44S8TrN2}deg)`, mask: "url('https://framerusercontent.com/images/sFTsu8Q2Rvnhi1JLZnQmdLe8T0s.svg') alpha no-repeat bottom / cover add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add", WebkitFilter: `hue-rotate(${ZXLLKdK8xgo44S8TrN2}deg)`, WebkitMask: "url('https://framerusercontent.com/images/sFTsu8Q2Rvnhi1JLZnQmdLe8T0s.svg') alpha no-repeat bottom / cover add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add" }, variants: { DkJYqhgVo: { mask: "url('https://framerusercontent.com/images/d2XF9ufkkUPltjFDP7rAY9pOTQ.svg') alpha no-repeat bottom / cover add", WebkitMask: "url('https://framerusercontent.com/images/d2XF9ufkkUPltjFDP7rAY9pOTQ.svg') alpha no-repeat bottom / cover add" }, EzLKPJMu8: { mask: "url('https://framerusercontent.com/images/Qlr86YxOhkbg8aI52mf4pdEUo.svg') alpha repeat bottom / 12.25px 12.25px add", WebkitMask: "url('https://framerusercontent.com/images/Qlr86YxOhkbg8aI52mf4pdEUo.svg') alpha repeat bottom / 12.25px 12.25px add" }, hbGvLF35h: { mask: "linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add", WebkitMask: "linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add" }, me0hpdY6q: { mask: "url('https://framerusercontent.com/images/Qlr86YxOhkbg8aI52mf4pdEUo.svg') alpha repeat center / 11.025px 11.025px add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.15) 100%) add", WebkitMask: "url('https://framerusercontent.com/images/Qlr86YxOhkbg8aI52mf4pdEUo.svg') alpha repeat center / 11.025px 11.025px add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.15) 100%) add" }, mX8pCQxuV: { mask: "url('https://framerusercontent.com/images/wXfPnAG6IQ4o58FxYzivkDBPUo.svg') alpha repeat center / 17.15px 17.15px add, linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0, 0, 0, 0.7) 100%) add", WebkitMask: "url('https://framerusercontent.com/images/wXfPnAG6IQ4o58FxYzivkDBPUo.svg') alpha repeat center / 17.15px 17.15px add, linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0, 0, 0, 0.7) 100%) add" }, NEJfao5u7: { mask: "url('https://framerusercontent.com/images/bbZHyFL3HDqc4KmWT0VIjrWzwtA.svg') alpha repeat center / 24.5px 24.5px add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add", WebkitMask: "url('https://framerusercontent.com/images/bbZHyFL3HDqc4KmWT0VIjrWzwtA.svg') alpha repeat center / 24.5px 24.5px add, linear-gradient(0deg, rgba(0,0,0,0) 46%, rgba(0, 0, 0, 0.7) 100%) add" }, T9igwG61s: { mask: "url('https://framerusercontent.com/images/wXfPnAG6IQ4o58FxYzivkDBPUo.svg') alpha repeat center / 17.15px 17.15px add, linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0, 0, 0, 0.7) 100%) add", WebkitMask: "url('https://framerusercontent.com/images/wXfPnAG6IQ4o58FxYzivkDBPUo.svg') alpha repeat center / 17.15px 17.15px add, linear-gradient(0deg, rgba(0,0,0,0) 35%, rgba(0, 0, 0, 0.7) 100%) add" }, Xpe3HqTAH: { mask: "url('https://framerusercontent.com/images/sFTsu8Q2Rvnhi1JLZnQmdLe8T0s.svg') alpha no-repeat bottom / cover add, linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 100%) add", WebkitMask: "url('https://framerusercontent.com/images/sFTsu8Q2Rvnhi1JLZnQmdLe8T0s.svg') alpha no-repeat bottom / cover add, linear-gradient(0deg, rgba(0,0,0,0) 0%, rgb(0, 0, 0) 100%) add" } }, children: [isDisplayed() && /* @__PURE__ */ _jsx2(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-1oadk8c-container", "data-framer-name": "Gradient", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "XLc4CnJeF-container", name: "Gradient", nodeId: "XLc4CnJeF", rendersWithMotion: true, scopeId: "S73kH8mB9", style: { filter: "brightness(1.5) contrast(0.85) hue-rotate(0deg)", WebkitFilter: "brightness(1.5) contrast(0.85) hue-rotate(0deg)" }, children: /* @__PURE__ */ _jsx2(AnimatedGradientBackground, { color1: "rgb(0, 230, 197)", color2: "rgb(50, 82, 77)", color3: "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", colorMode: "custom", distortion: 12, height: "100%", id: "XLc4CnJeF", layoutId: "XLc4CnJeF", name: "Gradient", noise: { opacity: 1, scale: 0.2 }, offset: 0, preset: "Pulse", preview: false, proportion: 35, radius: "0px", rotation: 0, scale: 1, shape: "Checks", shapeSize: 10, softness: 100, speed: 20, style: { height: "100%", width: "100%" }, swirl: 80, swirlIterations: 10, width: "100%", ...addPropertyOverrides2({ hbGvLF35h: { distortion: 7, offset: -471, preset: "custom", proportion: 100, rotation: -232, scale: 0.5, shape: "Edge", shapeSize: 0, speed: 44, swirl: 66, swirlIterations: 4 }, me0hpdY6q: { distortion: 58, offset: -1e3, preset: "custom", proportion: 77, rotation: -318, scale: 0.64, shape: "Stripes", shapeSize: 0, softness: 0, speed: 24, swirl: 17, swirlIterations: 0 }, NEJfao5u7: { distortion: 7, offset: -471, preset: "custom", proportion: 100, rotation: -232, scale: 0.5, shape: "Edge", shapeSize: 0, speed: 44, swirl: 66, swirlIterations: 4 } }, baseVariant, gestureVariant) }) }) }), isDisplayed1() && /* @__PURE__ */ _jsx2(ComponentViewportProvider, { children: /* @__PURE__ */ _jsx2(SmartComponentScopedContainer, { className: "framer-gk7bor-container", isAuthoredByUser: true, isModuleExternal: true, layoutDependency, layoutId: "dQze_pOCl-container", nodeId: "dQze_pOCl", rendersWithMotion: true, scopeId: "S73kH8mB9", style: { filter: "none", WebkitFilter: "none" }, variants: { EzLKPJMu8: { filter: "brightness(1.3)", WebkitFilter: "brightness(1.3)" }, mX8pCQxuV: { filter: "none", WebkitFilter: "none" }, T9igwG61s: { filter: "none", WebkitFilter: "none" } }, children: /* @__PURE__ */ _jsx2(GodRaysComp, { canvasPreview: true, center: { intensity: 0.57, size: 0.8 }, colorBack: "var(--token-bb3f9735-47c4-4ac2-b002-c5446021aee6, rgb(0, 0, 0))", colors: ["rgb(0, 230, 197)", "rgb(50, 82, 77)"], colorsMode: "Custom", density: 0.5, frequency: 0, height: "100%", id: "dQze_pOCl", layoutId: "dQze_pOCl", noise: { opacity: 1, scale: 0.2 }, offsetX: 0, offsetY: 0.49, preset: "Custom", speed: 5, spotty: 2.5, style: { height: "100%", width: "100%" }, width: "100%", ...addPropertyOverrides2({ DkJYqhgVo: { canvasPreview: false, center: { intensity: 0.47, size: 0.8 }, density: 1, offsetY: 0.54, spotty: 0.8 }, EzLKPJMu8: { canvasPreview: false, center: { intensity: 0, size: 0.4 }, density: 1, frequency: 0.5, offsetY: 0, speed: 2.7, spotty: 0 }, mX8pCQxuV: { canvasPreview: false, frequency: 0.1, offsetY: 0, spotty: 5 }, T9igwG61s: { canvasPreview: false, frequency: 0.1, offsetY: 1.2, spotty: 5 }, Xpe3HqTAH: { canvasPreview: false, center: { intensity: 0, size: 1 }, density: 0.87, frequency: 0.5, offsetY: 0.96, spotty: 0.05 } }, baseVariant, gestureVariant) }) }) })] }) }) }) }, idgo44S8TrN2);
  }) }) }) }) }) }) }) }) });
});
var css3 = ["@supports (aspect-ratio: 1) { body { --framer-aspect-ratio-supported: auto; } }", ".framer-jYVhE.framer-1c6fq0f, .framer-jYVhE .framer-1c6fq0f { display: block; }", ".framer-jYVhE.framer-1swsbr1 { height: 720px; overflow: hidden; position: relative; width: 1168px; }", ".framer-jYVhE .framer-1to5mdb { align-content: flex-start; align-items: flex-start; bottom: 0px; display: flex; flex: none; flex-direction: column; flex-wrap: nowrap; gap: 0px; justify-content: center; left: 0px; padding: 0px; position: absolute; right: 0px; top: 0px; }", ".framer-jYVhE .framer-4hhbz2 { align-content: center; align-items: center; display: flex; flex: 1 0 0px; flex-direction: row; flex-wrap: nowrap; gap: 10px; height: 1px; justify-content: flex-start; padding: 0px; position: relative; width: 100%; }", ".framer-jYVhE .framer-2l5ilk { flex: 1 0 0px; height: 100%; overflow: hidden; position: relative; width: 1px; z-index: 0; }", ".framer-jYVhE .framer-1oadk8c-container, .framer-jYVhE .framer-gk7bor-container { bottom: 0px; flex: none; left: 0px; position: absolute; right: 0px; top: 0px; }"];
var FramerS73kH8mB9 = withCSS2(Component2, css3, "framer-jYVhE");
var stdin_default4 = FramerS73kH8mB9;
FramerS73kH8mB9.displayName = "Animated Backgrounds";
FramerS73kH8mB9.defaultProps = { height: 720, width: 1168 };
addPropertyControls2(FramerS73kH8mB9, { variant: { options: ["L_tcvPgN5", "NEJfao5u7", "me0hpdY6q", "DkJYqhgVo", "Xpe3HqTAH", "EzLKPJMu8", "mX8pCQxuV", "T9igwG61s", "hbGvLF35h"], optionTitles: ["Radial", "Lines", "Dots", "Pulser", "Speed", "Dot Speed", "Connections Center", "Connections Bottom", "Lines No Mask"], title: "Variant", type: ControlType2.Enum } });
addFonts2(FramerS73kH8mB9, [{ explicitInter: true, fonts: [] }, ...AnimatedGradientBackgroundFonts, ...GodRaysFonts], { supportsExplicitInterCodegen: true });

export {
  stdin_default3 as stdin_default,
  stdin_default4 as stdin_default2
};
