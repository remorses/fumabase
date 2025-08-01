// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
// /:https://framerusercontent.com/modules/WiitR9pg0FnfD2NJ73lu/m7AszHAuNDoZtmgqXbZc/zCnEq6lhz.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType, cx, motion, useSVGTemplate, withCSS } from "unframer";
import * as React from "react";
import { forwardRef as forwardRef2 } from "react";
var mask = "var(--framer-icon-mask)";
var Base = /* @__PURE__ */ forwardRef2(function(props, ref) {
  return /* @__PURE__ */ _jsx("svg", { ...props, ref, children: props.children });
});
var MotionSVG = motion.create(Base);
var SVG = /* @__PURE__ */ forwardRef2((props, ref) => {
  const { animated, layoutId, children, ...rest } = props;
  return animated ? /* @__PURE__ */ _jsx(MotionSVG, { ...rest, layoutId, ref, children }) : /* @__PURE__ */ _jsx("svg", { ...rest, ref, children });
});
var svg = '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 18.219 1.281 L 18.219 1.281 C 17.4 0.461 16.288 0 15.128 0 C 13.969 0 12.857 0.461 12.038 1.281 L 8.781 4.537 C 8.75 4.568 8.721 4.599 8.687 4.631 C 7.198 4.259 5.623 4.695 4.538 5.781 L 1.281 9.037 C -0.425 10.743 -0.427 13.506 1.275 15.215 L 1.275 15.215 C 2.094 16.037 3.207 16.499 4.368 16.5 C 5.528 16.501 6.642 16.04 7.463 15.219 L 10.719 11.962 C 10.75 11.932 10.779 11.901 10.808 11.869 C 12.299 12.243 13.877 11.807 14.963 10.719 L 18.219 7.462 C 19.039 6.643 19.5 5.531 19.5 4.372 C 19.5 3.212 19.039 2.1 18.219 1.281 Z" fill-opacity="var(--1m6trwb, 0)" fill="var(--21h8s6, rgb(0, 0, 0))" height="16.499965131840284px" id="k8t8eKGoo" transform="translate(2.25 3.75)" width="19.499965888638794px"/><path d="M 3.506 2.312 L 4.537 1.281 C 5.357 0.461 6.469 0 7.628 0 C 8.788 0 9.9 0.461 10.719 1.281 L 10.719 1.281 C 11.539 2.1 12 3.212 12 4.372 C 12 5.531 11.539 6.643 10.719 7.462 L 8.434 9.748 L 7.464 10.717 C 6.644 11.538 5.53 11.999 4.37 11.998 C 3.209 11.997 2.096 11.535 1.277 10.713 L 1.277 10.713 C 0.428 9.864 -0.033 8.703 0.002 7.504" fill="transparent" height="11.998090131840286px" id="LMRPEUoOw" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(9.748 3.752)" width="11.999926857597302px"/><path d="M 8.494 9.686 L 7.463 10.717 C 6.642 11.538 5.528 11.999 4.368 11.998 C 3.207 11.997 2.094 11.535 1.275 10.713 L 1.275 10.713 C -0.427 9.005 -0.425 6.241 1.281 4.536 L 4.536 1.281 C 5.355 0.461 6.467 0 7.627 0 C 8.786 0 9.898 0.461 10.718 1.281 L 10.718 1.281 C 11.57 2.129 12.033 3.292 11.998 4.494" fill="transparent" height="11.998090131840286px" id="exh7rRmf9" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(2.252 8.25)" width="12.000020048809883px"/></svg>';
var getProps = ({ alpha, color, height, id, width, width1, ...props }) => {
  return { ...props, ezTt3ayMo: color ?? props.ezTt3ayMo ?? "rgb(0, 0, 0)", lschgej4H: width1 ?? props.lschgej4H ?? 1.5, qxTvv_EBh: alpha ?? props.qxTvv_EBh };
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { style, className, layoutId, variant, ezTt3ayMo, lschgej4H, qxTvv_EBh, ...restProps } = getProps(props);
  const href = useSVGTemplate("1802865483", svg);
  return /* @__PURE__ */ _jsx(SVG, { ...restProps, className: cx("framer-INa10", className), layoutId, ref, role: "presentation", style: { "--1m6trwb": qxTvv_EBh, "--21h8s6": ezTt3ayMo, "--pgex8v": lschgej4H, ...style }, viewBox: "0 0 24 24", children: /* @__PURE__ */ _jsx("use", { href }) });
});
var css = [`.framer-INa10 { -webkit-mask: ${mask}; aspect-ratio: 1; display: block; mask: ${mask}; width: 24px; }`];
var Icon = withCSS(Component, css, "framer-INa10");
Icon.displayName = "Link";
var stdin_default = Icon;
addPropertyControls(Icon, { ezTt3ayMo: { defaultValue: "rgb(0, 0, 0)", hidden: false, title: "Color", type: ControlType.Color }, lschgej4H: { defaultValue: 1.5, displayStepper: true, hidden: false, max: 6, min: 0, step: 0.5, title: "Width", type: ControlType.Number }, qxTvv_EBh: { defaultValue: 0, displayStepper: true, hidden: false, max: 1, min: 0, step: 0.1, title: "Alpha", type: ControlType.Number } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "Icon", "slots": [], "annotations": { "framerVector": '{"name":"Link","color":{"type":"variable","value":"21h8s6"},"set":{"localId":"vectorSet/NGVKdicsm","id":"NGVKdicsm","moduleId":"omX0gWFPqDwhaiWwf6ab"}}', "framerIntrinsicWidth": "24", "framerSupportedLayoutWidth": "any-prefer-fixed", "framerVariables": '{"ezTt3ayMo":"color","lschgej4H":"width1","qxTvv_EBh":"alpha"}', "framerDisableUnlink": "true", "framerImmutableVariables": "true", "framerContractVersion": "1", "framerSupportedLayoutHeight": "any-prefer-fixed", "framerIntrinsicHeight": "24" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  stdin_default as default
};
