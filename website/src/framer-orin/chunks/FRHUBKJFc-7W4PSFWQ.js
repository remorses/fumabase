// @ts-nocheck
/* eslint-disable */
/* This file was generated by Unframer for Framer project dfa04aa1c5bdec07 "Jet - SaaS Template (copy)", do not edit manually */
// /:https://framerusercontent.com/modules/jDKTm4jXG8iOSksImTiV/bCvMemNdesUJOIHqj1YJ/FRHUBKJFc.js
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
var svg = '<svg display="block" role="presentation" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M 16.5 0 C 17.328 0 18 0.672 18 1.5 L 18 12 C 18 12.828 17.328 13.5 16.5 13.5 L 1.5 13.5 C 0.672 13.5 0 12.828 0 12 L 0 1.5 C 0 0.672 0.672 0 1.5 0 Z" fill-opacity="var(--1m6trwb, 0)" fill="var(--21h8s6, rgb(0, 0, 0))" height="13.5px" id="ZDz27jzH2" transform="translate(3 4.5)" width="18px"/><path d="M 16.5 0 C 17.328 0 18 0.672 18 1.5 L 18 12 C 18 12.828 17.328 13.5 16.5 13.5 L 1.5 13.5 C 0.672 13.5 0 12.828 0 12 L 0 1.5 C 0 0.672 0.672 0 1.5 0 Z" fill="transparent" height="13.5px" id="byApwsy6U" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(3 4.5)" width="18px"/><path d="M 6 0 L 0 0" fill="transparent" height="1px" id="FcpMCGIBp" stroke-dasharray="" stroke-linecap="round" stroke-linejoin="round" stroke-width="var(--pgex8v, 1.5)" stroke="var(--21h8s6, rgb(0, 0, 0))" transform="translate(9 21)" width="6px"/></svg>';
var getProps = ({ alpha, color, height, id, width, width1, ...props }) => {
  return { ...props, ezTt3ayMo: color ?? props.ezTt3ayMo ?? "rgb(0, 0, 0)", lschgej4H: width1 ?? props.lschgej4H ?? 1.5, qxTvv_EBh: alpha ?? props.qxTvv_EBh };
};
var Component = /* @__PURE__ */ React.forwardRef(function(props, ref) {
  const { style, className, layoutId, variant, ezTt3ayMo, lschgej4H, qxTvv_EBh, ...restProps } = getProps(props);
  const href = useSVGTemplate("3769046070", svg);
  return /* @__PURE__ */ _jsx(SVG, { ...restProps, className: cx("framer-XotdZ", className), layoutId, ref, role: "presentation", style: { "--1m6trwb": qxTvv_EBh, "--21h8s6": ezTt3ayMo, "--pgex8v": lschgej4H, ...style }, viewBox: "0 0 24 24", children: /* @__PURE__ */ _jsx("use", { href }) });
});
var css = [`.framer-XotdZ { -webkit-mask: ${mask}; aspect-ratio: 1; display: block; mask: ${mask}; width: 24px; }`];
var Icon = withCSS(Component, css, "framer-XotdZ");
Icon.displayName = "Monitor";
var stdin_default = Icon;
addPropertyControls(Icon, { ezTt3ayMo: { defaultValue: "rgb(0, 0, 0)", hidden: false, title: "Color", type: ControlType.Color }, lschgej4H: { defaultValue: 1.5, displayStepper: true, hidden: false, max: 6, min: 0, step: 0.5, title: "Width", type: ControlType.Number }, qxTvv_EBh: { defaultValue: 0, displayStepper: true, hidden: false, max: 1, min: 0, step: 0.1, title: "Alpha", type: ControlType.Number } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "Icon", "slots": [], "annotations": { "framerIntrinsicHeight": "24", "framerVector": '{"name":"Monitor","color":{"type":"variable","value":"21h8s6"},"set":{"localId":"vectorSet/NGVKdicsm","id":"NGVKdicsm","moduleId":"omX0gWFPqDwhaiWwf6ab"}}', "framerIntrinsicWidth": "24", "framerDisableUnlink": "true", "framerContractVersion": "1", "framerVariables": '{"ezTt3ayMo":"color","lschgej4H":"width1","qxTvv_EBh":"alpha"}', "framerSupportedLayoutHeight": "any-prefer-fixed", "framerSupportedLayoutWidth": "any-prefer-fixed", "framerImmutableVariables": "true" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  stdin_default as default
};
